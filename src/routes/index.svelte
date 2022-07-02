<script>
    import Ref from "$lib/Ref.svelte";

    const links = [
        ["https://www.patreon.com/dzshn", "donate!!!!!!", "patreon"],
        ["https://toot.cat/@dzshn", "@dzshn@toot.cat", "fedi", { rel: "me" }],
        ["mailto:me@dzshn.xyz", "me@dzshn.xyz", "email"],
        ["https://github.com/dzshn", "dzshn", "github"],
        ["https://discord.gg/qXPm32cHUv", "ma tomo", "discord"],
        ["https://t.me/dzshn", "@dzshn", "telegram"],
        ["https://reddit.com/u/dzsh", "u/dzsh", "reddit"],
        [
            "https://keyoxide.org/EAE7D067D702BAA4627B5C1AEFF4B4B1AF6264DD",
            "EFF4 B4B1 AF62 64DD",
            "pgp",
        ],
        [
            "https://matrix.to/#/@dzshn:catgirl.cloud",
            "@dzshn:catgirl.cloud",
            "matrix",
        ],
    ];
</script>

<svelte:head>
    <title>dzshn.xyz</title>
</svelte:head>

<main>
    <h1>!?</h1>
    <p>
        <code>ヾ(^o^ )</code>, my name is dzshn (pronounced <code>/ziː/</code>).
        latina, trans, sapphic, minor, she/her, etc.<Ref
            external
            href="https://en.wikipedia.org/wiki/Portal:Current_events"
            title="This statement refers to current events and needs references to newer reliable sources."
            ref="may be outdated"
        /> <br />
        <br />
        I like coding stuff, I also like making coding atrocities,<Ref
            ref="a"
        />
        sometimes. <br />
        I'm also quite a bit into linguistics. <span lang="tok">󱤴󱥡󱤉󱥬󱥔!</span>
        <br />
        I was once terminally addicted to Tetris and now a part-time Tetris nerd.<Ref
            external
            href="https://en.wikipedia.org/wiki/Wikipedia:Citation_needed"
            title="This claim needs references to reliable sources."
            ref="citation needed"
        />
    </p>
    <h2>locate</h2>
    <ul class="socials">
        {#each links as [href, name, ann, extras]}
            <li>
                <a target="_blank" {href} {...extras}>
                    {name} <i>[{ann}]</i>
                </a>
            </li>
        {/each}
    </ul>
    <ol class="refs">
        <li><Ref note="a"><a href="/hell"><code>~/hell</code></a></Ref></li>
    </ol>
</main>

<style>
    .socials {
        display: flex;
        font-family: "Fira Code", monospace;
        flex-wrap: wrap;
        max-width: 640pt;
        min-width: 160pt;
    }
    .socials > * {
        width: 320pt;
    }
    .socials i {
        color: #a0a0a0;
    }
    .socials a:hover i {
        color: #b0b0b0;
    }
    .socials a[href="https://www.patreon.com/dzshn"]
    {
        font-weight: bold;
    }
    .socials li::marker {
        content: "* ";
    }
    .refs {
        list-style-type: lower-alpha;
        margin-top: 32pt;
        padding-top: 8pt;
        border-top: #303030 4px dotted;
    }

    @media (any-pointer: coarse) {
        .socials > * {
            padding: 4pt 0;
        }
    }
</style>
