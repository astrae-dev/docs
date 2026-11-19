# Commands API catalog

More than the [command guide](../../guides/commands.md). Decorator signatures
differ by kind — check the type hints you actually installed.

## Registration

| Name | Purpose |
| --- | --- |
| `Client.command` | Prefix invoke; may also sync as an application command. |
| `Client.prefix_command` | Prefix only. |
| `Client.slash_command` | Chat-input application command. |
| `Client.hybrid_command` | Prefix and slash, one callback. |
| `Client.context_menu` | User- or message-target context menu. |
| Module-level decorators | Same names, then attach to a client, cog, or plugin. |
| Metadata | Name, description, guild scope, NSFW, default member permissions, localizations, contexts, aliases, `auto_defer`. |
| Sync | Global commands are bulk-overwritten. Do not compete with another deploy. |

## Options and conversion

| Name | Purpose |
| --- | --- |
| `Annotated[T, Option(...)]` | Discord-visible option. |
| `StringOption` … `AttachmentOption` | Description, required/default, choices, bounds, channel types, localizations. |
| Enum annotations | Become choices when the Python type is supported. |
| Optional / default | Affect requiredness. Discord caps option counts and lengths. |
| Prefix conversion | Quoted tokens, positionals, flags, mentions/IDs, attachments. |
| `BadArgument` / `ConversionError` | Conversion failed. |
| `MissingRequiredArgument` | Value omitted. |
| `Author` / `CurrentUser` / `CurrentMember` / `CurrentGuild` / `CurrentChannel` / `CurrentRole` | Injected. Not options. Guild ones can be `None` in a DM. |

## Groups, middleware, errors

| Name | Purpose |
| --- | --- |
| `AppCommand.subcommand` | Nested command. |
| Prefix grouping | `group`, `flat`, `omit`, aliases, nested groups. |
| `AppCommand.error` | Command-specific handler. |
| `Client.add_middleware` / `@client.middleware` | Wrap invoke. Call the next stage once if the callback should run. |
| `guild_only` | Reject DMs. |
| `owner_only` | Configured owner IDs. Not Discord permission config. |
| `CommandError` | Expected failure. |
| `CommandInvokeError` | Callback raised; original exception attached. |
| Default handler | Missing args, converters, cooldowns, permissions, NSFW, flags, invoke errors → `ctx.error` / help. |
| Silent | `NotOwner` and a bare `CheckFailure`. |

## Cogs, plugins, extensions

| Name | Purpose |
| --- | --- |
| `Cog` | Decorated commands/listeners. Optional `setup` / `teardown`. |
| `cog_check` | Gate every command in the cog. False → silent `CheckFailure`. May be async. |
| `cog_command_error` | After per-command handler, before client handler. |
| `Plugin` | Lightweight command/listener bundle. |
| `setup(client)` | Extension entry. Sync or async. Recorded for later removal. |
| Reload | Repeat setup. Make it idempotent. Close resources in teardown. |
| `@listener` | Event callback for cog discovery. |
| `add_listener` / `add_cog` / `add_plugin` | Dynamic registration. |

## Interaction utilities

| Name | Purpose |
| --- | --- |
| `View` | Buttons/selects with callbacks. |
| `button` | Bind a view method. |
| `View.rows()` | Serialize components. |
| `Paginator` | `ctx.paginate(pages)` sends it. `ctx.paginator(pages)` builds it. |
| Pages | Strings, embeds, field dicts, or `Upload` files. Invoker-only. Wrap, jump, time out. |
| Paginator emojis | `emojis=`, `ASTRAE_PAGINATOR_*`, or `.env` / `ASTRAE_ENV_FILE`. |
| `Modal` | Modal inputs and submit. |
| `ComponentCollector` | Wait for a custom ID. Redis can span workers. |
| `InteractionApp` | HTTP endpoint. `verify` uses the application public key. |
| Restarts | Callbacks are not persisted. Re-register persistent views. |

## Context

| Name | Purpose |
| --- | --- |
| `client` / `bot` | Owning client. |
| `user` / `member` / `author` | Invoker. |
| `guild_id` / `channel_id` / `guild` / `channel` / `role` / `me` | Invoke location. `role` is highest guild role. |
| `created_at` / `theme` / `replied_message` | Timestamp, `ContextTheme`, last reply. |
| `success` / `approve` / `error` / `deny` / `neutral` | `{emoji} {mention}: {text}` embeds. |
| `ASTRAE_COLOR_*` | Theme colors from env / `.env` / `ASTRAE_ENV_FILE`. |
| `prompt` / `confirm` | Approve / Decline buttons. |
| `check` | 👍 reaction. |
| `embed` / `create` | Build embed payloads. |
| `files` | Paginate uploads. |
| `get_attachment` | Invoking message, then reply, then recent history. |
| `suppress_embeds` / `quietly_delete` | Edit or delete without raising. |
| `is_dangerous` / `valid_permissions` | Elevated role checks. |
| `paginate` / `paginator` | Send or build a `Paginator`. |
| `hydrate()` | `get_guild()` / `get_channel()`. May hit REST. Do not hydrate every invoke. |

## `CommandContext`

| Name | Purpose |
| --- | --- |
| `interaction` / `message` / `command_name` | Source payload. |
| `defer` | Acknowledge a slow interaction. |
| `reply` | Initial response, or edit after defer/reply. |
| `followup` | Another message. Returns `Message`. |
| `update` | Edit the component's source message. |
| `defer_update` | Acknowledge a component without a new message. |
| `send_modal` | Open a modal. |
| `delete` / `fetch` / `edit` | Original response. |
| `autocomplete` | Autocomplete choices. |

Interaction tokens are short-lived secrets. Discord is the authority if the
token expires.

## `PrefixContext`

| Name | Purpose |
| --- | --- |
| Prefix / message | Invocation source. |
| Replies | Ordinary channel messages. Not ephemeral. |
| `AllowedMentions` | Client default on both context types. Override per response only when intended. |
