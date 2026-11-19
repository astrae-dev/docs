# Database package

Your settings, queues, whatever you persist. Gateway events and the Discord
cache do not go here.

```python
from astrae import Database

db = Database.shared("sqlite:///bot.db")
await db.connect()

row = await db.fetchrow(
    "SELECT value FROM settings WHERE name = :name",
    {"name": "greeting"},
)

async with db.transaction() as connection:
    await connection.execute(
        "UPDATE settings SET value = :value WHERE name = :name",
        {"value": "Hello", "name": "greeting"},
    )

await db.close()
```

## URLs

| Name | Purpose |
| --- | --- |
| `sqlite:///bot.db` | `sqlite+aiosqlite`. Own pool. |
| `postgresql://` / `postgres://` | `postgresql+asyncpg`. |
| `mysql://` / `mariadb://` | `mysql+asyncmy`. |
| `pool_size` / `max_overflow` / `pool_timeout` / `pool_recycle` | Postgres/MySQL pool knobs. |

Drivers ship with the default install.

## Connections

| Name | Purpose |
| --- | --- |
| `Database.shared(url)` | One registry instance per normalized URL in this process. Not across processes. |
| `connect()` | Optional eager connectivity check. |
| `fetch` | All rows as dictionaries. Named `:parameter` bindings. |
| `fetchrow` | First row or `None`. |
| `fetchval` | One column or `None`. |
| `execute` | `ExecuteResult` with row count and inserted key when the dialect reports it. |
| `transaction()` | Commit on exit, rollback on exception. |
| `session()` | ORM `AsyncSession`. Same commit/rollback. |
| Async context manager | Verify on entry, close the engine on exit. |
| `Database.close_all()` | Shut down every shared instance in this process. |

Bind values. Do not interpolate user input into SQL.

## Migrations

| Name | Purpose |
| --- | --- |
| `Migration` | Positive integer version, name, `up`, optional `down`. SQL, a sequence, or a callback on `Connection`. |
| `Migrator.upgrade()` | Apply unapplied versions in order. Recorded in the same transaction. |
| `downgrade(target)` | Reverse in descending order. Fails if a required `down` is missing. |

Downgrade SQL is an operator decision. Back up first.
