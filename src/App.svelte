<script>
    import Ref from "./lib/Ref.svelte";

    const links = [
        ["discord", "https://discord.gg/qXPm32cHUv", ".gg/qXPm32cHUv"],
        ["email", "mailto:zshn@proton.me", "zshn@proton.me"],
        ["github", "https://github.com/dzshn", "dzshn"],
        ["twitter", "https://twitter.com/dzshn_", "@dzshn_"],
        ["reddit", "https://reddit.com/u/dzsh", "u/dzsh"],
        ["telegram", "https://t.me/dzshn", "@dzshn"],
    ];
</script>

<main>
    <h1>!?</h1>
    <p>
        <code>ヾ(^o^ )</code>, my name is dzshn (pronounced <code>/ziː/</code>).
        latina, trans, sapphic, minor, she/her, etc.<Ref cei /> <br />
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
        {#each links as [name, href, title]}
            <a target="_blank" {href} {title}>{name}</a>
        {/each}
    </div>
</main>
<footer>
    <span>
        built w/
        <a target="_blank" href="https://vitejs.dev">vite</a>
        +
        <a target="_blank" href="https://svelte.dev">svelte</a>
    </span>
    <span>
        (c)
        <a
            target="_blank"
            href="https://github.com/dzshn/dzshn.xyz/blob/main/LICENSE"
        >
            MIT License
        </a>
    </span>
    <span>
        <a target="_blank" href="https://github.com/dzshn/dzshn.xyz">
            [view source]
        </a>
    </span>
    <span>(under construction!)</span>
</footer>

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

    footer {
        color: #a0a0a0;
        font-family: "Fira Code", monospace;
        font-size: 14pt;
        margin-top: 64pt;
        text-align: center;
    }
    footer a {
        color: #e0e0e0;
    }
    @media (min-width: 1024px) {
        footer span:nth-child(1n + 2)::before {
            color: #a0a0a0;
            content: "-*- ";
        }
    }
    @media not (min-width: 1024px) {
        footer {
            display: flex;
            flex-direction: column;
            text-align: left;
        }
    }
</style>
