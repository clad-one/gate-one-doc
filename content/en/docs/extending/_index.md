---
title: Extending Gate One
linkTitle: Extending
weight: 50
description: Build and trust out-of-process extensions, and publish them for other operators.
---

Gate One extensions are **out-of-process services**. The gateway never
loads third-party code and never calls an extension on the authentication
path. This section is for **plugin authors and publishers**: the event
contract, the signed manifest, the trust store and the publish/revoke
workflow.

Start here if you are writing or shipping an extension:

* [Plugins](/docs/extending/plugins/) — families, invariants, the event
  consumer contract, the manifest and the trust store.
* [Publish and trust a plugin](/docs/extending/publish-a-plugin/) —
  develop unsigned, sign, install and revoke.

The generated references stay in the Configuration section and are linked
from both pages:

* [Plugin manifest](/docs/config/plugin-manifest/)
* [Plugin trust store](/docs/config/plugin-trust-store/)
* [Publisher feed](/docs/config/publisher-feed/)
* [Usage event](/docs/config/usage-event/)

If you only **use** Gate One, see
[Usage events](/docs/features/usage-events/) instead.
