<script lang="ts">
    const links: [string, string, string, string][] = [
        ["gh", "dzshn", "https://github.com/dzshn", "i put my code here"],
        ["pgp", "EFF4 B4B1 AF62 64DD", "https://keyoxide.org/EAE7D067D702BAA4627B5C1AEFF4B4B1AF6264DD", "i sign things with this"],
        ["fedi", "@z@wetdry.world", "https://wetdry.world/@z", "i post my silly things here"],
        ["email", "me@dzshn.xyz", "mailto:me@dzshn.xyz", "free cheezburgor"],  // yes, in plaintext
        ["matrix", "@z:catvibers.me", "https://matrix.to/#/@z:catvibers.me", "u can message me here"],
        ["discord", "ma tomo", "https://discord.gg/qXPm32cHUv", "…or here"],
    ];
</script>

<svelte:head>
    <title>dzshn.xyz</title>
    <meta name="og:title" content="dzshn.xyz" />
    <meta name="og:description" content="certified silly person website" />
</svelte:head>

<main>
    <h1>gay</h1>
    <p>
        ball
    </p>
    <ul id="links">
        {#each links as [name, id, href, comment]}
            <li>
                <a {href} target="_blank" rel="noreferrer me">
                    {id} <span style:margin-left="{24 - id.length - name.length}ch">{name}</span>
                </a>
                <i>({comment})</i>
            </li>
        {/each}
    </ul>
</main>

<style>
    main {
        width: calc(100vw - 40px);
        max-width: 1200px;
        margin: auto;
    }

    #links {
        font-family: "Fira Code";
    }
    #links a span {
        color: #e0e0e0;
    }
    #links a span::before {
        content: "// ";
        color: #a0a0a0;
    }
    #links i {
        color: #c0c0c0;
    }
    @media (max-width: 64ch) {
        #links i {
            display: none;
        }
    }
    @media (max-width: 40ch) {
        #links a {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
        }
        #links a span::before {
            display: none;
        }
        #links a span::after {
            content: ":";
        }
        #links a span {
            margin-left: 0 !important;
        }
    }
</style>
