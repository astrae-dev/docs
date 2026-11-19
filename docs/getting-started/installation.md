# Installation

Python 3.11+. Astrae talks to Discord through a Rust extension. A pure Python
install will not open a gateway.

```bash
pip install maturin
git clone https://github.com/astrae-dev/astrae.git
cd astrae
maturin develop
```

With `uv`:

```bash
uv sync --extra dev
```

## What you need

| Name | Purpose |
| --- | --- |
| Python 3.11+ | Runtime for the bot process. |
| Rust + Maturin | Build `astrae._native` for this ABI. |
| `DISCORD_TOKEN` | Bot token. Do not commit it. |
| Redis | Optional. Shared cache, workers, REST proxy. |
| SQL drivers | SQLite / Postgres / MySQL ship with the base install. |

## Extras

Names in `pyproject.toml`. The base project already pulls Redis, async SQL
drivers, prompt-toolkit, and Black.

| Extra | Purpose |
| --- | --- |
| `dev` | Tests, typing, formatters. |
| `docs` | MkDocs preview. |
| `redis` | Redis extras if you want a thinner wheel. |
| `db` / `sqlite` / `postgres` / `mysql` | Database extras if you want a thinner wheel. |
| `cluster` | Supervisor / console extras. |
| `metrics` | `psutil` for dashboard CPU and RSS. Without it those gauges are missing. |
| `sentry` | `sentry_sdk` for `Client.setup_sentry()`. |
| `posthog` | PostHog for `Client.setup_posthog()`. |

Preview docs:

```bash
uv sync --extra docs
uv run mkdocs serve --dev-addr 0.0.0.0:8000
```

`0.0.0.0` is for opening the preview from another machine. Do not leave the
MkDocs dev server on the public internet.

## Discord application

| Step | Purpose |
| --- | --- |
| Create a bot in the Developer Portal | Token and application ID. |
| `DISCORD_TOKEN` | Process environment, not source. |
| Privileged intents | Portal **and** `Client(intents=...)`. |
| Message Content | Required for prefix commands that read guild message text. |
| Invite permissions | What the bot can do. An intent is not a permission. |
