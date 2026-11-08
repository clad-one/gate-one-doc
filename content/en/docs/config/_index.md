---
title: Configuration reference
linkTitle: Configuration
weight: 60
description: Every field, generated from the published JSON Schemas.
---

* [Gate One configuration](gate-one/) — `api-routes.json` (`authProvider.type`: `dev`, `http-bridge`, `oidc`, `jwt`)
* [Broker configuration](broker/) — `cladone-auth` (optional embedded IAM/OIDC issuer)
* [Plugin manifest](plugin-manifest/)
* [Plugin trust store](plugin-trust-store/)
* [Publisher feed](publisher-feed/)
* [Usage event](usage-event/)

The plugin references above are for
[plugin authors and publishers](/docs/extending/); the others are for
operators. `cladone-auth` is an OIDC issuer reached with
`authProvider.type: "oidc"`, **not** the same thing as the
[`http-bridge` contract](/docs/components/bridge-contract/) — see
[IAM, IdPs and provider types](/docs/iam-and-providers/).

The schemas are also published for editor autocompletion and external
validation:

* [`api-routes.schema.json`](/schemas/api-routes.schema.json)
* [`broker.schema.json`](/schemas/broker.schema.json)
* [`plugin-manifest.schema.json`](/schemas/plugin-manifest.schema.json)
* [`plugin-trust-store.schema.json`](/schemas/plugin-trust-store.schema.json)
* [`publisher-feed.schema.json`](/schemas/publisher-feed.schema.json)
* [`usage-event.schema.json`](/schemas/usage-event.schema.json)
* [`inject-bundle.schema.json`](/schemas/inject-bundle.schema.json)
