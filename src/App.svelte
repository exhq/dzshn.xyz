<script>
    import homu from "./assets/hameru.jpeg";
</script>

<main>
    <h1>hi,</h1>
    <img id="homu" src={homu} alt="homura plushie (madoka magica character)" />
    <h2>social stuff</h2>
    <div class="socials">
        <a target="_blank" href="https://discord.gg/qXPm32cHUv">discord</a>
        <a target="_blank" href="mailto:zshn@pm.me">zshn@pm.me</a>
        <a target="_blank" href="https://github.com/dzshn">github</a>
        <a target="_blank" href="https://twitter.com/dzshn_">twitter</a>
        <a target="_blank" href="https://reddit.com/u/dzsh">reddit</a>
        <a target="_blank" href="https://instagram.com/dzshn">instagram</a>
        <a target="_blank" href="https://t.me/dzshn">telegram</a>
    </div>
    <footer>
        <a target="_blank" href="https://github.com/dzshn/dzshn.xyz">
            view source
        </a>
        -*- built w/
        <a target="_blank" href="https://vitejs.dev">vite</a>
        +
        <a target="_blank" href="https://svelte.dev">svelte</a>
        -*- (c)
        <a
            target="_blank"
            href="https://github.com/dzshn/dzshn.xyz/blobl/main/LICENSE"
        >
            MIT License
        </a>
    </footer>
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Noto+Sans:wght@400;700&family=Quicksand:wght@400;700&display=swap");

    :root {
        background: #151515;
        color: white;
        font-family: "Noto Sans";
        font-size: 16pt;
        padding: 0px 20px;
    }

    h1,
    h2 {
        border-bottom: 4px dotted #fa50a0;
        font-family: "Quicksand";
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
    }

    #homu:hover {
        animation: spiiin 3600s linear infinite;
    }

    @keyframes spiiin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .socials {
        display: flex;
        font-family: "Fira Code", monospace;
        flex-wrap: wrap;
        max-width: 640pt;
        min-width: 160pt;
        width: 80%;
    }
    .socials * {
        flex-basis: 160pt;
    }
    .socials *::before {
        color: white;
        content: "@ ";
    }

    footer {
        color: #a0a0a0;
        font-family: "Fira Code", monospace;
        margin-top: 64pt;
        text-align: center;
    }
    footer a {
        color: #e0e0e0;
    }
</style>
