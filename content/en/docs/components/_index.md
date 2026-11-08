---
title: Components
linkTitle: Components
weight: 8
description: The services that make up a complete Gate One deployment, and how they fit together.
---

Gate One is one binary. A complete deployment adds a few separate
services around it: a reverse proxy in front, an identity provider, and —
depending on the features you enable — the optional `cladone-auth` broker,
a bridge, the token broker and Redis for shared state.

| Component | Role | Required? | Guide |
|---|---|---|---|
| **Gate One** | The gateway: route policy, session, proxy, MCP, injection | yes | [Install](/docs/install/) |
| **Identity provider** | Identification and (optionally) authorization claims | yes | [IAM and providers](/docs/iam-and-providers/) |
| **Reverse proxy** | TLS termination, routing, load balancing | recommended | [Reverse proxy](/docs/components/reverse-proxy/) |
| **`cladone-auth`** | Optional embedded IAM / OIDC issuer (IdP federation, grants) | optional | [cladone-auth](/docs/components/cladone-auth/) |
| **auth-bridge** | Reference implementation of the `http-bridge` contract | optional | [auth-bridge](/docs/components/auth-bridge/) |
| **Token broker** | Per-user delegated credentials for upstream calls | optional | [Token broker](/docs/components/token-broker/) |
| **Redis** | Shared session/revocation state for several replicas | only for HA | [Redis](/docs/components/redis/) |

The components that return identity or IAM facts — **[cladone-auth](/docs/components/cladone-auth/)**
and the **[HTTP bridge contract](/docs/components/bridge-contract/)** — are
the ones people confuse. `cladone-auth` is an OIDC issuer reached with
`authProvider.type: "oidc"`; the bridge is a request-verification service
reached with `http-bridge`. See
[IAM, IdPs and provider types](/docs/iam-and-providers/) for the
side-by-side.
