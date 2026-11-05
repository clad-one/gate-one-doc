# Examples

Every `routes.json` / `broker.json` / `bundle.json` / `*.manifest.json` /
`trust-store.json` file is validated against the published JSON Schema
by `scripts/validate-examples`:

```bash
./scripts/validate-examples
# local configs also go through the real binary:
GATE_ONE_BIN=../gate-one-src/bin/gate-one ./scripts/validate-examples --run-check
```

Examples with an external `issuer` / `jwksUrl` are schema-validated only:
their identity provider is deliberately unreachable from a build machine.

## Usage plugin example

`usage-events/` contains a **signed** manifest. The signature was made
with a disposable example key; the private key was discarded. The public
key in `trust-store.json` is therefore only good for this example. For
a real plugin:

1. generate an Ed25519 key pair;
2. put the public key in your trust store (`allowedNames` must include
   the plugin name);
3. build the canonical payload with
   `pluginmanifest.SigningPayload` (see `pkg/pluginmanifest` in the
   source repository);
4. sign it, copy the base64url signature into `signature.value`, and
   point `usage.plugins[].manifest` / `artifact` at the signed files;
5. never commit a production private key.

The `audit-echo.placeholder` file is not a runnable binary: it exists so
the example manifest digest and the startup verification can be
exercised without shipping an artefact in Git.
