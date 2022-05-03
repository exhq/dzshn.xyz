<script>
    import Ref from "$lib/Ref.svelte";
    import Footer from "$lib/Footer.svelte";

    const links = [
        ["https://toot.cat/@dzshn", "@dzshn@toot.cat", "fedi", { rel: "me" }],
        ["mailto:me@dzshn.xyz", "me@dzshn.xyz", "email"],
        ["https://github.com/dzshn", "dzshn", "github"],
        ["https://t.me/dzshn", "@dzshn", "telegram"],
        ["https://reddit.com/u/dzsh", "u/dzsh", "reddit"],
        ["https://discord.gg/qXPm32cHUv", "qXPm32cHUv", "discord"],
        [
            "https://keyoxide.org/EAE7D067D702BAA4627B5C1AEFF4B4B1AF6264DD",
            "EFF4 B4B1 AF62 64DD",
            "pgp",
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
        latina, trans, sapphic, minor, she/her, etc.<Ref ce /> <br />
        <br />
        I like coding stuff, I also like making coding atrocities,<Ref cn />
        sometimes. <br />
        I'm also into linguistics, some nlp and a bitter bit of webdev.<br />
        I was once terminally addicted to Tetris and now a part-time Tetris nerd.<Ref
            explain
        />
    </p>
    <h2>contact & socials</h2>
    <div class="socials">
        {#each links as [href, name, ann, extras]}
            <a target="_blank" {href} {...extras}>
                {name} <i>[{ann}]</i>
            </a>
        {/each}
    </div>
</main>
<Footer />

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Noto+Sans:wght@400;700&display=swap");

    :root {
        background: #151515;
        color: #e0e0e0;
        font-family: "Noto Sans";
        font-size: 16pt;
        margin: 0;
    }

    code {
        font-family: "Fira Code", monospace;
    }

    main {
        width: calc(100vw - 40px);
        margin: auto;
    }

    h1,
    h2 {
        border-bottom: 4px dotted #fa50a0;
        font-family: "Fira Code", monospace;
        padding: 20px 2px 0px;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
    }

    a {
        color: #fb69ad;
        text-decoration: none;
    }
    a:hover {
        color: #fb82bb;
    }

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

    @media (any-pointer: coarse) {
        .socials > * {
            padding: 4pt 0;
        }
    }
</style>
