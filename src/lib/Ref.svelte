<script>
    export let ce = false;
    export let cn = false;
    export let explain = false;

    let href, title, text;

    if (ce) {
        href = "https://en.wikipedia.org/wiki/Portal:Current_events";
        title =
            "This statement refers to current events and needs references to newer reliable sources.";
        text = "may be outdated";
    } else if (cn) {
        href = "https://en.wikipedia.org/wiki/Wikipedia:Citation_needed";
        title = "This claim needs references to reliable sources.";
        text = "citation needed";
    } else if (explain) {
        href = "https://en.wikipedia.org/wiki/Wikipedia:Please_clarify";
        title = "The text near this tag needs further explanation.";
        text = "further explanation needed";
    }
</script>

<wbr /><sup>[<i><a target="_blank" {href} {title}>{text}</a></i>]</sup>

<style>
    sup {
        font-size: 12pt;
        line-height: 1;
        white-space: nowrap;
    }
    a {
        color: #fb69ad;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
