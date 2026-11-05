# External site proxying with an injected userscript

This is the documentation copy of the Wikipedia+ example. The canonical
running demo is in the source repository under `examples/siteproxy/`.

It proxies a real external site through Gate One and injects a userscript
into every HTML page. The browser installs nothing and the external site
contains no Gate One code. It requires outbound internet access to
`*.wikipedia.org`.

## Files

- `routes.json` — one wildcard route for the language editions.
- `injects/bundle.json` — injection bundle.
- `injects/wikipedia-plus.user.js` — canonical userscript, also
  installable in a userscript manager.
- `injects/wikipedia-plus.html` — generated wrapper used by the bundle.
  Do not edit it; regenerate it from the `.user.js` file.

## Run it

From the source repository:

```bash
cd gate-one-src
./bin/gate-one -check -config ../gate-one-product/examples/siteproxy/routes.json
./bin/gate-one -config ../gate-one-product/examples/siteproxy/routes.json
```

Point the public hosts at the gateway, then open:

```text
http://en.wikipedia.demo.localhost:3000/wiki/Cat
```

## What it demonstrates

- `upstream.host: true` — the external backend receives its own Host.
- `rewriteRedirects` and `rewriteBody` — the browser stays behind the
  proxy.
- `responseHeaders.remove` — the origin CSP is removed so the injected
  script can run. This is required for a site whose CSP has no
  `unsafe-inline`.
- `inject` — the bundle adds the userscript to every HTML page.
- `wildcard.lang` — one route expands into one public host per language
  and compiles the cross-edition rewrite map.

## License and provenance

The userscript is based on **"Wikipedia Dark Theme Automatic" v1.0.0 by
Elio (ImElio)**, MIT licensed:
<https://github.com/ImElio/wikipedia-dark-theme-automatic>.
The adaptations are documented in the file header. Keep the copyright
and MIT notice when reusing it.

## Documentation

<https://clad-one.github.io/gate-one-doc/docs/examples/siteproxy/>
