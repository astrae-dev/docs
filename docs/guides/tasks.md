# Background loops and scheduled work

`@loop(seconds=...)` marks a coroutine. The decorator alone does not start
anything. Register it with `client.add_loop(...)` or a cog that does.

```python
from astrae import Client, loop

bot = Client()

@loop(minutes=1)
async def refresh_status() -> None:
    print("refreshing status")
```

## `@loop`

| Name | Purpose |
| --- | --- |
| `seconds` / `minutes` / `hours` | Interval. Total must be positive. |
| `client.add_loop` | Actually schedule it. |
| First run | Waits one interval. |
| Raised error | Logged. The loop keeps going. |
| Overrun | Next iteration waits. No overlap. |
| Lifecycle | Starts and cancels with the client. |

## `Scheduler`

| Name | Purpose |
| --- | --- |
| `Scheduler.cron(expr)` | Five fields: minute, hour, day of month, month, weekday. `*`, int, or comma-separated ints. |
| Unsupported | Ranges, steps, named months/days. |
| Timezone | Uses the datetime's timezone. Watch DST. |
| `scheduler.start()` | Run registered cron callbacks. Not started by `@loop`. |
| `scheduler.stop()` | Cancel the runner. |
| `Scheduler.lock(name, ttl=30)` | Ownership token, or `None`. Without Redis this is process-local. |
| `Scheduler.hold(name, ttl=30)` | Acquire, renew about every third of TTL, release. |
| Cron claims | Minute-scoped lock names so two workers do not run the same named job in the same minute. |

This is best-effort. A paused process, partition, or expired lease can overlap
work. Make jobs idempotent.
