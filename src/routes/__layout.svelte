<script>
    import Shh from "$lib/shh/Shh.svelte";
    import { browser } from "$app/env";

    if (browser) {
        import("$lib/oneko.js/oneko-element.js").then(({ ONekoElement }) => {
            customElements.define("o-neko", ONekoElement);
        });
    }
</script>

<Shh />
<slot />
<div id="cat" aria-hidden="true">/ᐠ｡ꞈ｡ᐟ\</div>
<o-neko />
<footer>
    <span>
        built w/ <a target="_blank" href="https://svelte.dev">svelte</a>
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
</footer>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Noto+Sans:wght@400;700&display=swap");

    @font-face {
        src: url("$lib/assets/nasin-nanpa.otf");
        font-family: "nasin-nanpa";
    }

    :global(:root) {
        background: #151515;
        color: #e0e0e0;
        font-family: "Noto Sans";
        font-size: 16pt;
    }

    :global(code) {
        font-family: "Fira Code", monospace;
    }

    :global(:lang(tok)) {
        font-family: "nasin-nanpa";
    }

    :global(main) {
        width: calc(100vw - 40px);
        max-width: 800pt;
        margin: auto;
    }

    :global(h1, h2, h3) {
        border-bottom: 4px dotted #fa50a0;
        font-family: "Fira Code", monospace;
        padding: 20px 2px 0px;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
    }

    :global(a) {
        color: #fb69ad;
        text-decoration: none;
    }
    :global(a:hover) {
        color: #fb82bb;
    }

    #cat {
        position: fixed;
        bottom: 0;
        right: 0;
        user-select: none;
        transition: all 0.6s 12s ease-in;
    }
    #cat:hover {
        transform: translateY(10pt);
        transition-delay: 0.6s;
    }

    footer {
        color: #a0a0a0;
        font-family: "Fira Code";
        font-size: 14pt;
        margin-top: 64pt;
        text-align: center;
    }

    a {
        color: #e0e0e0;
        text-decoration: none;
    }
    a:hover {
        color: #fb82bb;
    }

    @media (min-width: 600pt) {
        footer > span:nth-child(1n + 2)::before {
            color: #a0a0a0;
            content: "-*- ";
        }
    }

    @media (max-width: 600pt) {
        footer {
            display: flex;
            flex-direction: column;
            text-align: left;
        }
    }
</style>
