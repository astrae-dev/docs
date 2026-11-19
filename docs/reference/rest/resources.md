# REST resource catalog

On `RestClient`: `channels`, `guilds`, `users`, `applications`,
`interactions`, `webhooks`, `invites`, `voice`, `gateway`, `stickers`,
`auto_moderation`, `polls`, `stage_instances`. Methods are async. You get
parsed JSON, not always a model.

Discord still enforces permissions, versions, and payload shape. Keyword
arguments: look at the method.

## Channels

| Name | Purpose |
| --- | --- |
| `get` / `modify` / `delete` | Channel CRUD. |
| `create_message` / `edit_message` / `delete_message` / `get_message` / `get_messages` | Message CRUD. Content, embeds, components, attachments, allowed mentions as the endpoint allows. |
| `bulk_delete` | Subject to Discord age/count limits. |
| `trigger_typing` | Typing indicator. |
| `pin_message` / `unpin_message` / `list_pins` | Pins. |
| `create_reaction` / `delete_reaction` / `clear_reactions` / `list_reactions` | Reactions. |
| `start_thread` / `start_thread_from_message` | Threads. |
| `join_thread` / `leave_thread` / `add_thread_member` | Thread membership. |
| `crosspost` | Publish an announcement message. |
| `edit_overwrite` / `delete_overwrite` | Permission overwrites. Need the corresponding permissions. |
| `create_invite` | Channel invite. |

## Guilds

| Name | Purpose |
| --- | --- |
| `get` / `modify` / `leave` | Guild CRUD / leave. |
| `get_channels` / `create_channel` / `modify_channel_positions` | Channels. |
| `get_member` / `list_members` / `modify_member` / `remove_member` | Members. `list_members` is paginated; not a substitute for gateway chunking. |
| `add_member_role` / `remove_member_role` | Roles on a member. Hierarchy still applies. |
| `create_ban` / `get_ban` / `get_bans` / `remove_ban` | Bans. |
| `get_roles` / `create_role` / `modify_role` / `delete_role` / `modify_role_positions` | Roles. |
| `get_prune_count` / `begin_prune` | Prune. |
| `get_voice_state` / `modify_voice_state` | Voice state. |
| `get_invites` | Guild invites. |
| `get_audit_log` | Audit log. `reason` becomes `X-Audit-Log-Reason`. |
| `list_emojis` / `create_emoji` / `edit_emoji` / `delete_emoji` | Guild emojis. |
| `list_stickers` / `create_sticker` / `edit_sticker` / `delete_sticker` | Guild stickers. |
| `get_vanity` | Vanity URL. |

## Applications, users, interactions, gateway

| Name | Purpose |
| --- | --- |
| `applications.get_current` | Current application. |
| `bulk_overwrite_commands` / `bulk_overwrite_guild_commands` | Replace the registered set. Not additive. |
| `applications.list_emojis` / `create_emoji` | Application emojis. |
| `users.get_current` / `get` / `create_dm` / `get_guilds` | Current user, lookup, DM, guild list. |
| `interactions.create_response` / `edit_original` / `create_followup` | Interaction callback. Tokens are time-limited credentials. Never log them. |
| `gateway.get` / `get_bot` | Gateway URL / bot gateway (recommended shards). |

## Webhooks, invites, voice, stickers, stage, polls, automod

| Name | Purpose |
| --- | --- |
| `webhooks.get` / `create` / `edit` / `delete` / `list_channel` | Webhook CRUD. Token is a password. |
| `webhooks.execute` / `edit_message` / `delete_message` | Execute and manage webhook messages. |
| `invites.get` / `delete` | Invite fetch/delete. |
| `voice.list_regions` | Voice regions. Does not mean `VoiceClient` is complete. |
| `stickers.get` / `list_nitro_packs` | Sticker and Nitro packs. |
| `stage_instances.create` / `get` | Stage instances. |
| `polls.get_answer_voters` / `expire` | Poll voters and expiration. |
| `auto_moderation.list_rules` / `create_rule` | Auto-moderation rules. |

## Transport

| Name | Purpose |
| --- | --- |
| `RestClient.request` | Generic path. `method`, `path`, `body`, `reason`, `files`, `query`, `form`. `None` query values are omitted. |
| `reason` | `X-Audit-Log-Reason`. |
| `NativeTransport` | Native runtime. |
| `ProxyTransport` | Local proxy. |
| `RedisProxyTransport` | Redis to a proxy process. Changes where the request executes, not Discord's rules. |
| `Upload` | Stream, filename, content type. Keep the stream open until the request completes. |
