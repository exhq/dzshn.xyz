<script>
    export let cn = false;
    export let cei = false;
    export let explain = false;
</script>

<sup>
    {#if cei}
        [<i
            ><a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Portal:Current_events"
                title="This statement refers to current events and needs references to newer reliable sources."
                >may be outdated</a
            ></i
        >]
    {:else if cn}
        [<i
            ><a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Wikipedia:Citation_needed"
                title="This claim needs references to reliable sources."
                >citation needed</a
            ></i
        >]
    {:else if explain}
        [<i
            ><a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Wikipedia:Please_clarify"
                title="The text near this tag needs further explanation."
                >further explanation needed</a
            ></i
        >]
    {:else}
        [<slot />]
    {/if}
</sup>

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
