# Voice API status and types

The names exist. This is not working voice. Do not ship a music bot on these
types. Discord's
[voice docs](https://discord.com/developers/docs/topics/voice-connections)
are the real protocol.

| Name | Purpose |
| --- | --- |
| `VoiceClient` | Gateway voice-state helper. Not a UDP/DAVE stack. |
| `AudioSource` | Protocol with sync `read()` / `is_opus()`. |
| `PCMAudio` | Decoded PCM wrapper. A real send path would need libopus. |
| `OpusAudio` | Opus packet wrapper. |
| `connect(guild_id, channel_id, …)` | Sends gateway voice-state opcodes. |
| `disconnect()` | Clears gateway voice state. |
| `play(source)` | Encrypts a packet and stops. No UDP, RTP, pacing, reconnect, or DAVE. |
| `push_incoming(packet)` | Queue an incoming packet. |
| `listen()` | Drain what is already queued. |
| `VoicePacket` | `user_id`, Opus bytes, optional PCM, a DAVE marker. Encryption is a pass-through stub. |
