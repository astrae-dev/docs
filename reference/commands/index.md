# Commands package

Decorators on `Client`, types from `astrae`. The dispatcher is internal.
[Catalog](catalog.md), [exports](../exports.md).

## How an invoke runs

| Name | Purpose |
| --- | --- |
| Prefix | Match prefix, find command, convert arguments, `PrefixContext`, middleware, callback. |
| Slash | Interaction in, command and options resolved, `CommandContext`, same middleware. |
| Long slash work | Defer — automatically or with `ctx.defer()`. |
| First argument | Always the context. |
| `Annotated` options | What Discord shows. |
| `Author` / `Current*` | Injected. Not slash options. Guild ones are `None` in DMs. |
| `CurrentRole` | Author's highest role. |

## Where the code lives

| Name | Purpose |
| --- | --- |
| `app` | Command objects and Discord registration payloads. |
| `dispatch` | Find the command, run it. Internal. |
| `context` | Replies, including `success` / `error` / `deny` / `neutral` and prompts. |
| `style` / `prompts` | `ContextTheme`, Approve / Decline. |
| `middleware` | Stack around the callback. |
| `parsing` | Options and prefix tokens. |
| `interactions` | Views, modals, HTTP, waiters. |
| `paginator` | `ctx.paginate` / `Paginator`. |
| `cogs` / `plugin` | Groups and extension load. |

Stick to public exports. Conversion and context stay; dispatch helpers may not.
