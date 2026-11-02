#!/usr/bin/env bash
# Build the Gate One release artefacts from the source repository.
#
#   ./scripts/release.sh --dry-run
#   VERSION=1.0.0 ./scripts/release.sh
#
# Binaries are attached to a tagged release; they are never committed.
# The product tag must match the source tag (vX.Y.Z).
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

DRY_RUN=0
ALLOW_UNTAGGED=0
ALLOW_UNSIGNED=0
VERSION_IN=""

while [ $# -gt 0 ]; do
	case "$1" in
		--dry-run) DRY_RUN=1 ;;
		--allow-untagged) ALLOW_UNTAGGED=1 ;;
		--allow-unsigned) ALLOW_UNSIGNED=1 ;;
		--version)
			shift
			[ $# -gt 0 ] || { echo "--version needs a value" >&2; exit 2; }
			VERSION_IN="$1"
			;;
		-h|--help)
			sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
			exit 0
			;;
		*)
			echo "release.sh: unknown argument $1" >&2
			exit 2
			;;
	esac
	shift
done

SRC="${GATE_ONE_SRC:-../gate-one-src}"
SRC="$(cd "$SRC" 2>/dev/null && pwd)" || {
	echo "release.sh: source repository not found (GATE_ONE_SRC)" >&2
	exit 1
}
[ -f "$SRC/go.mod" ] && [ -d "$SRC/cmd/gate-one" ] || {
	echo "release.sh: $SRC is not a Gate One source tree" >&2
	exit 1
}

VERSION="${VERSION_IN:-$(cat "$SRC/VERSION" 2>/dev/null || echo 0.1.0)}"
VERSION="${VERSION#v}"
COMMIT="$(git -C "$SRC" rev-parse --short HEAD 2>/dev/null || echo unknown)"
DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
DIST="$PWD/dist"
TARGETS=(linux/amd64 linux/arm64 darwin/amd64 darwin/arm64 windows/amd64)

source_tag="$(git -C "$SRC" describe --tags --exact-match 2>/dev/null || true)"
if [ -n "$source_tag" ] && [ "$source_tag" != "v$VERSION" ]; then
	echo "release.sh: source tag $source_tag != v$VERSION" >&2
	[ "$ALLOW_UNTAGGED" = "1" ] || {
		echo "  use --allow-untagged for a local build" >&2
		exit 1
	}
elif [ -z "$source_tag" ] && [ "$DRY_RUN" = "0" ]; then
	echo "release.sh: source HEAD is not tagged; use --allow-untagged" >&2
	[ "$ALLOW_UNTAGGED" = "1" ] || exit 1
fi

have() { command -v "$1" >/dev/null 2>&1; }
go_bin="$(command -v go || true)"
syft_bin="$(command -v syft || true)"
cosign_bin="$(command -v cosign || true)"
minisign_bin="$(command -v minisign || true)"

if [ -z "$go_bin" ]; then
	echo "release.sh: go is required" >&2
	exit 1
fi
if [ "$DRY_RUN" = "1" ]; then
	echo "release.sh: dry run"
	echo "  source:  $SRC"
	echo "  version: $VERSION (commit $COMMIT)"
	echo "  targets: ${TARGETS[*]}"
	echo "  output:  $DIST"
	echo "  go:      $go_bin"
	echo "  syft:    ${syft_bin:-MISSING (required for a real release)}"
	echo "  cosign:  ${cosign_bin:-MISSING}"
	echo "  minisign:${minisign_bin:-MISSING}"
	echo "  signing: COSIGN_KEY or MINISIGN_SECRET_KEY (required unless --allow-unsigned)"
	"$PWD/scripts/validate-examples" >/dev/null
	echo "  examples: schema validation OK"
	exit 0
fi

[ -n "$syft_bin" ] || {
	echo "release.sh: syft is required (SBOM)" >&2
	echo "  https://github.com/anchore/syft" >&2
	exit 1
}
if [ -z "${COSIGN_KEY:-}" ] && [ -z "${MINISIGN_SECRET_KEY:-}" ]; then
	echo "release.sh: set COSIGN_KEY or MINISIGN_SECRET_KEY" >&2
	[ "$ALLOW_UNSIGNED" = "1" ] || exit 1
fi

rm -rf "$DIST"
mkdir -p "$DIST"

for target in "${TARGETS[@]}"; do
	os="${target%/*}"
	arch="${target#*/}"
	bin="gate-one"
	ext=""
	[ "$os" = "windows" ] && { bin="gate-one.exe"; ext=".zip"; }

	stage="$DIST/stage/gate-one_${VERSION}_${os}_${arch}"
	mkdir -p "$stage/schemas" "$stage/examples" "$stage/doc"

	echo "building ${os}/${arch}…"
	(
		cd "$SRC"
		CGO_ENABLED=0 GOOS="$os" GOARCH="$arch" "$go_bin" build \
			-trimpath \
			-ldflags "-s -w -X main.version=${VERSION} -X main.commit=${COMMIT} -X main.date=${DATE}" \
			-o "$stage/$bin" ./cmd/gate-one
	)

	cp "$PWD"/schemas/*.json "$stage/schemas/"
	cp -R "$PWD"/examples/. "$stage/examples/"
	cp "$SRC"/doc/*.adoc "$stage/doc/" 2>/dev/null || true
	cp "$SRC"/LICENSE "$SRC"/LICENSE.fr.md "$SRC"/PLUGIN-LICENSING.md \
		"$SRC"/README.md "$SRC"/VERSION "$stage/" 2>/dev/null || true

	archive="$DIST/gate-one_${VERSION}_${os}_${arch}${ext}"
	if [ "$os" = "windows" ]; then
		( cd "$stage" && zip -qr "$archive" . )
	else
		tar -czf "$archive" -C "$stage" .
	fi
	"$syft_bin" "dir:$stage" -o "spdx-json=$DIST/gate-one_${VERSION}_${os}_${arch}.spdx.json" >/dev/null
	rm -rf "$stage"
done

rmdir "$DIST/stage" 2>/dev/null || true

# The static site is published with the schemas and examples mounted.
"$PWD/scripts/build-site" >/dev/null
tar -czf "$DIST/gate-one_${VERSION}_site.tar.gz" -C "$PWD/public" .

(
	cd "$DIST"
	if command -v sha256sum >/dev/null 2>&1; then
		sha256sum ./*.tar.gz ./*.zip ./*.spdx.json > SHA256SUMS 2>/dev/null || \
			sha256sum ./*.tar.gz ./*.spdx.json > SHA256SUMS
	else
		shasum -a 256 ./*.tar.gz ./*.zip ./*.spdx.json > SHA256SUMS 2>/dev/null || \
			shasum -a 256 ./*.tar.gz ./*.spdx.json > SHA256SUMS
	fi
)

if [ -n "${COSIGN_KEY:-}" ]; then
	"$cosign_bin" sign-blob --yes --key "$COSIGN_KEY" \
		--output-signature "$DIST/SHA256SUMS.sig" \
		--output-certificate "$DIST/SHA256SUMS.pem" \
		"$DIST/SHA256SUMS"
elif [ -n "${MINISIGN_SECRET_KEY:-}" ]; then
	"$minisign_bin" -S -s "$MINISIGN_SECRET_KEY" -m "$DIST/SHA256SUMS" \
		-x "$DIST/SHA256SUMS.minisig"
fi

cat > "$DIST/RELEASE_NOTES.md" <<NOTES
# Gate One ${VERSION} — ${DATE}

Source commit: \`${COMMIT}\`

Artifacts:

- \`gate-one_${VERSION}_<os>_<arch>.tar.gz\` (or \`.zip\` on Windows)
- \`gate-one_${VERSION}_site.tar.gz\` (static documentation)
- \`*.spdx.json\` (SBOM, syft)
- \`SHA256SUMS\` and its signature
- \`schemas/\` and \`examples/\` in every binary archive

Supported: Linux amd64/arm64, macOS amd64/arm64, Windows amd64
(CGO disabled). Binaries are not committed to Git: attach this
directory to the tag \`v${VERSION}\`.
NOTES

echo "release.sh: wrote $DIST"
