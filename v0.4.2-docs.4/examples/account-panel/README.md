# Bring your own account panel

This example keeps Gate One's authentication guard but removes the built-in
user badge. The application owns the burger button and the side panel, and
reads the session from Gate One.

## Files

- `routes.json` — frontend route without `userBadge`.
- `index.html` — the application page with the burger and the side panel.
- `panel.css` — panel styling.
- `panel.js` — reads the session, renders it and drives login/logout.

## Run it

```bash
# terminal 1: the application
cd examples/account-panel
python3 -m http.server 8080

# terminal 2: Gate One
cd ../..
gate-one -check -config examples/account-panel/routes.json
gate-one -config examples/account-panel/routes.json
```

Open `http://app.demo.localhost:3000/` and sign in with the development
provider's default account:

| User | Password |
|---|---|
| `alice` | `alice` |
| `bob` | `bob` |

The account panel shows the username, email, roles and scopes. It has no
built-in Gate One badge; the login and logout buttons call
`window.__cladoneAuth.login()` and `window.__cladoneAuth.logout()`.

## Session probe

`panel.js` calls:

```js
await window.__cladoneAuth.refresh({ quiet: true });
const session = await window.__cladoneAuth.session();
```

`refresh()` forces the session probe. This matters because a route without
`userBadge` and without `data-gtw-*` markup does not probe automatically.
`session()` then returns `{roles, scopes, claims}` or `null`.

The direct equivalent is:

```js
const res = await fetch("/__gate-one/auth", {
  cache: "no-store",
  credentials: "same-origin",
});
const session = res.ok ? await res.json() : null;
```

The probe is for display only. Route authorization remains enforced by Gate
One and the backend.
