# Command-line interface

`astrae cluster` starts local children and gives them shard ranges. It does
not create a Discord app, Redis, a container, or a remote host.

```text
astrae cluster TARGET [arguments...] [--shards N|auto] [--clusters N]
                     [--restart-delay SECONDS] [--spawn-delay SECONDS]
                     [--name NAME] [--no-interactive]
astrae cluster --command 'PROGRAM ARG...' [same options]
```

## Arguments

| Name | Purpose |
| --- | --- |
| `TARGET` | Python file (`python TARGET`) or importable module (`python -m TARGET`). |
| `--` | Pass remaining args to the target. |
| `--command` | `shlex`-parsed child command instead of `TARGET`. |
| `--shards N` | Numeric shard count. Skips Discord lookup. |
| `--shards auto` | `GET /gateway/bot` via `DISCORD_TOKEN`. 401 raises `InvalidToken`. |
| `--clusters N` | Local children, 1 through shard count. Contiguous ranges; remainder to earlier processes. |
| `--restart-delay` | Default 1s after unexpected exit. |
| Exit 78 | `InvalidToken` / Discord 401 / gateway 4004. Not restarted. |
| `--spawn-delay` | Default 2s between starts. `ASTRAE_CLUSTER_SPAWN_DELAY` overrides. |
| `--no-interactive` | Skip the prompt-toolkit console. Also skipped without a TTY. |

## Child environment

| Name | Purpose |
| --- | --- |
| `ASTRAE_CLUSTER_ID` | This child's cluster index. |
| `ASTRAE_CLUSTER_COUNT` | How many children the supervisor started. |
| `ASTRAE_CLUSTER_GENERATION` | Supervisor generation. |
| `ASTRAE_SHARD_IDS` | Shard IDs this child owns. |
| `ASTRAE_SHARD_COUNT` | Total shards. |
| `ClusterContext.from_env()` | Read those values. |
| Token / Redis | Must already be in the environment or supervisor `env`. |

## Console

| Name | Purpose |
| --- | --- |
| Status / help | Local process view. |
| Restart / reshard | Local children over supervisor control channels. |
| Extension control | Reload/unload as implemented by `ClusterSupervisor`. |
| `execute_command` | Exact syntax in the installed release. Not remote orchestration. |
