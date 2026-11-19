# Client package

One `Client` per process. It owns the gateway, commands, cache, REST, and the
optional dashboard. Register commands and listeners, then `run()` or `start()`.

[Voice](voice.md), [runtime](../runtime/index.md), [REST](../rest/index.md).

## Lifecycle

| Name | Purpose |
| --- | --- |
| `run()` | Owns the loop and signals, then `start()`. Bad token: `InvalidToken`, exit 78. |
| `start()` | `setup_hook()`, services, metrics, then gateway or worker events until stop. Use this if you already have a loop. |
| `stop()` | Ask the loop to exit. Immediately refuse new dashboard connections. |
| `setup_hook()` | Async setup once per start. Do not call it yourself. |

## Constructor

| Name | Purpose |
| --- | --- |
| `token` | Bot token. Falls back to `DISCORD_TOKEN`. Required except worker role and public-key HTTP interactions. |
| `intents` | Gateway event mask. Default `Intents.DEFAULT`. Privileged bits also need the portal. |
| `primary_guilds` | Receive and store user server tags. Default `True`. |
| `prefix` / `command_prefix` | String, sequence, or callable. Mutually exclusive. |
| `case_insensitive` | Prefix command name matching. Default `True`. |
| `strip_after_prefix` | Drop whitespace between prefix and name. Default `True`. |
| `owners` / `owner_ids` | Owner ID collection. Mutually exclusive. |
| `max_messages` | Message cache size shortcut. Non-negative. Overrides that policy size. |
| `help_command` | Compatibility slot. Check the installed version. |
| `max_ratelimit_timeout` | Positive finite cap on REST rate-limit waits. |
| `sync_commands` | Overwrite application commands at ready. Default `True`. |
| `role` | `monolith`, `gateway`, or `worker`. Default `"monolith"`. |
| `ipc` | Bus config for `open_bus`. Distributed roles need a shared transport. |
| `redis` | Pool or URL for bus/services/proxy. String → process-shared pool. Exposed as `client.redis`. |
| `cache_redis` | Cache pool or URL. Falls back to `redis`. |
| `dsn` | Database URL or `Database`. `postgres://`, `sqlite://`, `mysql://`. Falls back to `DATABASE_URL` / `POSTGRES_URL`. Exposed as `client.db` and `client.postgres`. |
| `rest_proxy` | Worker REST through proxy transport. Default `False`. |
| `metrics` | Collection and HTTP listener. Default `True`. |
| `metrics_host` | Default `"127.0.0.1"`. `ASTRAE_METRICS_HOST` overrides. |
| `metrics_port` | Default 9100. `ASTRAE_METRICS_PORT` overrides. Cluster ID may offset. |
| `metrics_token` | Bearer for API/Prometheus. `ASTRAE_METRICS_TOKEN` overrides. |
| `loop_monitor` | Lag watchdog. Default `True`. Pass `False` or a `LoopMonitor`. |
| `gc_freeze` | Aggressive collect/freeze. Default `True`. `False` disables. `GcFreezer()` is freeze-only. |
| `late_event_seconds` | Late-dispatch threshold. Default `5.0`. |
| `chunk_guilds_at_startup` | Member chunks at startup. Default `False`. |
| `cache_all_members_after_boot` | Redis member warmup. Needs member intent, Redis, unbounded user/member policies. |
| `member_warmup_concurrency` | Concurrent chunk requests. Default `1`. |
| `member_warmup_interval` | Pause between requests. Default `1.0`. |
| `member_warmup_memory_limit_mb` | RSS ceiling that pauses new chunks. `ASTRAE_MEMBER_WARMUP_MEMORY_MB` overrides. |
| `cache` | `CacheConfig`. Omitted means policy defaults. |
| `public_key` | Application public key for HTTP interactions without a gateway token. |
| `shards` | `"recommended"`, explicit IDs, or `None`. |
| `allowed_mentions` | Default mention policy. Omitted means suppress mentions. |
| `status` / `activity` | Initial presence. |

## State

| Name | Purpose |
| --- | --- |
| `user` | Connected bot account (`ClientUser`) after READY. |
| `user.avatar` | Embed-safe asset (custom or default). |
| `user.banner` | Hydrated from `GET /users/@me` when READY omits it. `USER_UPDATE` refreshes it. |
| `application_id` / `user_id` | After identity is known. |
| `recommended_shards` | Discord's recommended shard count. |
| `running_shards` / `shard_states` | This process. |
| `latency` | Current heartbeat latency in milliseconds. |
| `avg_latency` | Mean across ready shards. Lives on `Client`, not `user`. |
| `lib` / `library` | `"astrae"`. |
| `version` | Installed Astrae version. |
| `guild_count` / `server_count` | Fleet guild total after other clusters publish, else this process. `len(guild_count)` works. |
| `user_count` / `global_user_count` | Fleet member total. |
| `memory` / `memory_usage` | Fleet RSS in mebibytes. |
| `cpu` | Process CPU percent across all cores. |
| `command_count` | Registered commands and groups, excluding aliases, including nested commands. |
| `owners` | `set[int]`. |
| `prometheus` | Rendered exposition text. |

## Lookups

| Name | Purpose |
| --- | --- |
| `get_guild` / `get_channel` / `get_user` / `get_member` / `get_role` / `get_emoji` | Cache lookup. |
| `fetch_guild` / `fetch_channel` / `fetch_user` / `fetch_member` / `fetch_role` / `fetch_message` / `fetch_invite` / `fetch_webhook` | REST lookup. |
| `get_command` / `get_cog` | Registry lookup. |
| `in_guild` | Whether this process knows that guild. |

## Methods

| Name | Purpose |
| --- | --- |
| `set_presence` | Update gateway presence. |
| `once` | One-time listener. |
| `wait_for` | Await a matching event. Optional predicate/timeout. |
| `wait_for_message` | Await a matching message. Workers may use Redis. |
| `request_members` | Request guild member chunks. |
| `lock` / `unlock` / `hold` | Scheduler named locks. |
| `broadcast` | Worker/gateway control messages. |
| `remove_command` / `resync_commands` | Command registry. |
| `add_listener` / `remove_listener` | Event callbacks. |
| `load_extension` / `unload_extension` / `reload_extension` | Modules with `setup(client)`. |
| `add_cog` / `add_plugin` / `add_view` / `add_loop` | Register groups, views, loops. |
| `setup_sentry` / `setup_tracelet` | Errors and activity to Sentry or Tracelet. `SENTRY_DSN` / `TRACELET_DSN`. Optional extra. |
| `setup_posthog` | `command_used` events. `POSTHOG_API_KEY`. Optional extra. |

## Prefix and limits

| Name | Purpose |
| --- | --- |
| Prefix callable | Stored as `prefix_for`. Check the installed signature. |
| `case_insensitive` | Lowercases command-name comparison. Does not rewrite argument text. |
| `owner_only(*ids)` | Its own IDs. Does not read `client.owners`. |
| Constructor rejects | Both prefix aliases, both owner aliases, non-positive warmup concurrency, negative interval, full warmup without `GUILD_MEMBERS` / Redis / unbounded user+member policies. |
