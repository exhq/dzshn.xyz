<script>
    import homu from "./assets/hameru.jpeg";
</script>

<main>
    <h1>!?</h1>
    <p>
        <code>ヾ(^o^ )</code>, I am dzshn (pronounced <code>/ziː/</code>).
        latina, minor, she/her etc.
        <br /><br />
        I like coding stuff, I also like making coding atrocities, sometimes.
    </p>
    <h2>social stuff</h2>
    <p>you might find me here</p>
    <div class="socials">
        <a
            target="_blank"
            href="https://discord.gg/qXPm32cHUv"
            title=".gg/qXPm32cHUv"
        >
            discord
        </a>
        <a target="_blank" href="mailto:zshn@proton.me" title="zshn@proton.me">
            email
        </a>
        <a target="_blank" href="https://github.com/dzshn" title="dzshn">
            github
        </a>
        <a target="_blank" href="https://twitter.com/dzshn_" title="@dzshn_">
            twitter
        </a>
        <a target="_blank" href="https://reddit.com/u/dzsh" title="u/dzsh">
            reddit
        </a>
        <a target="_blank" href="https://t.me/dzshn" title="@dzshn">
            telegram
        </a>
    </div>
    <div>
        <img
            id="homu"
            src={homu}
            alt="homura plushie (madoka magica character)"
        />
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
    <span>(under reconstruction!)</span>
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

    #homu {
        max-width: 100%;
        width: 160pt;
        margin: 32pt 0;
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
