# Public API map

Start here, then jump. Every root name also has a one-liner on
[public exports](exports.md).

## You probably want these

| Name | Purpose |
| --- | --- |
| `Client` | The bot. Gateway, commands, cache, REST. |
| `ClusterSupervisor` / `ClusterContext` | Local processes, shard ranges. |
| `Database` / `Migration` / `Migrator` | Your SQL, not Discord's cache. |
| `RedisPool` | One Redis pool inside this process. |
| `Cache` / `CacheConfig` / `CachePolicy` | What to keep, for how long. |
| `Metrics` / `METRICS` / `MetricsService` | Dashboard and Prometheus. |
| `LoopMonitor` | Event-loop lag. On by default. |
| `GcFreezer` | Collect, trim, freeze long-lived cache objects. |
| `MemoryBus` / `open_bus` | How events move inside or across processes. |
| `loop` | Periodic callback tied to the client lifecycle. |

More: [Client](client/index.md), [Runtime](runtime/index.md),
[Database](db/index.md).

## Commands

| Name | Purpose |
| --- | --- |
| `command` / `prefix_command` | Prefix (and maybe slash). |
| `slash_command` / `hybrid_command` / `context_menu` | Discord application commands. |
| `Cog` / `Plugin` / `listener` | Group them. Listen for gateway events. |
| `CommandContext` / `PrefixContext` | Reply, defer, `ctx.approve`, `paginate`. |
| `ContextTheme` / `Confirmation` / `Approve` | Colors/emojis (`ASTRAE_COLOR_*`) and yes/no prompts. |
| `Paginator` | Buttons over strings, embeds, fields, files. |
| `Author` / `Current*` | Injected from the invoke, not Discord options. |
| `StringOption` … `AttachmentOption` | Slash options on `Annotated`. |
| `View` / `button` / `Modal` / `ComponentCollector` / `InteractionApp` | Components, modals, HTTP interactions. |
| `guild_only` / `owner_only` | Common checks. |

```python
from typing import Annotated
from astrae import Client, CommandContext, StringOption

bot = Client()

@bot.hybrid_command(name="greet", description="Greet a person")
async def greet(
    ctx: CommandContext,
    name: Annotated[str, StringOption(description="Who to greet")],
) -> None:
    await ctx.reply(f"Hello, {name}!")
```

## Models, builders, errors

| Name | Purpose |
| --- | --- |
| `User` / `ClientUser` / `Member` / `Guild` / `Channel` / `Message` / `Interaction` / `ReadyEvent` / `Attachment` / `Asset` | Parsed payloads. Not a promise the cache still has that object. |
| `Embed` / `File` / `AllowedMentions` / action rows / Components V2 / `Poll` | JSON you send. |
| `UNSET` | Omit the key. `None` is JSON null. |
| `Intents` | What Discord sends you. |
| `Permission` | What a member can do. One does not imply the other. |
| `AstraeError` | Base. Catch the narrow type. Do not parse `str(err)`. |
| `Forbidden` / `NotFound` / `RateLimited` / `Unauthorized` / `ServerError` | HTTP. |
| Command / extension errors | Bad input, checks, missing arguments, load failures. |

Values: [protocol types](core/types.md).
