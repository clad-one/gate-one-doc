---
title: Examples
linkTitle: Examples
weight: 40
description: Copyable, schema-validated configurations, some runnable on your machine.
---

Two kinds of example:

- **Runnable** — a packaged demo under `deploy/local/` in the source
  repository starts the whole stack on `*.localhost` (no domain, no
  external account). `./run.sh` prints the URLs.
- **Configuration pattern** — a realistic `routes.json` for a setup that
  needs an external service (Keycloak, Google, GitHub). It is
  schema-validated; adapt it to your infrastructure.

| Example | What it shows | Runnable |
|---|---|---|
| [Getting started](getting-started/) | The embedded development identity provider, its default users and a user badge. | Yes, no Docker |
| [Direct OIDC](direct-oidc/) | One OIDC issuer used directly, with roles and scopes read from that issuer and no federation or IAM. | Yes, Docker |
| [Multi-app SSO](multi-app-sso/) | A second application added to the same provider and cookie domain, reusing the login session. | Yes, Docker |
| [Cross-domain SSO](cross-tld-sso/) | Unrelated domains sharing one IdP session, one provider per domain. | Yes, Docker |
| [Embedded IAM](embedded-iam/) | `cladone-auth` federates an IdP, maps claims and stores user grants. | Yes, Docker |
| [High Availability](high-availability/) | Several Gate One replicas behind a load balancer with shared Redis state. | Yes, Docker |
| [Own account panel](account-panel/) | The application's own burger panel reads the session instead of the built-in badge. | Yes, no Docker |
| [Injectable UX](injectable-ux/) | User badge, UI gating, injection bundle and a nonce CSP. | Yes, no Docker |
| [Usage plugin](usage-plugin/) | A signed audit plugin, a trust store, the WAL and per-type durability. |
| [Turnstile](turnstile/) | A public form and a whole-page gate protected by Cloudflare Turnstile, with the test keys. | Needs internet |
| [Keycloak with Google](keycloak-google/) | A classical external IAM: Keycloak federates Google, Gate One trusts one Keycloak issuer. | Pattern |
| [APIs and MCP](api-mcp/) | A browser provider, a JWT provider, an identity-conditioned API route and an MCP service. | Pattern |
| [MCP tools](mcp-tools/) | A REST-derived MCP service, a proxied MCP server and an aggregating set. | Pattern |
| [IAM + IdP bridge](http-bridge/) | An `http-bridge` provider returning identity and IAM facts. | Pattern |
| [Enhance a proxied site](siteproxy/) | An external site proxied through Gate One with an injected userscript. | Needs internet |

The runnable demos live in the source repository under
[`deploy/local/`](https://github.com/clad-one/gate-one/tree/main/deploy/local).
They need the Gate One binaries (download a release and verify the
checksums) and, for the OIDC demos, Docker Compose.

## The configuration files

The raw files are also served under `/examples/`:

* [`examples/getting-started/routes.json`](/examples/getting-started/routes.json)
* [`examples/direct-oidc/routes.json`](/examples/direct-oidc/routes.json)
* [`examples/sso-multi-apps/routes.json`](/examples/sso-multi-apps/routes.json)
* [`examples/cross-tld-sso/routes.json`](/examples/cross-tld-sso/routes.json)
* [`examples/keycloak-google/routes.json`](/examples/keycloak-google/routes.json)
* [`examples/embedded-iam/embedded-iam.json`](/examples/embedded-iam/embedded-iam.json)
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
* [`examples/turnstile/routes.json`](/examples/turnstile/routes.json)
* [`examples/turnstile-gate/routes.json`](/examples/turnstile-gate/routes.json)

The proxied-site example is kept in the source repository:
[`examples/siteproxy/`](https://github.com/clad-one/gate-one/tree/main/examples/siteproxy).

## Production deployment

A starting point with Traefik, TLS, Gate One and `cladone-auth`, ready to
copy to a VPS, is
[`deploy/vps/`](https://github.com/clad-one/gate-one/tree/main/deploy/vps).
