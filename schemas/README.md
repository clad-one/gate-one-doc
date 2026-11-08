# Published JSON Schemas

These schemas are the published contract for editors, validators and
external tooling. They are copies of the authoritative schemas in the
source repository:

| Published | Source |
|---|---|
| `api-routes.schema.json` | `gate-one-src/testdata/api-routes.schema.json` |
| `inject-bundle.schema.json` | `gate-one-src/testdata/inject-bundle.schema.json` |
| `usage-event.schema.json` | `gate-one-src/testdata/usage-event.schema.json` |
| `embedded-iam.schema.json` | product contract (embedded IAM configuration) |
| `plugin-manifest.schema.json` | product contract (`pkg/pluginmanifest.Manifest`) |
| `plugin-trust-store.schema.json` | product contract (`pkg/pluginmanifest.TrustStore`) |

`scripts/gen-config-docs` renders these schemas into
`content/en/docs/config/`. `scripts/validate-examples` validates
`examples/` against them.

The schemas are served under `/schemas/` by the product site.
