<script>
    export let ref = null;
    export let note = null;
    export let href = null;
    export let title = null;
    export let external = false;
</script>

{#if external}
    <sup>[<i><a {href} {title}>{ref}</a></i>]</sup>
{:else if ref}
    <sup><a href="#note-{ref}" id="ref-{ref}" {title}>[{ref}]</a></sup>
{:else if note}
    <div id="note-{note}"><a href="#ref-{note}">^</a> <slot /></div>
{/if}

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
    *:target {
        background: #fa50a040;
    }
</style>
