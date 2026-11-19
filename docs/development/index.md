# Development

Python talks to Discord through the Rust crate in `crates/astrae-native`. If
you change one side, keep the other honest.

```bash
uv sync --extra dev --extra docs
uv run black python tests examples
uvx isort python tests examples
uv run mypy python/astrae
uv run pytest -q
cargo fmt --all -- --check
cargo check --workspace
uv run mkdocs build --strict
git diff --check
```

## Checks

| Name | Purpose |
| --- | --- |
| Native tests | Required when native behavior changes. `cargo check` is not enough. |
| Optional extras | Test the installed path **and** the fallback without the extra. |
| `tests/` | Put the regression next to the thing you changed. Hit the public API. |
| `docs/` | Add the page to `mkdocs.yml`. Keep an `index.md` in every folder. |
| Strict MkDocs | Broken links fail locally. |
| `skills.md/refactoring.md` | Naming, licenses, typing, imports. |

## Catalogs

| You changed | Update |
| --- | --- |
| A Python module | [module index](../reference/module-index.md) |
| `astrae.__all__` | A row in [exports](../reference/exports.md). A test compares the two. |
| A Rust source file | [Rust crates](../internals/rust.md) |

When behavior changes, say the default, who owns the resource, which intents
or extras it needs, and what happens when it fails. If a type exists but the
feature is incomplete, say that. `VoiceClient` in `__all__` is not working voice.
