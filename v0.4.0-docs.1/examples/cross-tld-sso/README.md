# Cross-TLD SSO example

Two unrelated domains (`app-a.com`, `app-b.fr`) use the **same IdP
session** and one Gate One process. Each domain has its own Gate One
cookie; no cookie crosses the TLD boundary.

Register both callbacks at the IdP:

- `https://login.app-a.com/auth/callback`
- `https://login.app-b.fr/auth/callback`

For a global logout, also register both back-channel logout URLs:

- `https://login.app-a.com/backchannel-logout`
- `https://login.app-b.fr/backchannel-logout`

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
