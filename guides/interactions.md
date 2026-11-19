# Components and interactions

Slash, buttons, modals all arrive as `Interaction`. You reply through
`CommandContext`. A `View` is the buttons. A `Modal` is the form.

```python
from astrae import Client, CommandContext, View, button

bot = Client()

class ConfirmView(View):
    @button(label="Confirm", custom_id="confirm")
    async def confirm(self, ctx: CommandContext) -> None:
        await ctx.reply("Confirmed", ephemeral=True)

bot.add_view(ConfirmView(timeout=None))

@bot.command(name="confirm", description="Show a confirmation button")
async def confirm(ctx: CommandContext) -> None:
    view = ConfirmView(timeout=None)
    await ctx.reply("Continue?", components=view.rows(), ephemeral=True)
```

## Names

| Name | Purpose |
| --- | --- |
| `Interaction` | Incoming slash, button, select, or modal payload. |
| `CommandContext` | Acknowledge, reply, defer, update. |
| `View` | Button/select group. Default timeout 180s. |
| `timeout=None` | Persistent view. Register it on every startup. |
| `Client.add_view` | Register callbacks in this process. `message_id=` restricts to one message. |
| `view.rows()` | Component payload to attach to a response. |
| `@button` | Bind a callback. `custom_id` is the dispatch key. |
| `Modal` | Form payload and submit callback. |
| `ComponentCollector` | Wait for a matching custom ID. Redis can span workers. |
| `InteractionApp` | HTTP interactions with signature verification. |

## Constraints

| Name | Purpose |
| --- | --- |
| `custom_id` | Visible to clients. Do not put secrets in it. Keep it unique and stable. |
| Process memory | Views and waiters die with the process. Re-register persistent views on boot. |
| Discord deadline | Reply or defer before slow work. |
| Ephemeral | Only the invoking user sees it. Not an authorization check. |
| Hidden button | Not access control. Enforce permissions server-side. |
