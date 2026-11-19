# REST package

`client.rest` (and `astrae.rest`) is Discord HTTP. Methods pack JSON and unpack
the response. They cannot invent a permission the bot does not have.

[Resources](resources.md), [Rust transport](../../internals/rust.md).

| Name | Purpose |
| --- | --- |
| `RestClient` | Typed resource groups on `client.rest`. |
| Native transport | Runs the request and the rate limits. |
| `ProxyTransport` / `RedisProxyTransport` | Workers without a token. Gateway process signs the call. Redis on both sides. |
| `Upload` | Multipart file. Keep the stream open until the request completes. |
| `Forbidden` / `NotFound` / `RateLimited` / friends | Catch these. A status code is not a license to retry blindly. |
| Tokens | Do not log them. Do not put an open proxy on the internet. |
