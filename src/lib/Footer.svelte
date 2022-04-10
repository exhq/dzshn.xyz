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
    <span>(under construction!)</span>
</footer>

<style>
    footer {
        color: #a0a0a0;
        font-family: "Fira Code", monospace;
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
