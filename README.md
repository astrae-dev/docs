# Astrae docs

Documentation for [Astrae](https://github.com/astrae-dev/astrae), a Discord framework. Commands, events, cache policy, and SQL are Python. The websocket, HTTP client, and rate limiter run in a Rust extension in the same process.

Read [the home page](docs/index.md) first. Python 3.11+. The gateway needs the native extension (`maturin develop`). Redis is optional until you split processes or share cache.

## Pages

| Page | Purpose |
| --- | --- |
| [Home](docs/index.md) | What ships, with the shapes you write. |
| [Getting started](docs/getting-started/index.md) | Install from source and run one command. |
| [Guides](docs/guides/index.md) | Commands, events, components, cache, shards, loops. |
| [API reference](docs/reference/index.md) | Names you import, and what they own. |
| [Public exports](docs/reference/exports.md) | Every `from astrae import …` name. |
| [Operations](docs/operations/index.md) | Dashboard, Redis, deploy. |
| [CLI](docs/cli.md) | `astrae cluster`. |
| [Internals](docs/internals/index.md) | Rust crates behind `astrae._native`. |
| [Examples](docs/examples/index.md) | Small files in the library's `examples/`. |
| [Migrating from discord.py](docs/migrating-from-discord-py.md) | Port notes. Familiar names, different runtime. |
| [Development](docs/development/index.md) | Checks to run when behavior changes. |

## Preview

MkDocs config lives in the library repo. These files are that repo's `docs/` tree.

```bash
git clone https://github.com/astrae-dev/astrae.git
cd astrae
uv sync --extra docs
uv run mkdocs serve
```

`uv run mkdocs build --strict` fails on a broken link. Every folder keeps an `index.md`. A new page also needs a row in `mkdocs.yml`.

Theme files in this tree: `docs/stylesheets/theme.css`, `docs/javascripts/theme.js`, `docs/assets/astrae-logo.svg`.

## Editing

Say the default, who owns the resource, which intents or extras it needs, and what happens when it fails. A name on `from astrae import …` can still be unfinished. Voice types are stubs.
