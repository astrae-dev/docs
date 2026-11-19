# Caching

`client.cache.guilds`, `client.cache.users`, and the rest. Memory, or Redis if
you share. A miss can mean never seen, expired, evicted, or already shut down —
not "Discord does not have this."

```python
from astrae import CacheConfig, CachePolicy, Client, Intents

bot = Client(
    cache_redis="redis://127.0.0.1:6379/2",
    intents=Intents.DEFAULT | Intents.GUILD_MEMBERS,
    cache=CacheConfig(
        users=CachePolicy(size=None, ttl=None),
        members=CachePolicy(size=None, ttl=None),
    ),
    cache_all_members_after_boot=True,
    member_warmup_memory_limit_mb=1024,
)
```

[Runtime](../reference/runtime/index.md).

## Names

| Name | Purpose |
| --- | --- |
| `Cache` | Typed Discord entity cache. |
| `CacheConfig` | Per-namespace policies. Omitted means defaults. |
| `CachePolicy` | One namespace: enabled, size, TTL, optional `fields`. |
| `CachePolicy(enabled=False)` | Never write this namespace. |
| `size=None` / `ttl=None` | No bound for that dimension. Costs RAM. |
| `CacheConfig.none()` | Disable every namespace. |
| `cache_redis` | Redis URL/pool for cache. Falls back to `redis`. |
| Write queue | Default 20_000 events, batches of 128. Full queue drops the write. |

## Defaults

| Namespace | Purpose |
| --- | --- |
| Users | 250_000 entries. |
| Members | 500_000 entries. |
| Messages | 10_000 entries, 120s TTL. `max_messages` overrides size. |
| Invites | 600s TTL. |
| Presences | Disabled. |
| Guild structure | No size or TTL bound. |

## Redis layout

Users stored once. Members are compact guild records with a user reference.
Messages, presences, voice states, and guild blobs omit embedded duplicates.

| Name | Purpose |
| --- | --- |
| Stored user | Username, global name, avatar, banner, accent, bot flag, public flags, server tag. |
| Stored guild | Name, icon, banner, splash, description, features, owner, boost/verification/MFA/vanity, roles, channels, overwrites. |
| Own namespaces | Members, emojis, stickers. |
| Never queued | Soundboard, scheduled events, threads, decoration blobs. |

## Member warmup

| Name | Purpose |
| --- | --- |
| `chunk_guilds_at_startup` | Chunk guilds at startup. Separate from post-boot warmup. |
| `cache_all_members_after_boot` | Redis member warmup. Needs Guild Members, Redis, enabled unbounded user/member policies. |
| `member_warmup_concurrency` | Concurrent chunk requests. Default 1. |
| `member_warmup_interval` | Pause between requests. Default 1s. |
| `member_warmup_memory_limit_mb` | Pause new chunks when process RSS hits this. `ASTRAE_MEMBER_WARMUP_MEMORY_MB` overrides. |
| Pause | Stops new requests. Does not evict members already in Redis. |
| Dashboard | Uses census and cluster telemetry. Does not load guild/member payloads. |

Do not treat the cache as durable storage. Keep application rows in SQL.
