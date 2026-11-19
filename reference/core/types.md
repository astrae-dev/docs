# Protocol types

The integers and flags Discord puts on the wire. Member lists below are what
Astrae knows. Discord can add values first; `ChannelType` keeps an unknown
int as `UNKNOWN_<n>` instead of exploding.

| Name | Purpose |
| --- | --- |
| [Catalog](catalog.md) | Field-level model behavior. |
| `docs_for(User)` / `User.docs` | Discord's own page for a type. |
| `astrae.core.DOCS` | Same URL map. |

```python
from astrae import Intents
from astrae.core import docs_for

docs_for(Intents)
# https://discord.com/developers/docs/events/gateway#gateway-intents
```

## Application commands and interactions

### `ApplicationCommandType`

| Member | Value | Meaning |
| --- | --- | --- |
| `CHAT_INPUT` | 1 | Slash command. |
| `USER` | 2 | User context-menu command. |
| `MESSAGE` | 3 | Message context-menu command. |

### `ApplicationCommandOptionType`

| Member | Value | Astrae option class |
| --- | --- | --- |
| `SUB_COMMAND` | 1 | Nested command, not an option descriptor. |
| `SUB_COMMAND_GROUP` | 2 | Nested group, not an option descriptor. |
| `STRING` | 3 | `StringOption` |
| `INTEGER` | 4 | `IntegerOption` |
| `BOOLEAN` | 5 | `BooleanOption` |
| `USER` | 6 | `UserOption` |
| `CHANNEL` | 7 | `ChannelOption` |
| `ROLE` | 8 | `RoleOption` |
| `MENTIONABLE` | 9 | `MentionableOption` |
| `NUMBER` | 10 | `NumberOption` |
| `ATTACHMENT` | 11 | `AttachmentOption` |

### `InteractionType`

| Member | Value | Meaning |
| --- | --- | --- |
| `PING` | 1 | HTTP interaction handshake. |
| `APPLICATION_COMMAND` | 2 | Slash or context-menu invoke. |
| `MESSAGE_COMPONENT` | 3 | Button or select. |
| `APPLICATION_COMMAND_AUTOCOMPLETE` | 4 | Option autocomplete. |
| `MODAL_SUBMIT` | 5 | Modal submit. |

### `InteractionCallbackType`

| Member | Value | Meaning |
| --- | --- | --- |
| `PONG` | 1 | Acknowledge a ping. |
| `CHANNEL_MESSAGE_WITH_SOURCE` | 4 | Reply with a message. |
| `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` | 5 | Defer a command reply. |
| `DEFERRED_UPDATE_MESSAGE` | 6 | Defer a component update. |
| `UPDATE_MESSAGE` | 7 | Edit the source message. |
| `APPLICATION_COMMAND_AUTOCOMPLETE_RESULT` | 8 | Autocomplete choices. |
| `MODAL` | 9 | Open a modal. |

| Name | Purpose |
| --- | --- |
| Callback `2` / `3` | Unused. Newer Discord callback types show up here when Astrae adds them. |

## Components

### `ComponentType`

| Member | Value | Builder |
| --- | --- | --- |
| `ACTION_ROW` | 1 | `ActionRow` |
| `BUTTON` | 2 | `Button` |
| `STRING_SELECT` | 3 | `SelectMenu` |
| `TEXT_INPUT` | 4 | `TextInput` |
| `USER_SELECT` | 5 | `SelectMenu(kind=...)` |
| `ROLE_SELECT` | 6 | `SelectMenu(kind=...)` |
| `MENTIONABLE_SELECT` | 7 | `SelectMenu(kind=...)` |
| `CHANNEL_SELECT` | 8 | `SelectMenu(kind=...)` |
| `SECTION` | 9 | `Section` |
| `TEXT_DISPLAY` | 10 | `TextDisplay` |
| `THUMBNAIL` | 11 | `Thumbnail` |
| `MEDIA_GALLERY` | 12 | `MediaGallery` |
| `FILE` | 13 | `File` |
| `SEPARATOR` | 14 | `Separator` |
| `CONTAINER` | 17 | `Container` |
| `LABEL` | 18 | No builder yet. |
| `FILE_UPLOAD` | 19 | No builder yet. |

| Name | Purpose |
| --- | --- |
| V2 + legacy children | Discord rejects the mix. |
| `COMPONENTS_V2_FLAG` | `MessageFlags.IS_COMPONENTS_V2`. |

### `ButtonStyle`

| Member | Value | Meaning |
| --- | --- | --- |
| `PRIMARY` | 1 | Blurple. Requires `custom_id`. |
| `SECONDARY` | 2 | Grey. Requires `custom_id`. |
| `SUCCESS` | 3 | Green. Requires `custom_id`. |
| `DANGER` | 4 | Red. Requires `custom_id`. |
| `LINK` | 5 | URL button. Requires `url`, not `custom_id`. |
| `PREMIUM` | 6 | SKU button. |

## Channels

### `ChannelType`

| Member | Value | Meaning |
| --- | --- | --- |
| `GUILD_TEXT` / `text` | 0 | Guild text channel. |
| `DM` | 1 | Direct message. |
| `GUILD_VOICE` / `voice` | 2 | Guild voice channel. |
| `GROUP_DM` | 3 | Group DM. |
| `GUILD_CATEGORY` / `category` | 4 | Category. |
| `GUILD_ANNOUNCEMENT` | 5 | Announcement channel. |
| `ANNOUNCEMENT_THREAD` | 10 | Thread in an announcement channel. |
| `PUBLIC_THREAD` | 11 | Public thread. |
| `PRIVATE_THREAD` | 12 | Private thread. |
| `GUILD_STAGE_VOICE` | 13 | Stage channel. |
| `GUILD_DIRECTORY` | 14 | Hub directory. |
| `GUILD_FORUM` | 15 | Forum. |
| `GUILD_MEDIA` | 16 | Media channel. |

| Name | Purpose |
| --- | --- |
| Lowercase aliases | discord.py names (`text`, `voice`, `category`). |
| Unknown ints | Kept as `UNKNOWN_<n>`. |

## Message flags

`MessageFlags` is an `IntFlag`. Combine members with `|`.
`IS_COMPONENTS_V2` is also `COMPONENTS_V2_FLAG`.

| Member | Bit | Meaning |
| --- | --- | --- |
| `CROSSPOSTED` | 0 | Announcement message was published. |
| `IS_CROSSPOST` | 1 | Message originated as a crosspost. |
| `SUPPRESS_EMBEDS` | 2 | Do not render embeds. |
| `SOURCE_MESSAGE_DELETED` | 3 | Source of a crosspost was deleted. |
| `URGENT` | 4 | Urgent message. |
| `HAS_THREAD` | 5 | Message has a thread. |
| `EPHEMERAL` | 6 | Only the invoking user sees it. |
| `LOADING` | 7 | Deferred interaction placeholder. |
| `FAILED_TO_MENTION_SOME_ROLES_IN_THREAD` | 8 | Role mention failed in a thread. |
| `SUPPRESS_NOTIFICATIONS` | 12 | Silent message. |
| `IS_VOICE_MESSAGE` | 13 | Voice message. |
| `IS_COMPONENTS_V2` | 15 | Components V2 layout. Also `COMPONENTS_V2_FLAG`. |

## Permissions

`Permission` is the bit mask.

| Name | Purpose |
| --- | --- |
| `permissions_from` / `channel_permissions` | Only see the models you pass. |
| Role position | Not a bit. |

| Member | Bit |
| --- | --- |
| `CREATE_INSTANT_INVITE` | 0 |
| `KICK_MEMBERS` | 1 |
| `BAN_MEMBERS` | 2 |
| `ADMINISTRATOR` | 3 |
| `MANAGE_CHANNELS` | 4 |
| `MANAGE_GUILD` | 5 |
| `ADD_REACTIONS` | 6 |
| `VIEW_AUDIT_LOG` | 7 |
| `PRIORITY_SPEAKER` | 8 |
| `STREAM` | 9 |
| `VIEW_CHANNEL` | 10 |
| `SEND_MESSAGES` | 11 |
| `SEND_TTS_MESSAGES` | 12 |
| `MANAGE_MESSAGES` | 13 |
| `EMBED_LINKS` | 14 |
| `ATTACH_FILES` | 15 |
| `READ_MESSAGE_HISTORY` | 16 |
| `MENTION_EVERYONE` | 17 |
| `USE_EXTERNAL_EMOJIS` | 18 |
| `VIEW_GUILD_INSIGHTS` | 19 |
| `CONNECT` | 20 |
| `SPEAK` | 21 |
| `MUTE_MEMBERS` | 22 |
| `DEAFEN_MEMBERS` | 23 |
| `MOVE_MEMBERS` | 24 |
| `USE_VAD` | 25 |
| `CHANGE_NICKNAME` | 26 |
| `MANAGE_NICKNAMES` | 27 |
| `MANAGE_ROLES` | 28 |
| `MANAGE_WEBHOOKS` | 29 |
| `MANAGE_GUILD_EXPRESSIONS` | 30 |
| `USE_APPLICATION_COMMANDS` | 31 |
| `REQUEST_TO_SPEAK` | 32 |
| `MANAGE_EVENTS` | 33 |
| `MANAGE_THREADS` | 34 |
| `CREATE_PUBLIC_THREADS` | 35 |
| `CREATE_PRIVATE_THREADS` | 36 |
| `USE_EXTERNAL_STICKERS` | 37 |
| `SEND_MESSAGES_IN_THREADS` | 38 |
| `USE_EMBEDDED_ACTIVITIES` | 39 |
| `MODERATE_MEMBERS` | 40 |
| `VIEW_CREATOR_MONETIZATION_ANALYTICS` | 41 |
| `USE_SOUNDBOARD` | 42 |
| `CREATE_GUILD_EXPRESSIONS` | 43 |
| `CREATE_EVENTS` | 44 |
| `USE_EXTERNAL_SOUNDS` | 45 |
| `SEND_VOICE_MESSAGES` | 46 |
| `SEND_POLLS` | 49 |
| `USE_EXTERNAL_APPS` | 50 |

| Name | Purpose |
| --- | --- |
| `Role.is_dangerous` | True when the role includes kick, ban, administrator, manage guild/roles/channels/messages/webhooks/expressions/threads, mention everyone, or timeout members. |

## Gateway intents

An intent is not a permission.

| Name | Purpose |
| --- | --- |
| Privileged | `GUILD_MEMBERS`, `GUILD_PRESENCES`, `MESSAGE_CONTENT`. Portal, then the client, then Discord if they want a review. |
| `Intents(members=True, message_content=True)` | Keyword constructor. Unknown names raise `TypeError`. |

| Member | Bit | Privileged |
| --- | --- | --- |
| `GUILDS` | 0 | No |
| `GUILD_MEMBERS` | 1 | Yes |
| `GUILD_MODERATION` | 2 | No |
| `GUILD_EXPRESSIONS` | 3 | No |
| `GUILD_INTEGRATIONS` | 4 | No |
| `GUILD_WEBHOOKS` | 5 | No |
| `GUILD_INVITES` | 6 | No |
| `GUILD_VOICE_STATES` | 7 | No |
| `GUILD_PRESENCES` | 8 | Yes |
| `GUILD_MESSAGES` | 9 | No |
| `GUILD_MESSAGE_REACTIONS` | 10 | No |
| `GUILD_MESSAGE_TYPING` | 11 | No |
| `DIRECT_MESSAGES` | 12 | No |
| `DIRECT_MESSAGE_REACTIONS` | 13 | No |
| `DIRECT_MESSAGE_TYPING` | 14 | No |
| `MESSAGE_CONTENT` | 15 | Yes |
| `GUILD_SCHEDULED_EVENTS` | 16 | No |
| `AUTO_MODERATION_CONFIGURATION` | 20 | No |
| `AUTO_MODERATION_EXECUTION` | 21 | No |
| `GUILD_MESSAGE_POLLS` | 24 | No |
| `DIRECT_MESSAGE_POLLS` | 25 | No |

Composite values:

| Member | Meaning |
| --- | --- |
| `NONE` | Empty mask. |
| `UNPRIVILEGED` | Every non-privileged intent Astrae defines. |
| `ALL` | `UNPRIVILEGED` plus the three privileged intents. |
| `DEFAULT` | `GUILDS \| GUILD_MESSAGES \| MESSAGE_CONTENT \| DIRECT_MESSAGES`. |

| Name | Purpose |
| --- | --- |
| `Client` default | `Intents.DEFAULT` when you omit `intents`. |

## Presence

`from astrae import Status, Activity, ActivityType`.

### `Status`

| Member | Wire value |
| --- | --- |
| `ONLINE` | `online` |
| `IDLE` | `idle` |
| `DO_NOT_DISTURB` / `DND` | `dnd` |
| `INVISIBLE` | `invisible` |
| `OFFLINE` | `offline` |

### `ActivityType`

| Member | Value | Meaning |
| --- | --- | --- |
| `PLAYING` / `playing` | 0 | Playing |
| `STREAMING` / `streaming` | 1 | Streaming; `Activity.url` is used |
| `LISTENING` / `listening` | 2 | Listening |
| `WATCHING` / `watching` | 3 | Watching |
| `CUSTOM` / `custom` | 4 | Custom status |
| `COMPETING` / `competing` | 5 | Competing |

### `Activity`

```python
Activity(name: str, type: ActivityType = ActivityType.PLAYING, url: str | None = None)
```

| Name | Purpose |
| --- | --- |
| `to_dict()` | Discord activity payload (`name`, `type`, `url` when set). Pass to `Client.change_presence(activity=...)`. |

## IDs, time, and omitted fields

| Name | Purpose |
| --- | --- |
| `Snowflake` | Models with an `id`. `created_at` is the timestamp in the ID. |
| `SnowflakeTime` | That UTC datetime. `.timestamp` is Unix seconds. |
| `created_at(id)` / `created_at_ms(id)` | Decode a raw snowflake. |
| `UNSET` | Leave the key out. `None` is JSON null. |
| `omit_unset` / `dump_unset` / `is_set` | Partial updates. |

## Event value types

What listeners get. Not REST resources.

| Type | Discord object |
| --- | --- |
| `EventContext` | Astrae delivery metadata (`name`, `shard`, `before`, `raw`). |
| `Update` | Pair of `before` / `after` for update events. |
| `VoiceState` | [Voice state](https://discord.com/developers/docs/resources/voice#voice-state-object) |
| `ReactionEvent` | [Message reaction add](https://discord.com/developers/docs/events/gateway-events#message-reaction-add) |
| `AuditLogEntry` | [Audit log entry](https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object) |
| `MembersChunk` | [Guild members chunk](https://discord.com/developers/docs/events/gateway-events#guild-members-chunk) |
| `ShardEvent` | Astrae shard lifecycle (`shard_disconnect`, `shard_reconnect`, `shard_ready`). |

## Models

A payload. Fields can be missing. Mutating it does not update Discord.

| Name | Purpose |
| --- | --- |
| [Catalog](catalog.md) | Accessors. |
| `Collection` | Astrae list, not a Discord object. |

| Type | Discord object |
| --- | --- |
| `User`, `ClientUser` | [User](https://discord.com/developers/docs/resources/user#user-object) |
| `Member` | [Guild member](https://discord.com/developers/docs/resources/guild#guild-member-object) |
| `Guild` | [Guild](https://discord.com/developers/docs/resources/guild#guild-object) |
| `Role` | [Role](https://discord.com/developers/docs/topics/permissions#role-object) |
| `Channel` | [Channel](https://discord.com/developers/docs/resources/channel#channel-object) |
| `PermissionOverwrite` | [Overwrite](https://discord.com/developers/docs/resources/channel#overwrite-object) |
| `Emoji` | [Emoji](https://discord.com/developers/docs/resources/emoji#emoji-object) |
| `Sticker` | [Sticker](https://discord.com/developers/docs/resources/sticker#sticker-object) |
| `StickerItem` | [Sticker item](https://discord.com/developers/docs/resources/sticker#sticker-item-object) |
| `Message` | [Message](https://discord.com/developers/docs/resources/message#message-object) |
| `Attachment` | [Attachment](https://discord.com/developers/docs/resources/message#attachment-object) |
| `Embed`, `EmbedField`, `EmbedAuthor`, `EmbedFooter`, `EmbedMedia` | [Embed](https://discord.com/developers/docs/resources/message#embed-object) |
| `Reaction` | [Reaction](https://discord.com/developers/docs/resources/message#reaction-object) |
| `MessageComponent` | [Component](https://discord.com/developers/docs/components/reference) |
| `Interaction`, `InteractionData` | [Interaction](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object) |
| `CommandOptionValue` | [Command option](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure) |
| `Resolved` | [Resolved data](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure) |
| `ReadyEvent` | [Ready](https://discord.com/developers/docs/events/gateway-events#ready) |
| `Asset` | [Image formatting](https://discord.com/developers/docs/reference#image-formatting) |

## Payload builders

JSON you send. Discord still validates it.

| Type | Discord object |
| --- | --- |
| `Embed`, `EmbedField` | [Embed](https://discord.com/developers/docs/resources/message#embed-object) |
| `AllowedMentions` | [Allowed mentions](https://discord.com/developers/docs/resources/message#allowed-mentions-object) |
| `Poll` | [Poll create](https://discord.com/developers/docs/resources/poll#poll-create-request-object) |
| `PollAnswer` | [Poll media](https://discord.com/developers/docs/resources/poll#poll-media-object) |
| `ActionRow` | [Action row](https://discord.com/developers/docs/components/reference#action-row) |
| `Button` | [Button](https://discord.com/developers/docs/components/reference#button) |
| `SelectMenu` | [String select](https://discord.com/developers/docs/components/reference#string-select) |
| `SelectOption` | [Select option](https://discord.com/developers/docs/components/reference#string-select-select-option-structure) |
| `TextInput` | [Text input](https://discord.com/developers/docs/components/reference#text-input) |
| `Container` | [Container](https://discord.com/developers/docs/components/reference#container) |
| `Section` | [Section](https://discord.com/developers/docs/components/reference#section) |
| `TextDisplay` | [Text display](https://discord.com/developers/docs/components/reference#text-display) |
| `Thumbnail` | [Thumbnail](https://discord.com/developers/docs/components/reference#thumbnail) |
| `MediaGallery`, `MediaGalleryItem` | [Media gallery](https://discord.com/developers/docs/components/reference#media-gallery) |
| `Separator` | [Separator](https://discord.com/developers/docs/components/reference#separator) |
| `File` | [File](https://discord.com/developers/docs/components/reference#file) |
