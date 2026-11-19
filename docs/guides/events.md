# Events and listeners

Rust receives the event. Python listeners run. Names are lowercase:
`message_create`, `guild_member_update`.

```python
from astrae import Client, Message

bot = Client()

@bot.event
async def on_ready(event) -> None:
    print(f"Connected as {event.user.username}")

@bot.listen("message_create")
async def audit_message(message: Message, context) -> None:
    print(context.shard, message.id)
```

## Names

| Name | Purpose |
| --- | --- |
| `@bot.event` | Register `on_<name>` as a listener. |
| `@bot.listen("message_create")` | Register an explicit event name. |
| `add_listener` | Attach a callback at runtime. |
| `EventContext` | Shard, delivery id, receive time, previous snapshot on updates/deletes. |
| Previous snapshot | This process's last look. Not a database. |

## Dispatch

| Name | Purpose |
| --- | --- |
| Listeners | Sit on the dispatch path. Keep them short. |
| `time.sleep` | Stalls the event loop. |
| Long `await` | Delays that event. Queue the heavy work. |
| Raised listener | Logged. The gateway keeps going. |
| Redis worker | Same delivery can arrive twice after a crash. Make side effects safe to repeat. |
