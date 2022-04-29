<script>
    import Ref from "$lib/Ref.svelte";
    import Footer from "$lib/Footer.svelte";

    const links = [
        ["mastodon", "https://toot.cat/@dzshn", "@dzshn@toot.cat", {"rel": "me"}],
        ["email", "mailto:zshn@proton.me", "zshn@proton.me"],
        ["github", "https://github.com/dzshn", "dzshn"],
        ["telegram", "https://t.me/dzshn", "@dzshn"],
        ["reddit", "https://reddit.com/u/dzsh", "u/dzsh"],
        ["discord", "https://discord.gg/qXPm32cHUv", ".gg/qXPm32cHUv"],
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
    <h2>social stuff</h2>
    <p>you might find me here,,</p>
    <div class="socials">
        {#each links as [name, href, title, extra]}
            <a target="_blank" {href} {title} {...extra}>{name}</a>
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
        max-width: 320pt;
        min-width: 160pt;
    }
    .socials * {
        width: 160pt;
    }
    .socials *::before {
        color: #e0e0e0;
        content: "@ ";
    }
</style>
