---
title: Cladone G.O. Gate-One
linkTitle: Home
menu: main
weight: 10
---

{{% blocks/cover title="Cladone G.O. Gate-One" subtitle="Centralized common features." height="med" color="dark" %}}

Once and for all:
- Cross-domain SSO authentication, internal AIM.
- Back-end and Front-end access rights at DOM scale. 
- Cloudflare Turnstile protection on pages, forms or endpoints.
- Web to mobile (PWA) and REST to MCP. Service authent. delegation.
- Service aggregation and filtering, front-end proxy.
- Customizable and injectable user interface. 
- All combinations are possible.
- Versionable configuration files.

Dynamic instrumentation—applications run without modification.


<a class="btn btn-lg btn-primary me-3 mb-3" href="/docs/features/">See the features</a>
<a class="btn btn-lg btn-outline-light mb-3" href="/docs/examples/getting-started/">Start in two commands</a>

{{% /blocks/cover %}}

{{% blocks/lead color="white" %}}

**One edge, four jobs.** Authenticate users, enforce route policy, inject
the missing UX, and stream pseudonymized usage events to signed plugins.
The backend stays a normal HTTP application.

{{% /blocks/lead %}}

{{% blocks/section color="primary" type="row" %}}

{{% blocks/feature icon="fa-solid fa-right-to-bracket" title="One login" url="/docs/features/sso-multi-apps/" %}}
Shared OIDC session across your applications, with a central logout and
immediate revocation.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-users-gear" title="Any identity provider" url="/docs/features/multiple-idps/" %}}
Talk directly to Keycloak, Entra, Auth0 or Google, or let the optional
embedded IAM federate several providers and local accounts.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-shield-halved" title="APIs and MCP" url="/docs/features/protect-api-mcp/" %}}
JWT/JWKS validation, roles, scopes and MCP protected-resource metadata
for browser and machine clients.
{{% /blocks/feature %}}

{{% /blocks/section %}}

{{% blocks/section color="white" type="row" %}}

{{% blocks/feature icon="fa-solid fa-wand-magic-sparkles" title="Injectable UX" url="/docs/features/injectable-ux/" %}}
User badge, login guard, gated controls, 403 banner and PWA shell — on a
frontend you cannot modify.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-chart-line" title="Usage events" url="/docs/features/usage-events/" %}}
Durable per-type WAL, opaque subject ids, signed out-of-process plugins
and targeted backpressure.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-cubes-stacked" title="No plugin in the auth path" url="/docs/architecture/" %}}
Extensions consume events; they never decide authentication. The trust
boundary stays in the core.
{{% /blocks/feature %}}

{{% /blocks/section %}}

{{% blocks/section color="dark" type="container" %}}

## Built for the apps you already have

Gate One is a reverse proxy. It matches a host and path, authenticates the
request, applies the configured policy and forwards it. The application
does not know it is behind an identity-aware proxy, unless you choose to
send it the opaque subject header.

[IAM and provider types](/docs/iam-and-providers/) ·
[Read the architecture](/docs/architecture/) ·
[Browse the examples](/docs/examples/) ·
[Generate a configuration](/docs/config/gate-one/)

{{% /blocks/section %}}
