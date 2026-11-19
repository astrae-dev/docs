# Deployment

Stay on one process until you cannot. Splitting gateway from workers costs you
Redis, another failure mode, and more pools.

[Sharding](../guides/sharding.md), [CLI](../cli.md).

## Settings

| Name | Purpose |
| --- | --- |
| Redis `noeviction` | When the member cache must be complete. |
| Separate Redis DBs | Isolate event transport from large caches. |
| Loopback metrics | Behind an authenticated reverse proxy if you expose them at all. |
| Explicit shard / cluster counts | Predictable rollouts. |
| Graceful shutdown | Cache and token-scoped files cleared. |
| SIGTERM | Through the client/supervisor lifecycle. Leave grace for tasks. |

## Roles

| Name | Purpose |
| --- | --- |
| `role="monolith"` | Default. One client owns shards, callbacks, optional in-memory cache. No Redis required for that. |
| `gateway` | Owns shard sockets. May publish events for workers. |
| `worker` | Consumes events. Does not own gateway sessions. |
| `redis` | Bus coordination. |
| `cache_redis` | Cache storage. May be the same service; separate DBs isolate failure. |
| Same namespace | Gateway and worker must agree on IPC/Redis and application code. |
| Shard ownership | Each shard exactly once. |

Redis ACLs, TLS, persistence, eviction, memory headroom, and failover are
yours.

## Capacity

| Name | Purpose |
| --- | --- |
| Redis pools | One per Python process. Size for the fleet. |
| Cache bounds | Entry counts, not bytes. Measure RAM before raising them. |
| Watch | Dropped writes, queue depth, event lag, worker partitions, REST 429s, reconnects. |
| Forced kill | Last event may replay. Cache may be incomplete. |
| Metrics ports | Consecutive ports for every local cluster. Scrape each process. |
| Host CPU/RSS | Same machine if several processes share a host. Not separate budgets. |
