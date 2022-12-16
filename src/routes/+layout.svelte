<script lang="ts">
    // a little obfuscation is ok

    import meow from "$lib/shh";

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
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Noto+Sans:wght@400;700&display=swap');

    :root {
        background: #151515;
        color: #f0f0f0;
        font-family: "Noto Sans";
    }

    :global(a) {
        color: #fb82bb;
        font-family: "Fira Code";
        text-decoration: none;
    }
    :global(a:hover) {
        text-decoration: underline;
    }

    :global(li::marker) {
        content: "* ";
        color: #a0a0a0;
        font-family: "Fira Code";
    }

    :global(h1, h2, h3, h4) {
        font-family: "Fira Code";
        border-bottom: 3px dotted #fa50a0;
        width: fit-content;
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
