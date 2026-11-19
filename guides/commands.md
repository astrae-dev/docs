# Commands

Prefix, slash, hybrid, user/message menus. A decorator registers the callback.
Slash metadata syncs when the client is ready. Prefix reads gateway messages,
so guild use needs Message Content. Slash does not.

```python
from astrae import Author, CommandContext, CurrentGuild, CurrentRole

@bot.hybrid_command(name="who", description="Show invocation context")
async def who(
    ctx: CommandContext, author: Author, guild: CurrentGuild, role: CurrentRole
) -> None:
    await ctx.reply(
        f"{author.username} in {guild.id if guild else 'DM'}"
        + (f" as {role.mention}" if role else "")
    )
```

[Catalog](../reference/commands/catalog.md), [exports](../reference/exports.md).

## Registration

| Name | Purpose |
| --- | --- |
| `command` | Prefix command that can also sync as an application command. |
| `prefix_command` | Prefix only. |
| `slash_command` | Chat-input application command. |
| `hybrid_command` | One callback for prefix and slash. |
| `context_menu` | User or message context-menu command. |
| `sync_commands=False` | Skip Discord overwrite; another step owns registration. |

## Injected values

Not options. They come from the invoke. Guild ones are `None` in a DM.

| Name | Purpose |
| --- | --- |
| First argument | Always the context. |
| `CommandContext` | Interaction invoke: reply, defer, followup, update. |
| `PrefixContext` | Prefix invoke: channel replies and the same styled helpers. |
| `Author` / `CurrentUser` | Invoking user. |
| `CurrentMember` | Invoking member in a guild. |
| `CurrentGuild` | Guild for this invoke. |
| `CurrentChannel` | Channel for this invoke. |
| `CurrentRole` | Invoking member's highest role. |
| `StringOption` … `AttachmentOption` | Slash options on `Annotated`. |

## Replies and prompts

| Name | Purpose |
| --- | --- |
| `ctx.success` / `ctx.approve` | Approve-style mention embed. |
| `ctx.error` / `ctx.deny` | Error-style mention embed. |
| `ctx.neutral` | Neutral mention embed. |
| `ContextTheme` | Colors and emojis. Explicit `Client(context_theme=...)` wins. |
| `ASTRAE_COLOR_APPROVED` | Green. Also `_WARNED`, `_DENIED`, `_NEUTRAL`. `#RRGGBB`, hex, or a named color. |
| `ctx.prompt` / `ctx.confirm` | Approve / Decline buttons. Decline or timeout raises `UserInputError`. |
| `ctx.check` | Adds a 👍 reaction. |
| `ctx.paginate` | Button paginator for strings, embeds, fields, or files. Invoker only. 60s timeout. |
| `ctx.paginator` | Build the `Paginator` view without sending. |
| `ctx.files` | Paginate uploads. |
| `ASTRAE_PAGINATOR_PREVIOUS` | Override ◀️. Also `_NEXT`, `_NAVIGATE`, `_CANCEL`. Unicode or `<:name:id>`. |

## Errors, middleware, extensions

| Name | Purpose |
| --- | --- |
| Middleware | Wrap every invoke: checks, timing, app context. Call the next stage once. |
| `guild_only` | Reject DMs. |
| `owner_only` | Allow configured owner IDs only. Does not read `Client.owners` unless you pass them. |
| `Cog.cog_check` | Gate every command in the cog. False → silent `CheckFailure`. |
| `CommandError` | Expected rejection. Library maps most to `ctx.error`, help, or a cooldown reaction. |
| `@client.command_error` | Replace the default mapping. Also `cog_command_error` and `@command.error`. |
| Unexpected exceptions | Logged. Optional Sentry / Tracelet. User sees the error text, not a traceback. |
| `setup_posthog()` | `command_used` after success or failure. |
| Extension `setup(client)` | Register commands, listeners, cogs. Sync or async. Must be safe to repeat. |
| Reload | Tears down the old extension, reloads imported submodules, runs `setup` again. |
