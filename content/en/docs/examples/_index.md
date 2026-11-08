---
title: Examples
linkTitle: Examples
weight: 40
description: Copyable, schema-validated configurations.
---

Copyable, schema-validated configurations. Most examples are real files
under `examples/` in the product repository; the proxied-site example
lives in the source repository, where its runnable demo and userscript
live.

| Example | What it shows |
|---|---|
| [Getting started](getting-started/) | A local demo with the embedded development identity provider, its default users and a user badge. |
| [Direct OIDC](direct-oidc/) | One OIDC issuer used directly, with roles and scopes read from that issuer and no federation or IAM. |
| [Multi-app SSO](multi-app-sso/) | A second application added to the same provider and cookie domain, reusing the login session. |
| [Cross-domain SSO](cross-tld-sso/) | Two unrelated domains using one IdP session, one provider per domain and a single shared route body. |
| [Keycloak with Google](keycloak-google/) | A classical external IAM: Keycloak federates Google, Gate One trusts one Keycloak issuer. |
| [Embedded IAM](embedded-iam/) | `cladone-auth` federates Google, maps claims and stores local/federated user grants. |
| [High Availability](high-availability/) | Several Gate One replicas behind a load balancer with shared Redis state. |
| [APIs and MCP](api-mcp/) | A browser provider, a JWT provider, an identity-conditioned API route and an MCP service. |
| [MCP tools](mcp-tools/) | A REST-derived MCP service, a proxied MCP server and an aggregating set, with delegated credentials. |
| [Own account panel](account-panel/) | The application's own burger panel reads the session instead of the built-in user badge. |
| [Injectable UX](injectable-ux/) | User badge, UI gating, injection bundle, 403 banner and a nonce CSP. |
| [Enhance a proxied site](siteproxy/) | An external site proxied through Gate One with an injected userscript. |
| [Usage plugin](usage-plugin/) | A signed audit plugin, a trust store, the WAL and per-type durability. |
| [IAM + IdP bridge](http-bridge/) | An `http-bridge` provider returning identity and IAM facts, linked to the contract. |

The raw files are also served under `/examples/`:

* [`examples/getting-started/routes.json`](/examples/getting-started/routes.json)
* [`examples/direct-oidc/routes.json`](/examples/direct-oidc/routes.json)
* [`examples/sso-multi-apps/routes.json`](/examples/sso-multi-apps/routes.json)
* [`examples/cross-tld-sso/routes.json`](/examples/cross-tld-sso/routes.json)
* [`examples/keycloak-google/routes.json`](/examples/keycloak-google/routes.json)
* [`examples/embedded-iam/broker.json`](/examples/embedded-iam/broker.json)
  and [`routes.json`](/examples/embedded-iam/routes.json)
* [`examples/high-availability/routes.json`](/examples/high-availability/routes.json)
* [`examples/protect-api-mcp/routes.json`](/examples/protect-api-mcp/routes.json)
* [`examples/mcp-tools/routes.json`](/examples/mcp-tools/routes.json)
* [`examples/http-bridge/routes.json`](/examples/http-bridge/routes.json)
* [`examples/account-panel/routes.json`](/examples/account-panel/routes.json),
  [`panel.js`](/examples/account-panel/panel.js),
  [`panel.css`](/examples/account-panel/panel.css) and
  [`index.html`](/examples/account-panel/index.html)
* [`examples/injectable-ux/routes.json`](/examples/injectable-ux/routes.json)
  and [`bundle.json`](/examples/injectable-ux/bundle.json)
* [`examples/usage-events/routes.json`](/examples/usage-events/routes.json), [`audit.manifest.json`](/examples/usage-events/audit.manifest.json) and [`trust-store.json`](/examples/usage-events/trust-store.json)

The proxied-site example is kept in the source repository:
[`examples/siteproxy/`](https://github.com/clad-one/gate-one/tree/main/examples/siteproxy).
