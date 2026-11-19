# Rust crates

`astrae-core` is the wire: shards, identify, REST, rate limits, crypto,
snowflakes, payload structs. Those structs are Discord JSON, not the Python
cache. `astrae-native` is the PyO3 glue. Import name: `astrae._native`.

This is ownership in this tree, not a stable Rust API. From Python use
`Client`, `RestClient`, and the documented models.

## `astrae-core`

| Name | Purpose |
| --- | --- |
| `src/lib.rs` | Crate exports and module declarations. |
| `src/constants.rs` | Protocol/runtime constants. |
| `src/error.rs` | Rust-side errors and conversions. |
| `src/crypto.rs` | Crypto used by native protocol integrations. |
| `src/intents.rs` | Gateway intent bits. |
| `src/events.rs` | Gateway event names and payloads. |
| `src/snowflake.rs` | Snowflake utilities. |
| `src/cache/mod.rs` | Rust cache primitives. Not the Python adapters. |
| `src/models/mod.rs` | Model module exports. |
| `src/models/application.rs` | Application and command protocol data. |
| `src/models/channel.rs` | Channel/thread protocol data. |
| `src/models/components.rs` | Component payload data. |
| `src/models/gateway.rs` | Gateway session payload data. |
| `src/models/guild.rs` | Guild protocol data. |
| `src/models/interaction.rs` | Interaction protocol data. |
| `src/models/member.rs` | Guild-member protocol data. |
| `src/models/message.rs` | Message protocol data. |
| `src/models/role.rs` | Role protocol data. |
| `src/models/user.rs` | User protocol data. |
| `src/gateway/mod.rs` | Gateway module exports. |
| `src/gateway/manager.rs` | Coordinates shard tasks. |
| `src/gateway/shard.rs` | One shard: identify, heartbeat, reconnect, events. |
| `src/gateway/plan.rs` | Shard/identify planning. |
| `src/gateway/identify_cache.rs` | Cached identify/session metadata. |
| `src/gateway/payload.rs` | Gateway payload serialize/parse. |
| `src/rest/mod.rs` | REST module exports. |
| `src/rest/client.rs` | HTTP execution and Discord responses. |
| `src/rest/routes.rs` | Routes and bucket identity. |
| `src/rest/ratelimit.rs` | Rate-limit tracking, waiting, retry. |
| `src/rest/ban.rs` | Ban/moderation helpers. |

## `astrae-native`

| Name | Purpose |
| --- | --- |
| `crates/astrae-native/src/lib.rs` | PyO3 init: runtime, REST/gateway ops, signature helpers. |

Callback queue limits, Tokio task layout, and wire details can change. They
are not extension points unless re-exported and documented.
