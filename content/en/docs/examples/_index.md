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
| [Getting started](getting-started/) | A local demo with the embedded development identity provider, its default users and a user badge. |
| [Multi-app SSO](multi-app-sso/) | A second application added to the same provider and cookie domain, reusing the login session. |
| [Keycloak with Google](keycloak-google/) | A classical external IAM: Keycloak federates Google, Gate One trusts one Keycloak issuer. |
| [Embedded IAM](embedded-iam/) | `cladone-auth` federates Google, maps claims and stores local/federated user grants. |
| [High Availability](high-availability/) | Several Gate One replicas behind a load balancer with shared Redis state. |
| [APIs and MCP](api-mcp/) | A browser provider, a JWT provider, an identity-conditioned API route and an MCP service. |
| [Injectable UX](injectable-ux/) | User badge, UI gating, injection bundle, 403 banner and a nonce CSP. |
| [Usage plugin](usage-plugin/) | A signed audit plugin, a trust store, the WAL and per-type durability. |
| [HTTP bridge](http-bridge/) | An `http-bridge` provider with custom identity headers, linked to the contract. |

The raw files are also served under `/examples/`:

* [`examples/getting-started/routes.json`](/examples/getting-started/routes.json)
* [`examples/sso-multi-apps/routes.json`](/examples/sso-multi-apps/routes.json)
* [`examples/keycloak-google/routes.json`](/examples/keycloak-google/routes.json)
* [`examples/embedded-iam/broker.json`](/examples/embedded-iam/broker.json)
  and [`routes.json`](/examples/embedded-iam/routes.json)
* [`examples/high-availability/routes.json`](/examples/high-availability/routes.json)
* [`examples/protect-api-mcp/routes.json`](/examples/protect-api-mcp/routes.json)
* [`examples/http-bridge/routes.json`](/examples/http-bridge/routes.json)
* [`examples/injectable-ux/routes.json`](/examples/injectable-ux/routes.json)
  and [`bundle.json`](/examples/injectable-ux/bundle.json)
* [`examples/usage-events/routes.json`](/examples/usage-events/routes.json), [`audit.manifest.json`](/examples/usage-events/audit.manifest.json) and [`trust-store.json`](/examples/usage-events/trust-store.json)
