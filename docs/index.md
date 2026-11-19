<section class="home-hero">
  <div>
    <h1>Commands in Python.<br>Gateway in Rust.</h1>
    <p>Astrae is a Discord framework for bots that have to stay up. You write commands, events, cache policy, and SQL in Python. The websocket, HTTP client, and rate limiter run in a Rust extension in the same process. One process is enough to start. Redis only if you split the gateway from the workers, or share cache across clusters.</p>
    <p class="home-cta">
      <span class="home-install">
        <code>maturin develop</code>
        <button type="button" data-copy="maturin develop">Copy</button>
      </span>
      <a class="button" href="getting-started/quickstart/">Quickstart</a>
      <a href="reference/exports/">Public exports</a>
    </p>
  </div>
  <figure class="home-code">
    <figcaption><span class="home-dot"></span>bot.py</figcaption>
    <pre><code class="nohighlight"><span class="tok-k">from</span> typing <span class="tok-k">import</span> Annotated
<span class="tok-k">from</span> astrae <span class="tok-k">import</span> Client, CommandContext, Intents, StringOption

bot = Client(
    command_prefix=<span class="tok-s">"!"</span>,
    intents=Intents.DEFAULT | Intents.MESSAGE_CONTENT,
)

<span class="tok-nd">@bot.command</span>(name=<span class="tok-s">"echo"</span>, description=<span class="tok-s">"Echo a message"</span>)
<span class="tok-k">async def</span> <span class="tok-nf">echo</span>(
    ctx: CommandContext,
    message: Annotated[str, StringOption(description=<span class="tok-s">"What to say"</span>)],
) -> None:
    <span class="tok-k">await</span> ctx.reply(message)

bot.run()</code></pre>
  </figure>
</section>

<div class="home-rail">
  <div>
    <strong>Python</strong>
    <p>Commands, events, cache policy, SQL, views, and loops. This is the bot you write.</p>
  </div>
  <div>
    <strong>Rust</strong>
    <p>Websocket, HTTP, and rate limits in the same process. You do not start a second runtime.</p>
  </div>
  <div>
    <strong>Redis, if you split</strong>
    <p>Shared cache, worker events, and cluster telemetry. A small bot never needs it.</p>
  </div>
</div>

<nav class="home-toc" aria-label="On this page">
  <a href="#what-ships">What ships</a>
  <a href="#commands">Commands</a>
  <a href="#replies">Replies</a>
  <a href="#components">Components</a>
  <a href="#cogs">Cogs</a>
  <a href="#events">Events</a>
  <a href="#loops">Loops</a>
  <a href="#cache">Cache</a>
  <a href="#dashboard">Dashboard</a>
  <a href="#cluster">Cluster</a>
  <a href="#sql">SQL</a>
  <a href="#debug">Debug</a>
</nav>

<section class="home-block" id="what-ships">
  <h2>What ships</h2>
  <p>The Python package is the surface. The Rust extension owns Discord's socket. Everything below is on <code>from astrae import …</code>.</p>
  <div class="home-mosaic">
    <article>
      <h3>Commands</h3>
      <p>Prefix, slash, hybrid, user and message menus. One callback. <code>Annotated</code> options. <code>Author</code> and <code>Current*</code> are injected, not options.</p>
    </article>
    <article>
      <h3>Context</h3>
      <p><code>reply</code>, <code>defer</code>, <code>followup</code>, <code>update</code>. Styled <code>success</code> / <code>error</code> / <code>deny</code> / <code>neutral</code>. <code>prompt</code> and <code>confirm</code> wait on Approve / Decline.</p>
    </article>
    <article>
      <h3>Pagination</h3>
      <p><code>ctx.paginate</code> over strings, embeds, fields, or files. Only the invoker can press the buttons. Times out after 60 seconds.</p>
    </article>
    <article>
      <h3>Components</h3>
      <p><code>View</code>, <code>button</code>, <code>ActionRow</code>, <code>SelectMenu</code>, <code>Modal</code>, <code>TextInput</code>. Components V2: <code>Container</code>, <code>Section</code>, <code>TextDisplay</code>, <code>Thumbnail</code>, <code>MediaGallery</code>, <code>Separator</code>.</p>
    </article>
    <article>
      <h3>Cogs</h3>
      <p>Group commands and listeners. <code>cog_check</code>, <code>cog_command_error</code>. Extensions are modules with <code>setup(client)</code>. The cluster console can reload them.</p>
    </article>
    <article>
      <h3>Events</h3>
      <p><code>@bot.listen("message_create")</code>. Names are lowercase. <code>EventContext</code> has shard, delivery id, and the previous snapshot on updates.</p>
    </article>
    <article>
      <h3>Loops</h3>
      <p><code>@loop(minutes=1)</code> starts and cancels with the client. <code>Scheduler.cron</code> is wall-clock. Redis locks stop two workers from running the same job.</p>
    </article>
    <article>
      <h3>Cache</h3>
      <p>Memory, or Redis if you share. Users stored once. Member records are nick, roles, guild assets, and a pointer. Opcode 8 still chunks.</p>
    </article>
    <article>
      <h3>Dashboard</h3>
      <p><code>127.0.0.1:9100</code> after <code>run()</code>. Command logs, REST, components, loop stalls. Prometheus at <code>/metrics</code>.</p>
    </article>
    <article>
      <h3>Cluster</h3>
      <p><code>astrae cluster</code> assigns shard ranges and restarts a dead child. Gateway processes keep sockets. Workers take Redis events. A bad token exits 78.</p>
    </article>
    <article>
      <h3>SQL</h3>
      <p><code>client.db</code>. SQLite, Postgres, or MySQL. Your rows, not Discord's cache. <code>Migration</code> / <code>Migrator</code> for schema.</p>
    </article>
    <article>
      <h3>Observe</h3>
      <p><code>LoopMonitor</code> is on. <code>setup_sentry()</code> / <code>setup_tracelet()</code> / <code>setup_posthog()</code>. Jishaku for owners. <code>GcFreezer</code> pins long-lived cache.</p>
    </article>
  </div>
</section>

<section class="home-block" id="commands">
  <h2>Prefix, slash, and hybrid share the callback.</h2>
  <div class="home-duo">
    <div>
      <p><code>@bot.command</code> can sync as slash too. <code>@bot.slash_command</code> is slash only. <code>@bot.hybrid_command</code> is both. <code>@bot.context_menu</code> is a user or message menu. Guild prefix needs Message Content. Slash does not.</p>
      <p><code>Annotated</code> is what Discord shows. <code>Author</code>, <code>CurrentUser</code>, <code>CurrentMember</code>, <code>CurrentGuild</code>, <code>CurrentChannel</code>, and <code>CurrentRole</code> are taken from the invoke. They are not options. Guild ones are <code>None</code> in a DM.</p>
      <p>Converters and error handlers are the same door either way. Raise a <code>CommandError</code> subclass for an expected rejection; Astrae maps those to <code>ctx.error</code> or help.</p>
      <p><a href="guides/commands/">Command guide</a></p>
    </div>
    <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> typing <span class="tok-k">import</span> Annotated
<span class="tok-k">from</span> astrae <span class="tok-k">import</span> (
    Author, CommandContext, CurrentGuild, StringOption, User, UserOption,
)

<span class="tok-nd">@bot.hybrid_command</span>(name=<span class="tok-s">"who"</span>, description=<span class="tok-s">"Show who ran this"</span>)
<span class="tok-k">async def</span> <span class="tok-nf">who</span>(
    ctx: CommandContext,
    author: Author,
    guild: CurrentGuild,
    target: Annotated[User | None, UserOption(description=<span class="tok-s">"Someone else"</span>)] = None,
    note: Annotated[str, StringOption(description=<span class="tok-s">"Optional note"</span>)] = <span class="tok-s">""</span>,
) -> None:
    person = target <span class="tok-k">or</span> author
    place = guild.name <span class="tok-k">if</span> guild <span class="tok-k">else</span> <span class="tok-s">"DM"</span>
    <span class="tok-k">await</span> ctx.reply(<span class="tok-s">f"{person.username} in {place} {note}"</span>.strip())</code></pre>
  </div>
</section>

<section class="home-block" id="replies">
  <h2>The context already knows how to talk.</h2>
  <p><code>ctx.reply</code> is the first response. <code>defer</code> if the work is slow. <code>followup</code> after that. Component handlers use <code>update</code> or <code>defer_update</code>. Styled helpers mention the invoker and use <code>Client.context_theme</code> — or <code>ASTRAE_COLOR_APPROVED</code> / <code>_WARNED</code> / <code>_DENIED</code> / <code>_NEUTRAL</code> from the environment.</p>
  <ul class="home-methods">
    <li><code>reply</code> first response</li>
    <li><code>success</code> green, mentions the invoker</li>
    <li><code>error</code> / <code>deny</code> red or gray</li>
    <li><code>prompt</code> Approve / Decline, then continue</li>
    <li><code>confirm</code> same, but for another user</li>
    <li><code>paginate</code> buttons over strings, embeds, files</li>
    <li><code>check</code> adds a 👍</li>
    <li><code>files</code> paginates uploads</li>
  </ul>
  <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> CommandContext, Embed

<span class="tok-k">async def</span> <span class="tok-nf">warn</span>(ctx: CommandContext) -> None:
    <span class="tok-k">await</span> ctx.prompt(<span class="tok-s">"Send the warning?"</span>)
    <span class="tok-k">await</span> ctx.success(<span class="tok-s">"Warned"</span>)

<span class="tok-k">async def</span> <span class="tok-nf">members</span>(ctx: CommandContext) -> None:
    <span class="tok-k">if</span> ctx.guild <span class="tok-k">is None</span>:
        <span class="tok-k">await</span> ctx.error(<span class="tok-s">"Guild only"</span>)
        <span class="tok-k">return</span>
    <span class="tok-k">await</span> ctx.paginate(
        [m.username <span class="tok-k">for</span> m <span class="tok-k">in</span> ctx.guild.humans],
        embed=Embed(title=ctx.guild.name),
        per_page=<span class="tok-s">15</span>,
    )</code></pre>
</section>

<section class="home-block" id="components">
  <h2>Buttons, selects, and modals are ordinary Python.</h2>
  <p>A <code>View</code> holds the callbacks. <code>view.rows()</code> is what you attach. Persistent views need <code>timeout=None</code>, stable <code>custom_id</code>s, and <code>bot.add_view(...)</code> on every start. Callbacks get <code>CommandContext</code>, same as a command. Do not put secrets in <code>custom_id</code>.</p>
  <div class="home-tabs" data-tabs>
    <div class="home-tabs-bar" role="tablist">
      <button type="button" role="tab" aria-selected="true" data-tab="view">View</button>
      <button type="button" role="tab" aria-selected="false" data-tab="select">Select</button>
      <button type="button" role="tab" aria-selected="false" data-tab="modal">Modal</button>
    </div>
    <div role="tabpanel" data-panel="view">
      <pre><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> ButtonStyle, CommandContext, View, button

<span class="tok-k">class</span> <span class="tok-nf">ConfirmView</span>(View):
    <span class="tok-nd">@button</span>(label=<span class="tok-s">"Confirm"</span>, custom_id=<span class="tok-s">"confirm"</span>, style=ButtonStyle.SUCCESS)
    <span class="tok-k">async def</span> <span class="tok-nf">confirm</span>(self, ctx: CommandContext) -> None:
        <span class="tok-k">await</span> ctx.update(content=<span class="tok-s">"Confirmed"</span>, components=[])

    <span class="tok-nd">@button</span>(label=<span class="tok-s">"Cancel"</span>, custom_id=<span class="tok-s">"cancel"</span>, style=ButtonStyle.SECONDARY)
    <span class="tok-k">async def</span> <span class="tok-nf">cancel</span>(self, ctx: CommandContext) -> None:
        <span class="tok-k">await</span> ctx.update(content=<span class="tok-s">"Cancelled"</span>, components=[])

bot.add_view(ConfirmView(timeout=None))

<span class="tok-nd">@bot.command</span>(name=<span class="tok-s">"confirm"</span>)
<span class="tok-k">async def</span> <span class="tok-nf">confirm</span>(ctx: CommandContext) -> None:
    <span class="tok-k">await</span> ctx.reply(<span class="tok-s">"Continue?"</span>, components=ConfirmView(timeout=None).rows())</code></pre>
    </div>
    <div role="tabpanel" data-panel="select" hidden>
      <pre><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> (
    ActionRow, Button, ButtonStyle, CommandContext, Embed,
    SelectMenu, SelectOption,
)

<span class="tok-nd">@bot.command</span>(name=<span class="tok-s">"roles"</span>, description=<span class="tok-s">"Pick a color role"</span>)
<span class="tok-k">async def</span> <span class="tok-nf">roles</span>(ctx: CommandContext) -> None:
    <span class="tok-k">await</span> ctx.reply(
        embed=Embed(title=<span class="tok-s">"Color roles"</span>)
            .description(<span class="tok-s">"Button or select"</span>)
            .color(<span class="tok-s">"blurple"</span>),
        components=[
            ActionRow(
                Button(custom_id=<span class="tok-s">"role:red"</span>, label=<span class="tok-s">"Red"</span>, style=ButtonStyle.DANGER),
                Button(custom_id=<span class="tok-s">"role:blue"</span>, label=<span class="tok-s">"Blue"</span>, style=ButtonStyle.PRIMARY),
            ),
            ActionRow(
                SelectMenu(
                    <span class="tok-s">"role:pick"</span>,
                    placeholder=<span class="tok-s">"Or pick from the list"</span>,
                    options=[
                        SelectOption(<span class="tok-s">"Red"</span>, <span class="tok-s">"red"</span>),
                        SelectOption(<span class="tok-s">"Blue"</span>, <span class="tok-s">"blue"</span>),
                    ],
                )
            ),
        ],
        ephemeral=True,
    )</code></pre>
    </div>
    <div role="tabpanel" data-panel="modal" hidden>
      <pre><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> CommandContext, Modal, TextInput

<span class="tok-k">async def</span> <span class="tok-nf">save_tag</span>(ctx: CommandContext) -> None:
    values = ctx.interaction.modal_values
    <span class="tok-k">await</span> ctx.reply(<span class="tok-s">f"Saved {values['name']}"</span>, ephemeral=True)

bot.views.modal(<span class="tok-s">"tag-create"</span>, save_tag)

<span class="tok-nd">@bot.command</span>(name=<span class="tok-s">"tag"</span>)
<span class="tok-k">async def</span> <span class="tok-nf">tag</span>(ctx: CommandContext) -> None:
    <span class="tok-k">await</span> ctx.send_modal(Modal(
        <span class="tok-s">"tag-create"</span>,
        <span class="tok-s">"New tag"</span>,
        TextInput(<span class="tok-s">"name"</span>, <span class="tok-s">"Name"</span>, max_length=<span class="tok-s">32</span>),
        TextInput(<span class="tok-s">"body"</span>, <span class="tok-s">"Body"</span>, style=<span class="tok-s">2</span>, required=False),
    ))</code></pre>
    </div>
  </div>
  <p>Components V2 layouts use <code>Container</code>, <code>Section</code>, <code>TextDisplay</code>, <code>Thumbnail</code>, <code>MediaGallery</code>, <code>Separator</code>, and the <code>COMPONENTS_V2_FLAG</code> message flag.</p>
  <p><a href="guides/interactions/">Components and interactions</a></p>
</section>

<section class="home-block" id="cogs">
  <h2>Cogs group commands. Extensions load them.</h2>
  <div class="home-duo">
    <div>
      <p>A cog is a class. Decorate methods with <code>@command</code>. Override <code>cog_check</code> to gate the whole group. Override <code>cog_command_error</code> if the default reply is wrong. <code>Plugin</code> is a lighter bundle of the same idea.</p>
      <p>An extension is a module with <code>setup(client)</code>, sync or async. Reload tears the old one down first, then loads the replacement, including already-imported submodules. Keep setup safe to run twice.</p>
    </div>
    <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> typing <span class="tok-k">import</span> Annotated
<span class="tok-k">from</span> astrae <span class="tok-k">import</span> Client, Cog, CommandContext, IntegerOption, command, listener

<span class="tok-k">class</span> <span class="tok-nf">Moderation</span>(Cog):
    name = <span class="tok-s">"moderation"</span>

    <span class="tok-nd">@command</span>(name=<span class="tok-s">"slowmode"</span>, description=<span class="tok-s">"Set channel slowmode"</span>)
    <span class="tok-k">async def</span> <span class="tok-nf">slowmode</span>(
        self, ctx: CommandContext,
        seconds: Annotated[int, IntegerOption(description=<span class="tok-s">"Delay"</span>)],
    ) -> None:
        <span class="tok-k">await</span> self.client.http.channels.modify(
            ctx.channel_id, rate_limit_per_user=seconds
        )
        <span class="tok-k">await</span> ctx.success(<span class="tok-s">f"Slowmode {seconds}s"</span>)

<span class="tok-k">class</span> <span class="tok-nf">Bot</span>(Client):
    <span class="tok-k">async def</span> <span class="tok-nf">setup_hook</span>(self) -> None:
        <span class="tok-k">await</span> self.add_cog(Moderation(self))
        <span class="tok-k">await</span> self.load_extension(<span class="tok-s">"cogs.tags"</span>)</code></pre>
  </div>
</section>

<section class="home-block" id="events">
  <h2>Rust receives the event. Python listeners run.</h2>
  <div class="home-duo">
    <div>
      <p><code>@bot.event</code> for the named hook. <code>@bot.listen("message_create")</code> when you want the Discord name. Ask for <code>EventContext</code> when you need shard, delivery id, receive time, or the previous snapshot on an update. That snapshot is this process's last look, not a database.</p>
      <p>Listeners sit on the dispatch path. <code>time.sleep</code> stalls the loop. Queue the heavy work. Workers can see the same Redis delivery twice after a crash.</p>
      <p><a href="guides/events/">Events</a></p>
    </div>
    <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> EventContext, Message

<span class="tok-nd">@bot.listen</span>(<span class="tok-s">"message_create"</span>)
<span class="tok-k">async def</span> <span class="tok-nf">audit_message</span>(message: Message, context: EventContext) -> None:
    <span class="tok-k">if</span> message.author <span class="tok-k">and</span> message.author.bot:
        <span class="tok-k">return</span>
    print(context.shard, message.id, message.content[:80])</code></pre>
  </div>
</section>

<section class="home-block" id="loops">
  <h2>Loops follow the client. Cron is separate.</h2>
  <p>The decorator alone does not start anything. <code>client.add_loop</code> does. They wait one interval before the first run. A raised error is logged; the loop keeps going. One iteration at a time.</p>
  <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> ActivityType, Client, loop

<span class="tok-nd">@loop</span>(minutes=<span class="tok-s">5</span>)
<span class="tok-k">async def</span> <span class="tok-nf">refresh_status</span>() -> None:
    bot.set_presence(name=<span class="tok-s">"the gateway"</span>, activity_type=ActivityType.WATCHING)

<span class="tok-k">class</span> <span class="tok-nf">Bot</span>(Client):
    <span class="tok-k">async def</span> <span class="tok-nf">setup_hook</span>(self) -> None:
        self.add_loop(refresh_status)</code></pre>
  <p><code>Scheduler.cron</code> is five fields: minute, hour, day, month, weekday. <code>*</code>, an integer, or a comma list. No ranges, no steps. <code>Scheduler.lock</code> / <code>hold</code> are best-effort Redis leases. Jobs still need to be idempotent.</p>
  <p><a href="guides/tasks/">Background tasks</a></p>
</section>

<section class="home-block" id="cache">
  <h2>Opcode 8 still runs. The member blob does not stay huge.</h2>
  <p>Astrae requests the full member list, then drops fields a bot cannot use before the payload is queued. Users are stored once. A member record is nick, roles, joined_at, guild avatar, guild banner, and a pointer. A cache miss is not “Discord does not have this.”</p>
  <div class="home-split">
    <div class="home-keep">
      <h3>Kept</h3>
      <ul>
        <li>id, username, global_name</li>
        <li>avatar, banner, bot</li>
        <li>nick, roles, joined_at</li>
        <li>primary_guild</li>
      </ul>
    </div>
    <div class="home-drop">
      <h3>Not stored</h3>
      <ul>
        <li>bio — Discord does not send it</li>
        <li>collectibles</li>
        <li>avatar_decoration_data</li>
        <li>clan, unless it is primary_guild</li>
      </ul>
    </div>
  </div>
  <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> CacheConfig, CachePolicy, Client, Intents

bot = Client(
    cache_redis=<span class="tok-s">"redis://127.0.0.1:6379/2"</span>,
    intents=Intents.DEFAULT | Intents.GUILD_MEMBERS,
    cache=CacheConfig(
        users=CachePolicy(size=None, ttl=None),
        members=CachePolicy(size=None, ttl=None),
    ),
    cache_all_members_after_boot=True,
    member_warmup_memory_limit_mb=<span class="tok-s">1024</span>,
    primary_guilds=False,
)</code></pre>
  <p>Defaults are mixed on purpose: 250k users, 500k members, 10k messages for 120 seconds, invites 600 seconds, presences off. Full member warmup is opt-in and needs Redis, the Guild Members intent, and unbounded user/member size.</p>
  <p><a href="guides/caching/">Cache</a></p>
</section>

<section class="home-block" id="dashboard">
  <h2>The dashboard binds loopback.</h2>
  <p>After <code>bot.run()</code>, open <code>127.0.0.1:9100</code>. Cluster 0 serves the page. Other clusters publish expiring Redis telemetry; they do not open extra listeners. Command logs strip bodies. Loop stalls from <code>LoopMonitor</code> show up in activity and the error feed.</p>
  <div class="home-panel">
    <div class="home-panel-bar"><span class="home-dot"></span>127.0.0.1:9100</div>
    <ul class="home-routes">
      <li><code>/</code> live dashboard</li>
      <li><code>/dashboard/commands</code> every cluster</li>
      <li><code>/dashboard/operations</code> commands, REST, components, errors</li>
      <li><code>/dashboard/guilds</code> top guilds and shard state</li>
      <li><code>/api/health</code> fleet JSON</li>
      <li><code>/metrics</code> Prometheus</li>
    </ul>
  </div>
  <p><a href="operations/metrics/">Metrics and dashboard</a></p>
</section>

<section class="home-block" id="cluster">
  <h2>One Client, then as many processes as you need.</h2>
  <p>A small bot holds every shard in one process. Split when one process is the wrong failure domain. Gateway processes keep the sockets. Workers take shard-affine events over Redis. The supervisor assigns contiguous ranges, restarts a child that dies, and does not restart exit 78 (<code>InvalidToken</code>).</p>
  <div class="home-panel">
    <div class="home-panel-bar"><span class="home-dot"></span>cluster 0</div>
    <pre class="home-term"><code>astrae cluster mybot --clusters 2 --shards 8</code></pre>
  </div>
  <p><code>--shards auto</code> calls <code>/gateway/bot</code>. Children get <code>ASTRAE_CLUSTER_ID</code>, <code>ASTRAE_SHARD_IDS</code>, and friends; <code>ClusterContext.from_env()</code> reads them. The interactive console can restart a child, reshard, and reload extensions.</p>
  <p><a href="guides/sharding/">Sharding and clusters</a>
  <a href="cli/">CLI</a></p>
</section>

<section class="home-block" id="sql">
  <h2>SQL is for your rows.</h2>
  <p>Gateway events and the Discord cache do not go here. <code>Database</code> is on <code>client.db</code>. URLs: <code>sqlite:///bot.db</code>, <code>postgres://...</code>, <code>mysql://...</code>. Pass <code>dsn=</code> on the client, or set <code>DATABASE_URL</code>.</p>
  <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> Database

db = Database.shared(<span class="tok-s">"sqlite:///bot.db"</span>)

row = <span class="tok-k">await</span> db.fetchrow(
    <span class="tok-s">"SELECT value FROM settings WHERE name = :name"</span>,
    {<span class="tok-s">"name"</span>: <span class="tok-s">"greeting"</span>},
)

<span class="tok-k">async with</span> db.transaction() <span class="tok-k">as</span> connection:
    <span class="tok-k">await</span> connection.execute(
        <span class="tok-s">"UPDATE settings SET value = :value WHERE name = :name"</span>,
        {<span class="tok-s">"value"</span>: <span class="tok-s">"Hello"</span>, <span class="tok-s">"name"</span>: <span class="tok-s">"greeting"</span>},
    )</code></pre>
  <p><a href="reference/db/">Database</a></p>
</section>

<section class="home-block" id="debug">
  <h2>Owner debug, then telemetry.</h2>
  <div class="home-duo">
    <div>
      <p>Load Jishaku only where owners are people you trust. Eval runs as the bot. Non-owners are dropped silently. With Redis telemetry, <code>jsk</code> reports the whole fleet: guilds, users, channels, shard readiness, RSS.</p>
      <p><code>setup_sentry()</code> and <code>setup_tracelet()</code> read <code>SENTRY_DSN</code> / <code>TRACELET_DSN</code>. <code>setup_posthog()</code> sends <code>command_used</code>. Put this in <code>setup_hook()</code>, not <code>on_ready</code> — shards can ready more than once.</p>
      <p><a href="reference/jishaku/">Jishaku</a></p>
    </div>
    <pre class="home-snippet"><code class="nohighlight"><span class="tok-k">from</span> astrae <span class="tok-k">import</span> Client, Jishaku

<span class="tok-k">class</span> <span class="tok-nf">Bot</span>(Client):
    <span class="tok-k">async def</span> <span class="tok-nf">setup_hook</span>(self) -> None:
        <span class="tok-k">await</span> self.add_cog(Jishaku(self))
        self.setup_sentry()
        self.setup_posthog()</code></pre>
  </div>
</section>

<section class="home-block">
  <h2>More names on the root import</h2>
  <p><code>from astrae import …</code> is the public contract. <code>UNSET</code> means omit the key. <code>None</code> means JSON null. Voice names exist; they are not a working music stack.</p>
  <p class="home-names">
    <code>Embed</code> <code>File</code> <code>Upload</code> <code>AllowedMentions</code> <code>Poll</code>
    <code>User</code> <code>Member</code> <code>Guild</code> <code>Channel</code> <code>Message</code> <code>Interaction</code>
    <code>Intents</code> <code>Permission</code> <code>MessageFlags</code> <code>ButtonStyle</code>
    <code>Forbidden</code> <code>NotFound</code> <code>RateLimited</code> <code>InvalidToken</code>
  </p>
  <p><a href="reference/exports/">Every public export</a>
  <a href="reference/">API reference</a>
  <a href="examples/">Examples</a></p>
</section>

<section class="home-leave">
  <div class="home-note">
    <p>Coming from discord.py: names will look familiar. It is not a fork. Do not rename the import and expect the bot to boot. Put async setup in <code>setup_hook()</code>. Global slash sync is on; turn it off with <code>sync_commands=False</code> while you iterate.</p>
  </div>
  <p>
    <a href="getting-started/installation/">Install from source</a>
    <a href="migrating-from-discord-py/">Migration notes</a>
    <a href="reference/public-api/">API map</a>
  </p>
</section>
