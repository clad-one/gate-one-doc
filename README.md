# Gate One product site

Product documentation for Gate One: landing page, feature claims,
examples, architecture, plugin integration and generated configuration
reference.

The site is built with **Hugo** + **Docsy** and writes the documentation
in **AsciiDoc**. English is the only language for now; the content layout
(`content/en/…`) is ready for translations.

## Prerequisites

- Node.js 20.19+ (Dart Sass embedded requires it)
- Ruby + Asciidoctor (`gem install asciidoctor --user-install`)
- Go 1.22+ (Hugo modules; `go` must be on `PATH`)

```bash
npm ci
gem install asciidoctor --user-install
```

If Asciidoctor is not on `PATH`, add the Ruby user bin directory:

```bash
export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"
```

## Build

```bash
npm run build          # scripts/build-site (minified production build)
npm run serve          # local server with drafts
npm run docs           # regenerate the configuration reference
npm run validate       # validate examples/ against schemas/
npm run mermaid        # parse every Mermaid diagram
npm run check          # CI guard: generated docs + examples + diagrams
```

`npm run build` puts the static site in `public/`.

Dart Sass is provided by `sass-embedded`; the build script adds
`node_modules/.bin` to `PATH` so Hugo finds it. Bootstrap and Font
Awesome are mounted from `node_modules/` (Docsy 0.18 does not vendor
them in the Hugo module).

Diagrams are Mermaid code fences. The Mermaid build is mounted from
`node_modules/mermaid/dist` and served locally: **no CDN or external
service** is contacted at runtime. `npm run mermaid` parses every
diagram without a browser.

## Repository layout

```text
content/en/          English documentation (Markdown + AsciiDoc)
data/features.yaml   Feature claims rendered on /docs/features/
examples/            Copyable, validated configuration examples
schemas/             Published JSON Schemas (source: gate-one-src/testdata)
scripts/             build-site, gen-config-docs, validate-examples, publish-pages
static/              Static assets and hosting headers
```

## Configuration reference

`content/en/docs/config/*.adoc` is generated from the JSON Schemas in
`schemas/`. Edit the schema or the generator, then run:

```bash
npm run docs
```

The build fails if the generated files are stale (CI runs
`./scripts/check-generated`).

## Repositories

- Public source and release assets:
  <https://github.com/clad-one/gate-one>
- Documentation source and GitHub Pages:
  <https://github.com/clad-one/gate-one-doc>
- Published documentation:
  <https://clad-one.github.io/gate-one-doc/>

This repository contains **documentation only**. It has no release
script and no `dist/` directory: binaries, SBOMs and signatures belong
to the source repository.

## Releases

The signed release pipeline lives in the source repository:
`../gate-one-src/release.sh`. It supplies the documentation site, the
published schemas and the feature examples, and writes all artifacts to
`../gate-one-src/dist/`.

```bash
cd ../gate-one-src
COSIGN_KEY=~/.config/gate-one/release/cosign.key \
COSIGN_PASSWORD="$(cat ~/.config/gate-one/release/cosign.password)" \
COSIGN_PUB=release/cosign.pub \
./release.sh
```

The source tag is `vX.Y.Z`. The product tag must be `vX.Y.Z` (same
release train) or `vX.Y.Z-docs.N` for a documentation-only release.
In the `-docs.N` case the binary archives keep the source version
(`gate-one_X.Y.Z_*`) while the site archive and release label carry the
docs suffix.

Artifacts land in `../gate-one-src/dist/`: one archive per OS/arch, the
site archive, SPDX SBOMs, `RELEASE_MANIFEST.json`, `SHA256SUMS`,
`SHA256SUMS.bundle` and `cosign.pub`.

Verify with:

```bash
cosign verify-blob --key cosign.pub \
  --bundle SHA256SUMS.bundle SHA256SUMS
sha256sum -c SHA256SUMS
```

The verification key is committed in the source repository as
`release/cosign.pub`; the private key stays outside both repositories.
Binaries are **not** committed: they are attached to a tagged release.

## Hosting

The output is fully static. The primary host is **GitHub Pages** for
this repository. `baseURL` in `hugo.toml` is set to the project root
(`https://clad-one.github.io/gate-one-doc/`).

### GitHub Pages: one folder per release

Each documentation release is published under a folder named after its
tag:

```text
https://clad-one.github.io/gate-one-doc/v0.3.1-docs.1/
```

Old folders are kept, so versioned documentation stays available. The
site root redirects to the newest published release and lists the
others.

The publishing branch is `gh-pages`; GitHub Pages must be configured to
deploy from that branch at `/` (Settings → Pages → Deploy from a branch).
The first publication creates the branch.

```bash
# from an exact tag; the script refuses a dirty tree
./scripts/publish-pages

# or name the release explicitly
./scripts/publish-pages v0.3.1-docs.1
```

The script:

1. builds with `--baseURL https://clad-one.github.io/gate-one-doc/<tag>/`;
2. copies `public/` to `<tag>/` in a temporary `gh-pages` worktree;
3. regenerates the root redirect and version list;
4. commits and pushes `gh-pages`.

`PAGES_REMOTE`, `PAGES_BRANCH` and `SITE_BASE_URL` override the
defaults. The same release label is used by `../gate-one-src/release.sh`
for the documentation archive, so the archive and the live site share
the same absolute links.

`canonifyURLs` is enabled so root-relative links emitted by AsciiDoc
(such as `/docs/config/gate-one/`) receive the versioned base URL.

Cloudflare Pages, Netlify, GitLab Pages and other HTTPS static hosts
also work. `static/_headers` carries security headers for hosts that
support that format (Cloudflare Pages, Netlify). For other hosts,
configure the equivalent headers at the edge; a hosted Gate One can also
sit in front of the site.

Cloudflare Pages is wired through `wrangler.toml`:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
./scripts/deploy-site            # builds public/ then wrangler pages deploy
./scripts/deploy-site --dry-run  # prints the command only
```

The credentials are never committed.

## Licence

Gate One is source-available under the BSL-CUSTOM licence. The English
`LICENSE` is authoritative; `LICENSE.fr.md` is a French reference.
Extension plugins may be closed-source/commercial under the plugin
exception; see `PLUGIN-LICENSING.md` in the source repository.
