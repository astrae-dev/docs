# Python source module catalog

Every module under `python/astrae/` in this tree. **Internal** means "this is
what the file is for", not "import it from your bot". Add a row when you add
a file.

Root names you can import: [exports](exports.md).

## Package root and process tooling

| Name | Purpose |
| --- | --- |
| `astrae.__init__` | Public re-exports and `__version__`. |
| `astrae.json` | orjson-backed `dumps`/`loads` for gateway, cache, REST, bus. Internal codec. |
| `astrae.cli` | `astrae cluster` parser, recommended shard lookup, process bootstrap. |
| `astrae.cluster` | Shard allocation, env context, process records, telemetry, restart/reshard. `ClusterSupervisor`/`ClusterContext` public. |
| `astrae.console` | Prompt-toolkit supervisor UI. Operational tool. |

## Client

| Name | Purpose |
| --- | --- |
| `client.__init__` | Constructor, properties, lifecycle. [Client](client/index.md). |
| `client.commands` | Command/listener/middleware/cog/extension/view registration and sync. |
| `client.gateway` | Gateway event hookup, interaction/prefix dispatch, cluster control. Internal mixin. |
| `client.census` | Event-derived guild/user counts. Estimates, not authoritative. |
| `client.warmup` | Member chunk/warmup queue and progress. |
| `client.voice.client` | Audio-source protocols, gateway voice-state ops. Incomplete. [Voice](client/voice.md). |
| `client.voice.__init__` | Voice exports. |
| `client.sentry` | `sentry_sdk` / Tracelet ingest, dashboard forwarding, exception capture. |
| `client.posthog` | PostHog hook, command-use events, Tracelet connection event. |

## Commands and interactions

| Name | Purpose |
| --- | --- |
| `commands.__init__` | Command package exports. |
| `commands.app` | `AppCommand`, decorators, subcommands, prefix/slash metadata. |
| `commands.context` | Shared, prefix, and interaction contexts. |
| `commands.current` | Injection markers. Resolution helpers internal. |
| `commands.dispatch` | Resolve invoke, run callbacks, listeners, middleware. Internal. |
| `commands.middleware` | Stack runner, `guild_only`, `owner_only`. |
| `commands.cogs` | Cog registration, `@listener`, extension load/unload and rollback. |
| `commands.plugin` | Lightweight command/listener bundle. |
| `commands.registry` | Current-client registration context for decorators. Internal. |
| `commands.messages` | Message payload composition, mention policy. Internal. |
| `commands.parsing.__init__` | Parsing package exports. |
| `commands.parsing.options` | Option descriptors, annotation inspection, Discord option payloads. |
| `commands.parsing.converters` | Prefix token/flag/mention/attachment conversion. Internal. |
| `commands.parsing.prefix` | Prefix tree/group/alias/choice matching. Internal. |
| `commands.interactions.__init__` | Interaction helper exports. |
| `commands.interactions.views` | Views, `@button`, collectors, callback store. |
| `commands.interactions.modals` | Modal payload and callback. |
| `commands.interactions.waiters` | Redis/local interaction and message waiters. |
| `commands.interactions.http` | ASGI endpoint, signature verification, PING, dispatch. `InteractionApp` public. |

## Core types, models, builders

| Name | Purpose |
| --- | --- |
| `core.__init__` | Core exports. |
| `core.docs` | Discord URL map (`DOCS`, `docs_for`). |
| `core.errors` | Framework, command, extension, HTTP/API errors. |
| `core.events` | Event context, value types, payload parsing. |
| `core.formatting` | Markdown, mentions, timestamps. |
| `core.permissions` | Permission bit conversion and effective calculation. |
| `core.types.__init__` | Protocol type exports. |
| `core.types.enums` | Command, interaction, component, channel, message, permission enums. |
| `core.types.intents` | Intent flags and names. |
| `core.types.presence` | Status/activity values and payload conversion. |
| `core.types.snowflake` | Snowflake timestamp helpers and `SnowflakeTime`. |
| `core.types.unset` | `UNSET`, omission, recursive payload conversion. |
| `core.models.__init__` | Model exports. |
| `core.models.asset` | CDN asset URL/size/format/animation. |
| `core.models.guild` | Guild, channel, role, overwrite, emoji, sticker. |
| `core.models.ids` | Snowflake field extraction. Internal. |
| `core.models.interaction` | Ready, interaction data, options, resolved objects. |
| `core.models.message` | Message, attachment, embed, reaction, component, sticker. |
| `core.models.users` | User, ClientUser, member, display/avatar helpers. |
| `core.builders.__init__` | Builder exports. |
| `core.builders.components` | Button, select, text input, action row. |
| `core.builders.embed` | Embed and field payloads. |
| `core.builders.mentions` | Allowed-mention policy. |
| `core.builders.poll` | Poll and poll-answer builders. |
| `core.builders.v2` | Components V2 container, section, gallery, file, text, separator. |

## REST and persistence

| Name | Purpose |
| --- | --- |
| `rest.__init__` | REST exports. |
| `rest.client` | `RestClient`, `HTTPClient`, resource groups, generic request. |
| `rest.emojis` | Application emoji data URI and sync. Internal. |
| `rest.resources.__init__` | Resource exports. |
| `rest.resources.base` | Shared REST request/payload helper. Internal. |
| `rest.resources.applications` | Application identity, command overwrite, application emojis. |
| `rest.resources.automod` | Auto-moderation rules. |
| `rest.resources.channels` | Channel, message, thread, reaction, pin, overwrite, invite. |
| `rest.resources.gateway` | Gateway discovery. |
| `rest.resources.guilds` | Guild, member, role, moderation, emoji, sticker, audit. |
| `rest.resources.interactions` | Initial response, original edits, followups. |
| `rest.resources.invites` | Invite fetch/delete. |
| `rest.resources.polls` | Poll voters and expiration. |
| `rest.resources.stage` | Stage instance create/get. |
| `rest.resources.stickers` | Sticker and Nitro pack reads. |
| `rest.resources.users` | Current user, lookup, DM, guild listing. |
| `rest.resources.voice` | Voice-region listing. Not a complete voice client. |
| `rest.resources.webhooks` | Webhook CRUD, execution, messages. |
| `rest.wire.__init__` | Transport/upload exports. |
| `rest.wire.transport` | Native, local proxy, Redis proxy contracts. |
| `rest.wire.proxy` | HTTP-facing REST proxy lifecycle. |
| `rest.wire.uploads` | `Upload` and multipart/proxy encoding. |
| `db.__init__` | Lazy database exports. |
| `db.core` | URL normalization, SQLAlchemy async engine, sessions, transactions. |
| `db.migrations` | Ordered up/down migrations and runner. |
| `db.orm` | SQLAlchemy declarative `Model` base. |

## Runtime

| Name | Purpose |
| --- | --- |
| `runtime.__init__` | Runtime exports. |
| `runtime.services` | Redis/PostgreSQL/PostHog/Tracelet probes. |
| `runtime.identify` | File-backed identify/session store. Format internal. |
| `runtime.telemetry` | Cluster UDP telemetry and control. Internal wire. |
| `runtime.tasks` | Periodic loops, cron, named leases/locks. |
| `runtime.redis.__init__` | Redis pool exports. |
| `runtime.redis.pool` | Process-local URL-keyed Redis pool. |
| `runtime.bus.__init__` | Bus exports. |
| `runtime.bus.ipc` | Bus protocol, memory/TCP/Unix, role selection, gateway worker. |
| `runtime.bus.idempotency` | Delivery-key completion log and once-only wrapper. |
| `runtime.bus.redis.__init__` | Redis bus exports. |
| `runtime.bus.redis.adapter` | Stream/lease partition assignment, publish, subscribe, ack. Internal. |
| `runtime.cache.__init__` | Cache exports. |
| `runtime.cache.policy` | Per-namespace enable/size/TTL/field rules. |
| `runtime.cache.store` | Facade, namespace methods, model construction, async write queue. |
| `runtime.cache.ingest` | Gateway event → cache mutations. Internal. |
| `runtime.cache.mutations` | Mutation buffer and batch ops. Internal. |
| `runtime.cache.backends.__init__` | Backend exports. |
| `runtime.cache.backends.adapter` | Adapter/writer protocols and cache entry. Internal. |
| `runtime.cache.backends.memory` | Process-local memory adapter. |
| `runtime.cache.backends.redis.__init__` | Redis backend exports. |
| `runtime.cache.backends.redis.adapter` | Redis CRUD/index/bulk/stat. Internal. |
| `runtime.cache.backends.redis.constants` | Key/schema version constants. Do not rely on key names. |
| `runtime.cache.backends.redis.keys` | Key/relationship encoding. Internal. |
| `runtime.cache.backends.redis.scripts` | Atomic Redis scripts. Internal. |
| `runtime.observe.__init__` | Observability exports. |
| `runtime.observe.late` | Late-event timing. Internal. |
| `runtime.observe.metrics` | Definitions, storage, snapshots, Prometheus. |
| `runtime.observe.monitor` | Event-loop lag sampler and task stacks. |
| `runtime.observe.gcfreeze` | Periodic collect/freeze. Pauses around member chunking. |
| `runtime.observe.web.__init__` | Metrics service exports. |
| `runtime.observe.web.service` | HTTP routing, auth, API, Prometheus, dashboard lifecycle. |
| `runtime.observe.web.dashboard` | Embedded dashboard HTML/CSS/JS. Internal. |

## Jishaku

| Name | Purpose |
| --- | --- |
| `jishaku.__init__` | Jishaku exports. |
| `jishaku.cog` | Eval, inspect, shell/git/pip/files/network, owner controls. Trust boundary is critical. |
| `jishaku.codeblocks` | Fenced code parsing. Internal. |
| `jishaku.output` | Codeblock formatting and execution namespace. Internal. |
| `jishaku.repl` | Async wrap/execute, scopes, inspect. Internal. Not a sandbox. |

A file map, not a stability promise. Import from [exports](exports.md).
Redis keys, wire formats, metric internals, and the native crate can change.
