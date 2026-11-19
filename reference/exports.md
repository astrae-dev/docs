# Complete top-level exports

`from astrae import …` is these names, nothing else. Submodules can export
more; that is not the root contract. Signatures are on the installed package.

```python
from astrae import Client, CommandContext, Intents, StringOption
from astrae.core.formatting import bold
from astrae.rest import RestClient
from astrae.runtime.tasks import Scheduler
```

Import from `astrae` unless a page tells you the name lives deeper.

## Client, clustering, and voice

[Client](client/index.md), [voice](client/voice.md),
[sharding](../guides/sharding.md).

| Name | Purpose |
| --- | --- |
| `Client` | Bot process: gateway, commands, cache, REST, and lifecycle. |
| `ClusterSupervisor` | Spawn, restart, and reshard local cluster processes. |
| `ClusterContext` | Shard range and cluster identity for one child process. |
| `VoiceClient` | Gateway voice-state helper. Not a complete UDP/DAVE voice stack. |
| `PCMAudio` | PCM audio source wrapper used with `VoiceClient.play`. |
| `OpusAudio` | Opus packet audio source wrapper. |
| `__version__` | Installed Astrae version string. |

## Command registration

[Commands](commands/index.md), [catalog](commands/catalog.md).

| Name | Purpose |
| --- | --- |
| `command` | Register a prefix command that can also sync as an application command. |
| `prefix_command` | Register a prefix-only command. |
| `slash_command` | Register a chat-input application command. |
| `hybrid_command` | One callback for prefix and slash invocation. |
| `context_menu` | Register a user or message context-menu command. |
| `AppCommand` | Command definition object created by those decorators. |
| `Cog` | Group commands and listeners; supports `cog_check` and `cog_command_error`. |
| `Plugin` | Lightweight command and listener bundle. |
| `listener` | Mark a cog/plugin method as a gateway event listener. |
| `guild_only` | Middleware that rejects DM invocations. |
| `owner_only` | Middleware that allows configured owner IDs only. |

## Contexts, prompts, and pagination

| Name | Purpose |
| --- | --- |
| `CommandContext` | Interaction invocation: reply, defer, followup, update, styled helpers. |
| `PrefixContext` | Prefix-message invocation: channel replies and the same styled helpers. |
| `ContextTheme` | Default colors and emojis for `ctx.approve` / `ctx.error` (`ASTRAE_COLOR_*`). |
| `Confirmation` | Approve / Decline prompt view. |
| `Approve` | Confirmation variant with approve-style labels. |
| `Paginator` | Pages strings, embeds, fields, or files on a context. |

## Command options and injected values

Put option descriptors in `Annotated`. `Author` and the `Current*` names are
not options. They come from the invoke and can be `None` in a DM.

| Name | Purpose |
| --- | --- |
| `StringOption` | String application-command option. |
| `IntegerOption` | Integer option. |
| `NumberOption` | Number (float) option. |
| `BooleanOption` | Boolean option. |
| `UserOption` | User option. |
| `ChannelOption` | Channel option. |
| `RoleOption` | Role option. |
| `MentionableOption` | User or role option. |
| `AttachmentOption` | Attachment option. |
| `Author` | Invoking user, without creating an option. |
| `CurrentUser` | Same as `Author` from the resolved user object. |
| `CurrentMember` | Invoking member when the command runs in a guild. |
| `CurrentGuild` | Guild for this invocation. |
| `CurrentChannel` | Channel for this invocation. |
| `CurrentRole` | Invoking member's highest role. |

## Components, views, and interaction HTTP

| Name | Purpose |
| --- | --- |
| `View` | Message component view with button/select callbacks. |
| `button` | Decorator that binds a button callback onto a `View`. |
| `Modal` | Modal submit payload and callback. |
| `ComponentCollector` | Wait for a matching component interaction. |
| `InteractionApp` | ASGI app that verifies and dispatches HTTP interactions. |

## Payload builders

JSON you send. Discord still says no if it is wrong. Enum members:
[protocol types](core/types.md).

| Name | Purpose |
| --- | --- |
| `Embed` | Rich embed payload. |
| `AllowedMentions` | Which mentions ping; `UNSET` fields inherit from a client default. |
| `ActionRow` | Legacy row of buttons, selects, or text inputs. |
| `Button` | Button component. |
| `SelectMenu` | String, user, role, mentionable, or channel select. |
| `SelectOption` | One option on a string select. |
| `TextInput` | Modal text input. |
| `Poll` | Poll create payload. |
| `PollAnswer` | One poll answer. |
| `Container` | Components V2 container. |
| `Section` | Components V2 section. |
| `TextDisplay` | Components V2 text block. |
| `Thumbnail` | Components V2 thumbnail accessory. |
| `MediaGallery` | Components V2 media gallery. |
| `Separator` | Components V2 separator. |
| `File` | Components V2 file component, or an embed/message file depending on use. |
| `Upload` | Multipart upload stream, filename, and content type for REST. |
| `COMPONENTS_V2_FLAG` | Message flag for Components V2 layouts (`MessageFlags.IS_COMPONENTS_V2`). |

## Models

A payload, not a live object and not a cache hit. [Catalog](core/catalog.md).

| Name | Purpose |
| --- | --- |
| `User` | Global Discord user. |
| `ClientUser` | Connected bot user on `client.user` after READY. |
| `Member` | Guild-local member plus user fields when Discord sent them. |
| `Guild` | Guild snapshot from a payload or cache. |
| `Role` | Guild role. `is_dangerous` flags elevated permission bits. |
| `Channel` | Channel snapshot, including threads and categories. |
| `Message` | Message snapshot. |
| `Attachment` | Message attachment. |
| `Interaction` | Incoming interaction. |
| `ReadyEvent` | READY payload (`user`, `guilds`, `session_id`, resume URL). |
| `Asset` | CDN asset URL helper. |
| `EventContext` | Listener delivery metadata (`name`, `shard`, `before`, `raw`). |

## Protocol types

Ints and flags. Members: [protocol types](core/types.md). `Type.docs` or
`docs_for(Type)` is Discord's page.

| Name | Purpose |
| --- | --- |
| `Intents` | Gateway event subscriptions. Privileged bits also need portal approval. |
| `Permission` | Discord permission bit flags. Hierarchy is separate from these bits. |
| `ChannelType` | Channel kind. Unknown integers are kept as `UNKNOWN_<n>`. |
| `MessageFlags` | Message flag bits, including ephemeral and Components V2. |
| `ButtonStyle` | Button visual style. `LINK` requires `url`. |
| `ComponentType` | Component kind, including Components V2 types. |
| `ApplicationCommandType` | Chat input, user, or message context-menu command. |
| `ApplicationCommandOptionType` | Application-command option kind. |
| `InteractionType` | Ping, command, component, autocomplete, or modal. |
| `InteractionCallbackType` | Interaction response kind (reply, defer, update, modal). |
| `Status` | Presence status (`online`, `idle`, `dnd`, `invisible`, `offline`). |
| `ActivityType` | Presence activity kind (`playing`, `streaming`, …). |
| `Activity` | Presence activity payload (`name`, `type`, optional `url`). |

## Formatting and omitted fields

| Name | Purpose |
| --- | --- |
| `Formatter` | Discord markdown, mentions, and timestamps. Helpers such as `bold` are on `astrae.core.formatting`. |
| `UNSET` | Sentinel meaning omit this key from a partial payload. |
| `UnsetType` | Type of `UNSET`. Distinct from `None`, which serializes as JSON `null`. |

## HTTP and token errors

Catch the narrow type. Do not parse `str(err)`.

| Name | Purpose |
| --- | --- |
| `AstraeError` | Base class for framework errors. |
| `DiscordAPIError` | Discord returned a non-success HTTP status. |
| `HTTPException` | Generic HTTP failure (discord.py name for `DiscordAPIError`). |
| `BadRequest` | HTTP 400. |
| `Unauthorized` | HTTP 401. |
| `Forbidden` | HTTP 403. |
| `NotFound` | HTTP 404. |
| `RateLimited` | HTTP 429. |
| `ServerError` | HTTP 5xx. |
| `TokenRevoked` | REST 401 while a session was running; further REST is halted. |
| `InvalidToken` | Discord rejected the bot token (REST 401 or gateway close 4004). `Client.run()` exits 78. |
| `LoginFailure` | Alias of `InvalidToken`. |
| `InvalidRequestBudget` | Request held because Discord's invalid-request window is nearly full. |

## Command errors

These stop a command. Most get a `ctx.error` or help reply. `NotOwner` and a
bare `CheckFailure` stay quiet.

| Name | Purpose |
| --- | --- |
| `CommandError` | Stop command execution, optionally with a user-facing message. |
| `CheckFailure` | Middleware or check rejected the invocation. |
| `CommandNotFound` | No command matched the invocation. |
| `CommandInvokeError` | The callback raised; original exception is attached. |
| `CommandOnCooldown` | Command cooldown is active. |
| `MaxConcurrencyReached` | Too many concurrent runs of this command. |
| `DisabledCommand` | Command is disabled. |
| `UserInputError` | Base class for bad or missing user input. |
| `MissingRequiredArgument` | A required prefix/option value was omitted. |
| `MissingRequiredAttachment` | A required attachment was omitted. |
| `BadArgument` | A value could not be converted. |
| `ConversionError` | Converter raised while parsing an argument. |
| `BadLiteralArgument` | Value was not one of the allowed literals. |
| `BadUnionArgument` | Value matched none of a union's converters. |
| `RangeError` | Numeric value was outside the allowed range. |
| `BadInviteArgument` | Invite could not be resolved. |
| `MemberNotFound` | Member lookup failed. |
| `UserNotFound` | User lookup failed. |
| `RoleNotFound` | Role lookup failed. |
| `ChannelNotFound` | Channel lookup failed. |
| `MessageNotFound` | Message lookup failed. |
| `FlagError` | Base class for prefix flag parsing failures. |
| `TooManyFlags` | A flag was repeated more times than allowed. |
| `MissingFlagArgument` | A flag was present without its value. |
| `MissingRequiredFlag` | A required flag was omitted. |
| `BadFlagArgument` | A flag value could not be converted. |
| `MissingPermissions` | Invoking member lacks required permission bits. |
| `BotMissingPermissions` | The bot lacks required permission bits. |
| `MissingRole` | Invoking member lacks a required role. |
| `BotMissingRole` | The bot lacks a required role. |
| `MissingAnyRole` | Invoking member has none of the required roles. |
| `BotMissingAnyRole` | The bot has none of the required roles. |
| `NSFWChannelRequired` | Command requires an NSFW channel. |
| `PrivateMessageOnly` | Command must be used in a DM. |
| `NoPrivateMessage` | Command cannot be used in a DM. |
| `NotOwner` | Invoker is not a configured owner. |

## Extension errors

| Name | Purpose |
| --- | --- |
| `ExtensionError` | Base class for extension load/unload failures. |
| `ExtensionAlreadyLoaded` | Extension is already loaded. |
| `ExtensionNotLoaded` | Extension is not loaded. |
| `ExtensionNoEntryPoint` | Module has no `setup(client)`. |
| `ExtensionFailed` | `setup` raised. |

## Runtime, cache, and observability

[Runtime](runtime/index.md), [metrics](../operations/metrics.md).

| Name | Purpose |
| --- | --- |
| `Cache` | Typed Discord entity cache (memory or Redis). |
| `CacheConfig` | Per-namespace cache policies. |
| `CachePolicy` | One namespace: enabled, size, TTL, optional retained fields. |
| `MemoryBus` | In-process event bus. Not cross-process. |
| `open_bus` | Build a bus from IPC configuration (memory, Redis, or stream). |
| `RedisPool` | Process-local shared Redis pool. Not shared across cluster children. |
| `loop` | Decorator for a client-managed periodic async callback. |
| `METRICS` | Process-global metrics registry. |
| `Metrics` | Metrics registry class (counters, gauges, dashboard feeds). |
| `MetricsService` | Local HTTP dashboard, JSON API, and Prometheus exposition. |
| `LoopMonitor` | Event-loop lag watchdog; stalls go to logs, metrics, and the dashboard. |
| `GcFreezer` | Collect, trim, and freeze long-lived cache objects. Skips in-flight chunks. |

## Database

[Database](db/index.md). Gateway events do not land in SQL.

| Name | Purpose |
| --- | --- |
| `Database` | Async SQLAlchemy wrapper (`client.db` / `client.postgres`). |
| `Migration` | One schema migration step. |
| `Migrator` | Apply or roll back `Migration` records. |

## Debug

| Name | Purpose |
| --- | --- |
| `Jishaku` | Owner debug cog (eval, shell, files). Grants process privileges to whoever can run it; do not load for untrusted users. |
