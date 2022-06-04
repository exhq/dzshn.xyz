<script>
    import Prism from "prismjs";
    import "prismjs/components/prism-python.js";

    const snippets = [
        {
            title: "hewwo.py",
            desc: `
                <code class="language-python">print("hewwo world :3")</code> in 912 cryptic lines :3 <br />
                it only works on *nix and cpython-based interpreters. that's all you need to know :)
            `,
            lang: "python",
            gist: "https://gist.github.com/dzshn/1b8853023f364dc559c2b11c6a5f38b7",
            file: "https://gist.githubusercontent.com/dzshn/1b8853023f364dc559c2b11c6a5f38b7/raw/hewwo.py",
        },
        {
            title: "tetr.py",
            desc: `
                a full guideline tetris [n]curses TUI in one comically large line. yes, it is
                perfectly valid python. <br />
                it looks like <a target="_blank" href="https://imgur.com/RRrzS9g">this</a>, by the way
            `,
            lang: "python",
            gist: "https://gist.github.com/dzshn/a26fd2c78a60765b826c2e16aa02c3d2",
            file: "https://gist.githubusercontent.com/dzshn/a26fd2c78a60765b826c2e16aa02c3d2/raw/tetr.py",
        },
        {
            title: "gol.py",
            desc: `
                a little one-line* conway's game of life implementation, animates within a terminal <br />
                <sub>* except for the map<sup>(try editing it!)</sup></sub>
            `,
            lang: "python",
            gist: "https://gist.github.com/dzshn/a195ca06f9478db46e0c4fb1fe56419e",
            file: "https://gist.githubusercontent.com/dzshn/a195ca06f9478db46e0c4fb1fe56419e/raw/gol.py",
        },
        {
            title: "m.2.py",
            desc: `
                mandelbrot in a 4x69 chunk of characters (laid out as diagonal stripes for "readability")
            `,
            lang: "python",
            gist: "https://gist.github.com/dzshn/b271f6c9f1ce624cf87a03342898a827",
            file: "https://gist.githubusercontent.com/dzshn/b271f6c9f1ce624cf87a03342898a827/raw/m.2.py",
        },
        {
            title: "mmm.py",
            desc: `
                python if it was uhh. uhh,,  uh.  what <br />
                this is best viewed with at least 100ch width
            `,
            lang: "python",
            gist: "https://gist.github.com/dzshn/c3530bee0dd89312aab1638bd2953da5",
            file: "https://gist.githubusercontent.com/dzshn/c3530bee0dd89312aab1638bd2953da5/raw/mmmm.py",
        },
        {
            title: "m.py",
            desc: `
                a bit of sillying with a simple mandelbrot code
            `,
            lang: "python",
            gist: "https://gist.github.com/dzshn/6ec24800669595b7ce5ce680cd9f55b8",
            file: "https://gist.githubusercontent.com/dzshn/6ec24800669595b7ce5ce680cd9f55b8/raw/m.py",
        },
    ];
</script>

<main>
    <h1>best coding practices!1!1!!!</h1>
    <p>
        a bunch of silly snippets I made. they all abuse their language in some
        way <br />
        I recommend <a target="_blank" href="https://wandbox.org">wandbox</a> if
        you can't run these
    </p>

    <h2>faq</h2>
    <ul class="qa">
        <li>
            <h3>please tell me you automated this</h3>
            I did not :3
        </li>
        <li>
            <h3>how!</h3>
            🪄✨
        </li>
    </ul>

    <h2>efklejflkghejghjkldghgjl;lgd</h2>
    <p>oeakjsdklgjsdklghnasjdgn</p>
    <div class="snippets">
        {#each snippets as { title, desc, lang, gist, file }}
            {#await fetch(file).then((r) => r.text()) then raw}
                <div class="snippet" use:Prism.highlightAllUnder>
                    <h3>{title} <a target="_blank" href={gist}>[gist ↗]</a></h3>
                    <p>{@html desc}</p>
                    <pre><code class="language-{lang}">{raw}</code></pre>
                    <div class="tooltip">
                        <span>{raw.length}ch · {raw.split("\n").length}ln</span>
                        <span
                            class="copy"
                            role="button"
                            on:click={(ev) => {
                                navigator.clipboard.writeText(raw);
                                ev.target.innerHTML = "[<i>copied!</i>]";
                                setTimeout(() => {
                                    ev.target.innerHTML = "[copy]";
                                }, 2000);
                            }}
                        >
                            [copy]
                        </span>
                    </div>
                </div>
            {/await}
        {/each}
    </div>
</main>

<style>
    @import url("prismjs/themes/prism-tomorrow");

    main {
        width: calc(100vw - 40px);
        max-width: 1200pt;
        margin: auto;
        hyphens: auto;
    }

    .qa li::marker {
        content: "* ";
        font-family: "Fira Code", monospace;
    }
    .qa h3 {
        margin-bottom: 0.5em;
    }

    .snippets {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .snippet {
        max-width: 592pt;
    }
    .snippet p {
        min-height: 5em;
    }
    .snippet pre {
        line-height: 1;
        height: 400pt;
        box-sizing: border-box;
        margin: 0;
        background: rgba(100%, 100%, 100%, 5%);
    }
    .snippet pre code {
        font-size: 12pt;
        white-space: break-spaces;
        word-break: break-all;
    }

    .tooltip {
        background: rgba(100%, 100%, 100%, 10%);
        padding: 0.5em 1em;
        font-family: "Fira Code", monospace;
    }
    .tooltip .copy {
        float: right;
    }

    .copy {
        color: #fb69ad;
    }
    .copy:hover {
        color: #fb82bb;
        cursor: pointer;
    }
</style>
