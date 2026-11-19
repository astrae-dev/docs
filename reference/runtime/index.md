# Runtime package

Buses, Redis, cache, loops, identify, health, metrics. You configure them on
`Client`. Leave the adapters alone unless a page says they are public.

[Cache guide](../../guides/caching.md), [metrics](../../operations/metrics.md).

## Event delivery and Redis

| Name | Purpose |
| --- | --- |
| `MemoryBus` | One process. Not cross-process. |
| Redis bus | How workers see events. You run Redis; Astrae does not. |
| Duplicate delivery | After a worker crash. Make side effects safe to repeat. |
| `RedisPool.shared(url)` | One pool per URL in this Python process. Not across cluster children. |
| Pool defaults | RESP2 (no `HELLO`), 2s command timeout, no retries, no idle `PING`s. |
| Timeout circuit | Cache writes and waiter lookups fail fast. Prefix commands still run. |
| `Bus.publish` / `subscribe` / `close` | Bus surface. |
| `RedisBus` | Partitions, worker leases, acks. |
| `GatewayWorker.emit` / `events` | Publish / consume gateway events. |
| `DeliveryLog` | Suppress repeat side effects for a delivery key. Match retention to your retry window. |
| `open_bus(ipc, pool=...)` | Select bus from IPC config. Unconfigured local client → in-process. |
| `Role` | `monolith`, `gateway`, or `worker`. Worker does not create sockets. |

## Cache

| Name | Purpose |
| --- | --- |
| `CacheConfig` | Per-namespace `CachePolicy`. |
| `CachePolicy` | `enabled`, `size`, `ttl`, optional `fields`. `None` means no bound, not "use the default". |
| `CacheConfig.none()` | Disable every namespace. |
| `CacheConfig.policy(name)` | Named policy. |
| `Cache.build(pool, config)` | Memory adapter with no pool; Redis with one. |
| `start` / `ingest` / `dispatch` / `flush` / `stop` / `clear` | Lifecycle. |
| Namespace ops | `get`, `model`, `of`, `all`, `count`, `contains`. |
| Redis backend | Normalized records and relationship indexes. |
| Memory backend | Process-local entries. |
| `MutationBuffer` | Batches set/patch/delete/clear/bulk before writes. |
| Full write queue | Drop the update. Do not block gateway dispatch. |
| Command dispatch | Reads the `GUILD_CREATE` guild blob. Does not scan emoji/sticker/member relations unless the callback uses them. |

Cache is event-derived. It is not durable storage.

## Identify and health

| Name | Purpose |
| --- | --- |
| `IdentifyStore` | File-backed session/identify state. Optimization, not a source of truth. |
| `report_service` / `service_states` | Component health probes. |
| Redis / database probes | Connectivity at that moment. Not future availability. |
| PostHog / Tracelet | Show in the cluster console after `setup_posthog()` / `setup_tracelet()`. |

## Scheduling and observability

| Name | Purpose |
| --- | --- |
| `@loop` | Periodic callback. Register with the client. |
| `Scheduler` | Cron plus named locks. Separate from `@loop`. |
| `LoopMonitor` | On. Stalls past 0.25s dump stacks, logs, metrics, dashboard. `loop_monitor=False` turns it off. |
| `METRICS` / `Metrics` | Process-global registry. `inc` / `set_gauge` / `observe`. |
| `snapshot()` | JSON. |
| `render()` | Prometheus text. Process-local. Scrape every process. |
| Cluster 0 dashboard | Merges Redis telemetry. Prometheus does not. |
| Cache stats | That backend's counts. Not "how many guilds Discord gave you." |
| `GcFreezer` | Aggressive collect/trim/freeze. Skips while chunks or the write queue are live. |
| `gc_freeze=False` | Disable. `GcFreezer()` is freeze-only. |
| `check_late` | Flag events that sat too long before dispatch. |
