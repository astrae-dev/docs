# Examples

Small files in `examples/`. Read them, then add your own checks and config
before you run them anywhere real.

| Name | Purpose |
| --- | --- |
| `ping.py` | Smallest client and command. Needs `DISCORD_TOKEN` and the native extension. |
| `echo.py` | Typed option and a reply. Message Content for prefix, or use slash. |
| `components.py` | Buttons and a view. |
| `cluster.py` | Supervisor, several gateway processes. Needs Redis. |
| `workers.py` | Worker role, events over Redis. Does not start Redis or a gateway for you. |

```bash
export DISCORD_TOKEN='...'
uv run python examples/ping.py
```

Do not commit a token.
