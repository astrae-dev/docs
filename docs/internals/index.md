# Internals

Rust owns the sockets, HTTP, and rate limits. Python owns commands, events,
cache policy, and the dashboard.

| Page | Purpose |
| --- | --- |
| [Rust crates](rust.md) | `astrae-core` wire types and `astrae-native` PyO3 glue. |
| [Public exports](../reference/exports.md) | Names you import from Python. |
| [Module index](../reference/module-index.md) | Every Python file under `python/astrae/`. |
