# Core models, builders, and protocol types

What the objects are for. Enum members and Discord URLs live on
[protocol types](types.md). Root names: [exports](../exports.md).

A model is a payload Discord already sent. Fields can be missing or redacted.
Changing `member.nick` in Python does not change Discord.

## Models

| Name | Purpose |
| --- | --- |
| `User` | Global account. `name`, `display_name`, `avatar`, `default_avatar`, `display_avatar`, `mention`. |
| `ClientUser` | Connected bot user on `client.user` after READY. Process stats live on `Client`. |
| `Member` | Guild nickname, roles, join/premium timestamps, guild avatar/banner, permissions. |
| `Guild` | Guild snapshot. Helpers categorize channels, bots, humans, boosters, derived limits. |
| `Role` | Guild role. `is_dangerous` flags elevated bits (kick, ban, administrator, manage *, mention everyone, timeout). |
| `Channel` | Channel snapshot, including threads and categories. |
| `PermissionOverwrite` | Channel overwrite. |
| `Emoji` / `Sticker` | Guild emoji / sticker. |
| `Message` | Message snapshot. |
| `Attachment` | Message attachment. |
| `Embed` / `EmbedMedia` / `EmbedAuthor` / `EmbedFooter` / `EmbedField` | Embed payload pieces. |
| `StickerItem` / `Reaction` / `MessageComponent` | Message extras. |
| `Interaction` / `InteractionData` / `CommandOptionValue` / `Resolved` | Incoming interaction. |
| `ReadyEvent` | READY payload. |
| `Asset` | CDN URL helper. |
| `from_payload` | Fill in what the dict had. Does not fetch the rest. |
| Missing field on update | Often "unchanged", not "empty". |
| `created_at` | Snowflake clock, not a lookup. |

## Permissions and intents

| Name | Purpose |
| --- | --- |
| `Permission` | Bit mask. |
| `permissions_from` / `guild_permissions` / `channel_permissions` / `permissions_in` / `has_permissions` | Only see the models you hand them. Discord still decides. |
| Role position | Not a permission bit. |
| `Intents` | Gateway subscription mask. Default `Intents.DEFAULT`. |
| Privileged | Members, presences, message content. Portal first, then the client. |

## Payload builders

| Name | Purpose |
| --- | --- |
| `Embed` / `EmbedField` | Rich embeds. Color names/ints; URLs and timestamps serialized. |
| `AllowedMentions.none()` | Suppress mention parsing. `.all()` enables supported categories. |
| `ActionRow` / `Button` / `SelectMenu` / `SelectOption` / `TextInput` | Legacy components. Stable unique `custom_id`. Discord row limits apply. |
| `Container` / `Section` / `TextDisplay` / `Thumbnail` / `MediaGallery` / `Separator` / `File` | Components V2. Do not mix with legacy action-row children. |
| `COMPONENTS_V2_FLAG` | `MessageFlags.IS_COMPONENTS_V2`. |
| `Poll` / `PollAnswer` | Poll create payload. |
| `UNSET` / `UnsetType` | Omit this key. Distinct from `None` (JSON null). |
| `omit_unset` / `dump_unset` | Recursively prepare partial payloads. |

Builders emit JSON. Astrae raises locally when the builder itself is invalid.
HTTP failures come back as the usual error types.

## Formatting and errors

| Name | Purpose |
| --- | --- |
| `Formatter` | Markdown, mentions, timestamps. |
| `bold` / `italic` / `underline` / `strike` / `spoiler` / `inline_code` / `codeblock` / `quote` | Helpers on `astrae.core.formatting`. Escape user text yourself. |
| `AstraeError` | Base. HTTP subclasses carry status and body. |
| `InvalidToken` / `LoginFailure` | Discord rejected the token. No reconnect. `Client.run()` exits 78. |
| `error_code` | Discord's code out of a body. Catch where you can recover. |
