<script lang="ts">
    import Prism from "prismjs";
    import "prismjs/components/prism-python";

    interface Snippet {
        file: string,
        desc: string,
        lang: string,
        gistId: string,
    }

    function getGistLink(gistId: string): string {
        return "https://gist.github.com/dzshn/" + gistId;
    }

    async function fetchRawGist(gistId: string, file: string): Promise<string> {
        return fetch(`https://gist.githubusercontent.com/dzshn/${gistId}/raw/${file}`).then((r) => r.text());
    }

    const snippets: Snippet[] = [
        {
            file: "hewwo.py",
            desc: `
                <code class="language-python">print("hewwo world :3")</code> in 912 cryptic lines :3 <br />
                it only works on *nix and cpython-based interpreters. that's all you need to know.
            `,
            lang: "python",
            gistId: "1b8853023f364dc559c2b11c6a5f38b7",
        },
        {
            file: "mutable_code.py",
            desc: `
                making this code <a target="_blank" href="https://imgur.com/G31jFFa">managed to kill an immortal object</a>
            `,
            lang: "python",
            gistId: "476137824c14fc66677ec39099d6cf33",
        },
        {
            file: "Q_rsqrt.py",
            desc: `
                Quake's Fast inverse square root in inlined python bytecode. <br />
                the comment is a lie, I am not sorry.
            `,
            lang: "python",
            gistId: "72cd5e81e7fc500f397cf5b029b16199",
        },
        {
            file: "tetr.py",
            desc: `
                full<abbr title="not quite">*</abbr> guideline tetris ncurses TUI in one comically large line
            `,
            lang: "python",
            gistId: "a26fd2c78a60765b826c2e16aa02c3d2",
        },
        {
            file: "gol.py",
            desc: `
                conway's game of life one-liner. animates within a terminal <br />
            `,
            lang: "python",
            gistId: "a195ca06f9478db46e0c4fb1fe56419e",
        },
        {
            file: "m.2.py",
            desc: `
                mandelbrot in a 4x69 chunk of characters (laid out as diagonal stripes for readability)
            `,
            lang: "python",
            gistId: "b271f6c9f1ce624cf87a03342898a827",
        },
        {
            file: "mmmm.py",
            desc: `
                python formatting at it's finest
            `,
            lang: "python",
            gistId: "c3530bee0dd89312aab1638bd2953da5",
        },
        {
            file: "21.py",
            desc: `
                patch python so 9 + 10 is correct
            `,
            lang: "python",
            gistId: "8b57cc6f2984ed2dc422171d4a8f42e7",
        },
        {
            file: "m.py",
            desc: `
                a bit of sillying with a simple mandelbrot code. actually the first snippet here
            `,
            lang: "python",
            gistId: "6ec24800669595b7ce5ce680cd9f55b8",
        },
    ];

    function highlight(node: HTMLElement) {
        Prism.highlightAllUnder(node);
    }

    function handleCopy(text: string, event: Pick<PointerEvent | KeyboardEvent, "target">) {
        const target = event.target as HTMLSpanElement;
        navigator.clipboard.writeText(text);
        target.innerHTML = "copied!";
        setTimeout(() => { target.innerHTML = "copy" }, 2000);
    }
</script>

<svelte:head>
    <title>hell</title>
    <meta name="og:title" content="hell" />
    <meta name="og:description" content="import ctypes jumpscare" />
</svelte:head>

<main>
    <h1>Welcome to hell!!!</h1>
    <p>
        some days I wake up feeling extra evil. the result is terrifying <br />

        for non-interactive snippets, I recommend <a href="https://wandbox.org" target="_blank" rel="noreferrer">wandbox</a>
        (specially if you're not a fan of running unknown, obfuscated code from a stranger)
    </p>
    <ul>
        <li>
            <b>was [x] snippet automated?</b> <br />
            no, none of them are :3
        </li>
        <li>
            <b>why?</b> <br />
            why not?
        </li>
        <li>
            <b>please explod</b> <br />
            <a href="https://github.com/dzshn/is-even/blob/62676c3/is_even/__init__.py#L104-L123" target="_blank" rel="noreferrer">
                here you go
            </a>
        </li>
    </ul>
    <div>
        {#each snippets as { file, desc, gistId, lang }}
            {#await fetchRawGist(gistId, file) then raw}
                <div class="snippet" use:highlight>
                    <div>
                        <a href={getGistLink(gistId)}><b>{file}</b></a> : {lang} <br>
                        <span class="snippet-decor">{"~".repeat(file.length + lang.length + 3)}</span>
                    </div>
                    <div class="snippet-desc">{@html desc}</div>
                    <pre><code class="language-{lang}">{raw}</code></pre>
                    <div class="snippet-bottom">
                        <span class="snippet-char">{raw.split("\n").length} ln : {raw.length} ch</span>
                        <span class="snippet-copy" role="button" on:click={handleCopy.bind(null, raw)} on:keypress={handleCopy.bind(null, raw)}>copy</span>
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
        max-width: 1200px;
        margin: auto;
        margin-bottom: 40pt;
    }

    .snippet {
        font-family: "Fira Code", monospace;
        margin-bottom: 2rem;
    }

    .snippet pre {
        min-height: 16rem;
        height: 21rem;
        margin: 0;
        resize: vertical;
    }

    .snippet-desc {
        margin: 1rem 0;
    }

    .snippet-decor {
        color: #a0a0a0;
    }

    .snippet-bottom {
        background: #202020;
        color: #151515;
    }

    .snippet-char {
        padding: 0 1ch;
        background: #f0f0f0;
    }

    .snippet-copy {
        cursor: pointer;
        float: right;
        padding: 0 1ch;
        background-color: #fc9ac8;
    }
</style>
