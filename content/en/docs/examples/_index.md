---
title: Examples
linkTitle: Examples
weight: 40
description: Copyable, schema-validated configurations.
---

Every example in this section is a real file under
`examples/` in the product repository. The build validates it against
the published JSON Schema; local examples are also checked with
`gate-one -check`.

| Example | What it shows |
|---|---|
| [Getting started](getting-started/) | A local demo with the embedded development identity provider, a user badge and one route. |
| [Multi-app SSO](multi-app-sso/) | Two applications on a shared cookie domain, one OIDC provider, Redis-backed session state. |
| [Broker federation](broker/) | Google + Microsoft through the optional broker, then one Gate One provider per tenant. |
| [APIs and MCP](api-mcp/) | A browser provider, a JWT provider, an identity-conditioned API route and an MCP service. |
| [Injectable UX](injectable-ux/) | User badge, UI gating, injection bundle, 403 banner and a nonce CSP. |
| [Usage plugin](usage-plugin/) | A signed audit plugin, a trust store, the WAL and per-type durability. |

The raw files are also served under `/examples/`:

* [`examples/getting-started/routes.json`](/examples/getting-started/routes.json)
* [`examples/sso-multi-apps/routes.json`](/examples/sso-multi-apps/routes.json)
* [`examples/broker-multi-idp/broker.json`](/examples/broker-multi-idp/broker.json)
  and [`routes.json`](/examples/broker-multi-idp/routes.json)
* [`examples/protect-api-mcp/routes.json`](/examples/protect-api-mcp/routes.json)
* [`examples/injectable-ux/routes.json`](/examples/injectable-ux/routes.json)
  and [`bundle.json`](/examples/injectable-ux/bundle.json)
* [`examples/usage-events/routes.json`](/examples/usage-events/routes.json), [`audit.manifest.json`](/examples/usage-events/audit.manifest.json) and [`trust-store.json`](/examples/usage-events/trust-store.json)
