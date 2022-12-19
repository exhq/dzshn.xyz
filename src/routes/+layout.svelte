<script lang="ts">
    // a little obfuscation is ok

    import meow from "$lib/shh";
    import Oneko from "$lib/oneko.svelte";

    let huh: string[] = [];
    let uhm = false;
    let guh: string;

    $: guh = uhm? guh : huh.reduce((prev, char, i) => {
        const secret = "726561642069662063757465";
        i %= 12;
        i *= 2;
        return prev + ("0" + (char.charCodeAt(0) ^ parseInt(secret.slice(i++, ++i), 16)).toString(16)).slice(~1);
    }, "");

    $: guh in meow && mrrp();

    function shh({ key }: KeyboardEvent) {
        if (!uhm && key.length == 1) {
            huh.push(key);
            huh = huh;
            setTimeout(() => huh.shift(), 2000);
        }
    }

    function mrrp() { uhm = true; }

    function destroy() { uhm = false; huh = []; }
</script>

<Oneko />

<svelte:window on:keydown={shh} />
<svelte:component this={meow[guh]} {destroy} />

<slot></slot>

<footer>
    <span>
        <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            svelte &lt;3
        </a>
    </span>
    <span>
        <a href="https://github.com/dzshn/dzshn.xyz/blob/main/LICENSE" target="_blank" rel="noreferrer license">
            (c) 2022 Sofia Lima
        </a>
    </span>
    <span>
        <a href="https://github.com/dzshn/dzshn.xyz" target="_blank" rel="noreferrer">
            source code
        </a>
    </span>
</footer>

<style>
    /* Fonts:
     * - Noto Sans (Regular, Bold, Italic): global font
     * - Fira Code (Regular, Bold): monospace font
     * - Noto Sans Mono (Regular): fallback monospace
     */
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Noto+Sans+Mono&family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap');

    :root {
        background: #151515;
        color: #f0f0f0;
        font-family: "Noto Sans", sans-serif;
    }

    :global(a) {
        color: #fb82bb;
        font-family: "Fira Code", monospace;
        text-decoration: none;
    }
    :global(a:hover) {
        text-decoration: underline;
    }

    :global(li::marker) {
        color: #a0a0a0;
        font-family: "Fira Code", monospace;
    }
    :global(ul li::marker) {
        content: "* ";
    }

    :global(h1, h2, h3, h4) {
        font-family: "Fira Code", monospace;
        border-bottom: 3px dotted #fa50a0;
        width: fit-content;
    }

    :global(code, pre) {
        font-family: "Fira Code", "Noto Sans Mono", monospace;
    }

    footer a {
        color: #e0e0e0;
    }

    @media not (max-width: 600px) {
        footer {
            text-align: center;
        }
        footer > *:nth-last-child(n+2)::after {
            content: " -*- ";
            color: #a0a0a0;
            font-family: "Fira Code";
        }
    }

    @media (max-width: 600px) {
        footer {
            display: flex;
            flex-direction: column;
        }
    }
</style>
