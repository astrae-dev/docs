# Quickstart

One process, a prefix command, a token in `DISCORD_TOKEN`. Message Content has
to be on in the Developer Portal or guild message text never arrives.

```python
from typing import Annotated

from astrae import Client, CommandContext, Intents, StringOption

bot = Client(
    command_prefix="!",
    intents=Intents.DEFAULT | Intents.MESSAGE_CONTENT,
)

@bot.command(name="echo", description="Echo a message")
async def echo(
    ctx: CommandContext,
    message: Annotated[str, StringOption(description="What to say")],
) -> None:
    await ctx.reply(message)

bot.run()
```

## Names in this example

| Name | Purpose |
| --- | --- |
| `Client` | Bot process: gateway, commands, cache, REST. |
| `Intents.DEFAULT` | Guilds, guild messages, DMs, message content. |
| `Intents.MESSAGE_CONTENT` | Guild message text. Also enable it in the portal. |
| `@bot.command` | Prefix command that can also sync as an application command. |
| `CommandContext` | Reply surface. First callback argument. |
| `StringOption` | Slash option metadata on `Annotated`. |
| `bot.run()` | Owns the event loop. Reads `DISCORD_TOKEN` if you omit `token`. |

## After it boots

| Name | Purpose |
| --- | --- |
| `python bot.py` | Start the process. |
| `await bot.start()` | Use this if something else already owns the loop. |
| `bot.stop()` | Request shutdown. |
| `setup_hook()` | Async setup once per start. Not `on_ready`. |
| `@bot.slash_command` | Slash only. |
| `@bot.hybrid_command` | Prefix and slash, one callback. |
| `sync_commands=False` | Skip Discord command overwrite while you iterate. |
| `bot.setup_sentry()` | Errors and activity to Sentry / Tracelet (`SENTRY_DSN` / `TRACELET_DSN`). |
| `bot.setup_posthog()` | `command_used` events (`POSTHOG_API_KEY`). |
| `http://127.0.0.1:9100/` | Dashboard. See [metrics](../operations/metrics.md). |
