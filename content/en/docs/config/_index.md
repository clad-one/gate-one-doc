---
title: Configuration reference
linkTitle: Configuration
weight: 50
description: Every field, generated from the published JSON Schemas.
---

These pages are generated from the JSON Schemas in `schemas/` by
`scripts/gen-config-docs`. Edit the schema or the generator, then run
`npm run docs`; the build fails on a stale diff.

* [Gate One configuration](gate-one/) — `api-routes.json` (`authProvider.type`: `dev`, `http-bridge`, `oidc`, `jwt`)
* [Broker configuration](broker/) — `cladone-auth`
* [Plugin manifest](plugin-manifest/)
* [Plugin trust store](plugin-trust-store/)
* [Usage event](usage-event/)

The schemas are also published for editor autocompletion and external
validation:

* [`api-routes.schema.json`](/schemas/api-routes.schema.json)
* [`broker.schema.json`](/schemas/broker.schema.json)
* [`plugin-manifest.schema.json`](/schemas/plugin-manifest.schema.json)
* [`plugin-trust-store.schema.json`](/schemas/plugin-trust-store.schema.json)
* [`usage-event.schema.json`](/schemas/usage-event.schema.json)
* [`inject-bundle.schema.json`](/schemas/inject-bundle.schema.json)
