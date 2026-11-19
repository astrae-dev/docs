# Metrics API and dashboard

On by default at `http://127.0.0.1:9100/`. Loopback on purpose.

```python
bot = Client(metrics_token="replace-me")
```

```bash
ASTRAE_METRICS_TOKEN=replace-me python bot.py
```

## Configuration

| Name | Purpose |
| --- | --- |
| `metrics=True` | Collection and HTTP service. Pass `False` to disable. |
| `metrics_host` | Bind address. Default `127.0.0.1`. `ASTRAE_METRICS_HOST` overrides. |
| `metrics_port` | Default 9100. `ASTRAE_METRICS_PORT` overrides. Cluster ID may offset. |
| `metrics_token` | Bearer for API and Prometheus. `ASTRAE_METRICS_TOKEN` overrides. HTML dashboard stays local. |
| Cluster 0 | One dashboard. Other clusters publish expiring telemetry to Redis. |
| `ASTRAE_METRICS_PER_CLUSTER` | Extra dashboards: cluster ID added to the base port. |
| `pip install '.[metrics]'` | `psutil` for CPU/RSS. Without it those gauges are missing. |
| `LoopMonitor` | On by default. Stalls go to logs, metrics, and the dashboard. |

When a token is set:

```text
Authorization: Bearer replace-me
```

## Endpoints

| Name | Purpose |
| --- | --- |
| `/` / `/dashboard` | Live dashboard, refreshed every two seconds. |
| `/dashboard/commands` | Live command logs across every cluster. |
| `/dashboard/operations` | Commands, Discord requests, components, views, errors. |
| `/dashboard/guilds` | Top guilds, member totals, shard state, guild lookup. |
| `/api/v1` | API metadata and endpoint discovery. |
| `/api/health` / `/api/v1/health` | Fleet health: counts, latency, rates, per-cluster, per-shard. |
| `/api/v1/metrics` | Self-describing metric catalog and current values. |
| `/api/v1/dashboard` | Guild, member, and shard operational details. |
| `/api/v1/dashboard/live` | Lightweight cluster, memory, shard, activity, and error state. |
| `/api/v1/users/{user_id}/mutual-guilds` | Mutual guilds found in the member cache. |
| `/metrics` | Prometheus text. Process-local. Scrape every process. |

## JSON snapshot fields

| Name | Purpose |
| --- | --- |
| `generated_at` | Snapshot time. |
| `summary.families` / `summary.series` | Counts in this snapshot. |
| `metrics[].name` | Raw Prometheus name. |
| `title` / `description` / `type` / `unit` | Human metadata. |
| `labels` | Label meanings. Bounded categories only. No URLs, Discord IDs, or message text. |
| `series` | Labeled current value plus bounded history. |
| `statistics` | Histogram summary: count, sum, min, max. Not every sample. |

## Health fields

| Name | Purpose |
| --- | --- |
| `users` | Global member total from gateway census. |
| `user` | Connected bot account (`name`, `avatar`, `banner`) when known. |
| `lib` / `version` | Library name and installed version. |
| `avg_latency` / `latency` | Mean gateway round trip in milliseconds. |
| `server_count` | Fleet guild total. |
| `commands` / `command_count` | Registered commands and groups, excluding aliases. |
| `commands_total` | Completed invocations. |
| `gateway` / `cache` | Events and cache operations per second. |
| `cache_hit` | Hit percentage. |
| `cpu` | Process CPU percent across all cores. `100` means every core is busy. |
| `memory` | Resident set size in mebibytes. Not the Python heap. |
| `per_cluster` | Those stats per reporting process. |
| `per_shard` | Guild, user, channel, role, latency, gateway rate, owner, ready, lifecycle. |
| `history` | Latest 120 samples, about every five seconds. `at` is Unix ms. |
| Channel / role totals | Guild payloads plus later create/delete events. Not a cache scan. |

## What else is measured

| Name | Purpose |
| --- | --- |
| Commands | Invocations, outcome, source, duration. |
| Gateway dispatch | Handler outcomes and time. |
| REST | Count by method and outcome, plus duration. Route IDs become `{id}`. |
| Shards | Known and ready counts. |
| Workers | Queue depth and leased partitions. |
| Views | Persistent and timed component views, plus component count. |
| Fleet RSS | Sum of reporting clusters, plus per-cluster warmup memory. |
| Guild page | Shared inventory: ownership, features, boost, channels, roles, emojis, stickers, cached members. IDs as strings. |
| Mutual guilds | Complete only with member cache + warmup. Otherwise marked cached-only. |
| Warmup | RSS, ceiling, cached members, pending chunks, paused flag. |
| `GcFreezer` | Count, duration, permanent-generation objects, skipped while chunks fly. |
| Errors | Latest 100 log records. Loop stalls include task stacks. |
| Activity | Latest 250 per process, merged newest-first. No bodies, headers, query, or tokens. |
| Sentry / Tracelet | Same errors and activity after `setup_sentry()` / `setup_tracelet()`. |

## Scope

| Name | Purpose |
| --- | --- |
| In-process | Metrics reset on restart. Not persisted. |
| Prometheus | This process only. |
| Dashboard | Merges expiring Redis telemetry when a shared cache is configured. |
| No Redis | `"scope":"process"`. Current process only. |
| Stopped cluster | Expiring records disappear. No stale dashboard rows. |
| Bearer token | Shared secret, not user auth. Do not publish the listener. |
