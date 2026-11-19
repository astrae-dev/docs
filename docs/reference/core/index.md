# Core package

Models, builders, intents, snowflakes, markdown, errors. Use this when you
are holding a Discord payload or building one.

[Catalog](catalog.md), [protocol types](types.md), [exports](../exports.md).

## Models and IDs

| Name | Purpose |
| --- | --- |
| `User` / `Member` / `Guild` / `Channel` / `Message` / `Interaction` | Typed views of a payload Discord already sent. They go stale. |
| `Member` | Guild data plus a user. Member fields only when Discord sent them. |
| Snowflake `id` | Int. `created_at` is the timestamp in the ID. It does not ask Discord. |

## Builders and `UNSET`

| Name | Purpose |
| --- | --- |
| Embeds, components, polls, mentions | JSON you send. Discord still says no if it is wrong. |
| `UNSET` | Leave the key out of a partial update. |
| `None` | JSON `null` (clear it, if the endpoint allows). |

Mix those up and you wipe a field you meant to leave alone.

## Errors and enums

| Name | Purpose |
| --- | --- |
| `Intents` | What events you asked for. |
| `Permission` | What the bot can do in a channel. Requesting members intent does not let you kick anyone. |
| `AstraeError` | Catch a subclass. Do not scrape the message string. |
