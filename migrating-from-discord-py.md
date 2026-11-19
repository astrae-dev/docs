# Migrating from discord.py

Names look familiar. It is not a fork. `import astrae` in place of
`import discord` will not boot your bot. Port one piece at a time, on a test
app, with a way back.

## Before you start

| Name | Purpose |
| --- | --- |
| `0.1.0` | Check events and REST you need actually run. Voice is a stub. |
| Native extension | `pip install` of the Python tree without Maturin will not open a gateway. |
| Test app | Portal intents and bot permissions are not the same switch. |
| Secrets | `DISCORD_TOKEN`, Redis URL. Not production credentials. |
| Sharp edges | `commands.Context`, converters, cogs, tasks, views, `bot.http`, "the cache always has this member." |

## Concept mapping

| Name | Purpose |
| --- | --- |
| `discord.Client` / `commands.Bot` | `astrae.Client`. Gateway, commands, cache, REST, lifecycle. |
| `commands.Bot(command_prefix=...)` | `Client(command_prefix=...)`. Prefix needs Message Content in the portal and on the client. |
| `discord.Intents` | `astrae.Intents`. Rebuild the bitmask. Do not assume identical defaults. |
| `@bot.command()` | `@bot.command()`. Prefix callback gets `PrefixContext`. Conversion differs. |
| `@bot.tree.command()` | `@bot.slash_command()`. Options via `Annotated`. |
| Hybrid | `@bot.hybrid_command()`. One callback; parsing and replies still differ. |
| `commands.Context` | `PrefixContext` or `CommandContext`. |
| `Member` / `User` / `ClientUser` | Parsed payloads. Cache does not guarantee presence. |
| `bot.user` | `ClientUser` after READY. Process stats (`avg_latency`, `memory_usage`, `cpu`) live on `Client`. |
| `@bot.event` / `@bot.listen` | Same names. Verify event coverage. |
| `commands.Cog` | `astrae.Cog`. `cog_check` and `cog_command_error` run automatically. Port `cog_load` / `cog_unload` yourself. |
| `discord.ui.View` | `View`, `@button`, builders. `timeout=None` and re-register stable custom IDs. |
| `discord.ext.tasks.loop` | `@astrae.loop` + `client.add_loop`. Decoration alone does not schedule. |
| `bot.http` | `RestClient` resource methods. |
| `discord.utils.get` | `client.cache` or REST. Misses are normal. |
| `discord.VoiceClient` | Names exist. Not feature-equivalent. |
| `discord.LoginFailure` | `InvalidToken` (`LoginFailure` alias). REST 401 or gateway 4004. `Client.run()` exits 78. |

## Client lifecycle

```python
from astrae import Client, Intents

bot = Client(
    command_prefix="!",
    intents=Intents.DEFAULT | Intents.MESSAGE_CONTENT,
)

async def main() -> None:
    await bot.start()

bot.run()
```

| Name | Purpose |
| --- | --- |
| `run()` | Owns the asyncio loop and signals. Reads `DISCORD_TOKEN` by default. |
| `start()` | Already-running loop. Do not call both. |
| `setup_hook()` | Async init once per start. `on_ready` can fire again on reconnect. |
| `Intents.MESSAGE_CONTENT` | Prefix parsing ordinary guild text. |
| `Intents.GUILD_MEMBERS` | Member chunking. Privileged: portal first. |
| Invite permissions | Sending, roles, moderation. An intent is not a permission. |

## Commands

```python
from typing import Annotated
from astrae import Client, CommandContext, IntegerOption

bot = Client()

@bot.slash_command(name="repeat", description="Repeat text", guild_id=123456789)
async def repeat(
    ctx: CommandContext,
    count: Annotated[int, IntegerOption(description="Number of repeats", min_value=1, max_value=5)],
) -> None:
    await ctx.reply(f"Repeated {count} times")
```

| Name | Purpose |
| --- | --- |
| First argument | Context. Not a Discord option. |
| `Annotated` + option descriptor | User-facing slash options. |
| discord.py converters | Not recognized. Parse/validate yourself. |
| `Author` / `Current*` | Injected from the invoke. Not options. |
| `CurrentRole` | Invoking member's highest role (`Member.top_role`). |
| `Role.is_dangerous` | Kick, ban, administrator, manage guild/roles/channels, and similar bits. |
| `sync_commands=True` | Bulk overwrite at ready. `False` opts out. Do not compete with another deploy. |
| `ctx.reply()` (prefix) | Channel message. |
| `ctx.reply()` (interaction) | Initial response, or edit after defer. |
| `ctx.followup()` | Another interaction message. |
| `ctx.defer()` / `ctx.defer_update()` | Acknowledge slow work / component. |
| Ephemeral | Interaction only. Branch in hybrid callbacks. |
| `cog_check` | False → silent `CheckFailure`. May be async. |
| `self.client.owners` | `set[int]`. Use `id in self.client.owners`. |
| `owner_only(*ids)` | Its own ID list. Does not read `Client.owners`. |
| Error handlers | `cog_command_error`, `@bot.command_error`, `@command.error`. No tracebacks to users. |

## Events, cogs, cache, REST

| Name | Purpose |
| --- | --- |
| Event names | Lowercase. Verify the parsed model. |
| Dispatch path | No blocking `time.sleep`. |
| `Cog` | Binds decorated commands/listeners on `add_cog()`. |
| `setup(client)` | Extension entry. Sync or async. Safe to repeat. Optional `teardown`. |
| Cache miss | Normal. Fetch when you need a current object. |
| Models | Snapshots. Changing a field does not call REST. |
| `client.http` / `RestClient` | Replace private `bot.http` calls. |
| `client.add_view()` | Every process that should handle the view. |
| `@loop` | Register with the client. Distributed jobs need Redis locks and idempotency. |

## Sequence

| Step | Purpose |
| --- | --- |
| 1 | Config, secrets, intents, minimal startup. |
| 2 | One prefix command and one slash command in a test guild. |
| 3 | Replies, errors, checks. DMs, missing permissions, deferral. |
| 4 | Listeners. Required intents and model fields. |
| 5 | Cogs/extensions with repeatable setup/teardown. |
| 6 | Cache misses and explicit fetch. |
| 7 | Loops and views. Restart and multi-process. |
| 8 | REST traffic, metrics, logs, reconnects. Then production. |

Keep the discord.py deploy until each workflow passes a test-guild checklist.
Do not run both versions on the same token and shard IDs.
