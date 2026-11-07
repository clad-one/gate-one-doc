# Cross-TLD SSO example

Two unrelated domains (`app-a.com`, `app-b.fr`) use the **same IdP
session** and one Gate One process. Each domain has its own Gate One
cookie; no cookie crosses the TLD boundary.

Register both callbacks at the IdP:

- `https://login.app-a.com/auth/callback`
- `https://login.app-b.fr/auth/callback`

For back-channel logout, many IdPs allow only one URL per client. In
that case point it at one login host and keep the same issuer and Redis
revocation prefix on both providers: the receiving Gate One instance
revokes the session in the shared store, and the other domain checks it
on the next request. If you have separate stores/clients, register one
URL per client instead.

The route body is declared once with `hosts[]`; Gate One expands it and
binds each concrete host to the provider whose `cookieDomain` covers it.
`auth.provider` is not repeated.

The shared OIDC/client/session fields live on the `ssoGroups` entry.
Putting `issuer`, `clientId`, `sessionStore`, etc. inside a `providers[]`
entry is rejected by the strict schema.

Zero-form behaviour depends on the IdP reusing its existing session:
the second domain redirects to the same IdP and receives a code without
showing the login form. If the IdP session is expired, the normal
interactive login is required.
