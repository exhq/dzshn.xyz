<script lang="ts">
    const links: [string, string, string, string][] = [
        ["gh", "dzshn", "https://github.com/dzshn", "i put my code here"],
        ["pgp", "EFF4 B4B1 AF62 64DD", "https://keyoxide.org/EAE7D067D702BAA4627B5C1AEFF4B4B1AF6264DD", "i sign things with this"],
        ["fedi", "@z@wetdry.world", "https://wetdry.world/@z", "i post my silly things here"],
        ["email", "me@dzshn.xyz", "mailto:me@dzshn.xyz", "free cheezburgor"],  // yes, in plaintext
        ["matrix", "@z:catvibers.me", "https://matrix.to/#/@z:catvibers.me", "u can message me here"],
        ["discord", "ma tomo", "https://discord.gg/qXPm32cHUv", "…or here"],
    ];

    const projects: [string, string][] = [
        ["faultless", "catch segfaults as if they were normal python exceptions"],
        ["lispy", "a fully functional lisp dialect that's also valid python"],
        ["uwu", '<code role="img" aria-label="cat kaomoji">(^·ω·^)</code>-ified python bytecode'],
        ["ike", "evil bytecode and memory manipulation library"],
        ["python-tetris", "simple and modular tetris library"],
        ["dzshn.xyz", "a rather silly website"],
    ];
</script>

<svelte:head>
    <title>dzshn.xyz</title>
    <meta name="og:title" content="dzshn.xyz" />
    <meta name="og:description" content="certified silly person website" />
</svelte:head>

<main>
    <h1>?!</h1>
    <p>
        <code role="img" aria-label="hello">ヾ(^o^ )</code>, I'm dzshn! I code silly things sometimes,<sup class="ref">[<a href="https://en.wikipedia.org/wiki/WP:Vagueness"><i>vague</i></a>]</sup> mainly in Python or <abbr title="typescript">TS</abbr>. I listen to all sorts<sup class="ref">[<a href="https://en.wikipedia.org/wiki/WP:CON"><i>disputed <a href="/talk#music">–</a> discuss</i></a>]</sup> of music while I'm at it. Other than linux stuff and<sup class="ref"><a href="/dots">[1]</a></sup> coding, I'm really into linguistics. may or may not be a cat.
        <br /> <br />
        tran gener people r cool btw any pronouns are fine (also my username is pronounced <code>/zi:/</code>)
        <br /> <br />
        I accept donations via <a href="https://github.com/sponsors/dzshn">github sponsors</a> and <a href="https://patreon.com/dzshn">patreon</a> (please consider!!)
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
    <h2>my work</h2>
    <p>
        Most of my projects can be found on <a href="https://github.com/dzshn.xyz" target="_blank" rel="noreferrer me">github</a>, I also like to contribute to other people's projects sometimes. <br />
        I know too much of CPython's internals and have forever cursed this land<sup class="ref">[<a href="https://en.wikipedia.org/wiki/WP:CLARIFY"><i>how?</i></a>]</sup> <br />
    </p>
    <div id="projects">
        {#each projects as [repo, description]}
            <div>
                <a href="https://github.com/dzshn/{repo}" target="_blank" rel="noreferrer">
                    dzshn/<b>{repo}</b>
                </a>
                <div>{@html description}</div>
            </div>
        {/each}
    </div>
    <p>
        I also have a bunch of weird snippets <a href="/hell">here</a>
    </p>
</main>

<style>
    main {
        width: calc(100vw - 40px);
        max-width: 1200px;
        margin: auto;
        margin-bottom: 40pt;
    }

    .ref a {
        font-family: "Noto Sans", sans-serif;
    }

    #projects {
        font-family: "Fira Code", "Noto Sans Mono", monospace;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    #projects > div {
        margin: 0 2ch 1rem;
        width: 48ch;
    }

    #links {
        font-family: "Fira Code", monospace;
        padding-top: 8pt;
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
