<svelte:head>
    <title>my system - dzshn.xyz</title>
    <meta name="og:title" content="Talk:dzshn.xyz" />
    <meta name="og:description" content="yes i use arch and yes i will explod" />
</svelte:head>

<main>
    <a id="back" href="/"><i>let me out!!</i></a>
    <h1>me system</h1>
    <ul id="fetch">
        <li>
            <b>OS</b>: Bedrock Linux 0.7.28 Poki
            <ul>
                <li><b>Arch Linux</b>: ~2000 packages</li>
                <li><b>Debian Bookworm/Sid</b>: ~1000 packages</li>
            </ul>
        </li>
        <li><b>Kernel</b>: linux zen 6.0.12</li>
        <li><b>Host</b>: some old ThinkPad</li>
        <li><b>Shell</b>: zsh (yes)</li>
        <li><b>WM</b>: sway</li>
        <li><b>Terminal</b>: kitty</li>
        <li><b>Theme</b>: Catppuccin, everywhere</li>
        <li><b>Editor</b>: neovim, previously <a href="https://helix-editor.com">helix</a></li>
    </ul>

    <a href="https://github.com/dzshn/dots">steal my dotfiles here</a>

    <img
        id="screenshot"
        src="https://rawcdn.githack.com/dzshn/dots/e1054c133cbcea8fb3ce8d1215e05960abc8eb36/screenshot_sway.png"
        alt="screenshot of my desktop. notably there is a terminal running tetris, another running neovim, and another running neofetch"
    >
</main>

<style>
    main {
        width: calc(100vw - 40px);
        max-width: 1200px;
        margin: auto;
        margin-bottom: 40pt;
    }

    #back {
        margin-top: 1rem;
        float: right;
        font-family: "Noto Sans", sans-serif;
    }
    #back::before {
        content: "← ";
        color: #a0a0a0;
    }

    #fetch {
        font-family: "Fira Code", monospace;
        color: #e0e0e0;
    }
    #fetch ul {
        padding-left: 2ch;
    }
    #fetch b, #fetch a {
        color: #a0a0a0;
    }

    #screenshot {
        width: 100%;
        margin-top: 2rem;
    }
</style>
