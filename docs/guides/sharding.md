# Sharding and clusters

Every guild lives on one shard. A small bot can hold every shard in one
process. More shards is not automatically a cluster. Split when one process
is the wrong failure domain.

```bash
astrae cluster mybot --clusters 8 --shards 64
```

[CLI](../cli.md), [deployment](../operations/deployment.md).

## Names

| Name | Purpose |
| --- | --- |
| Gateway process | Owns Discord sockets. |
| Worker process | Consumes shard-affine event streams through Redis. |
| `ClusterSupervisor` | Spawn, restart, and reshard local children. |
| `ClusterContext` | Shard range and cluster identity for one child. |
| Redis | Required for every gateway and worker in a split deploy. |
| Partition | Ordering preserved per stream partition. At-least-once after a crash. |

## Process-local Redis

| Name | Purpose |
| --- | --- |
| `RedisPool.shared(url)` | One pool per URL in this Python process. |
| Cluster children | Separate processes. Separate pools. Size connections for the fleet. |

## Supervisor

| Name | Purpose |
| --- | --- |
| Contiguous shard ranges | Assigned to children. Remainder goes to earlier processes. |
| Restart | Unexpected exit. Exit 78 (`InvalidToken`) is not restarted. |
| Telemetry | Local. Not cross-host service discovery. |
| Metrics ports | Base port plus cluster ID. Keep them on loopback. |
| Token / Redis | Injected via environment or supervisor `env`. |
