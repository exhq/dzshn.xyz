<script>
    /** @type {string?}  */
    export let ref = null;
    /** @type {string?}  */
    export let note = null;
    /** @type {string?}  */
    export let href = null;
    /** @type {string?}  */
    export let title = null;
    export let external = false;
</script>

{#if external}
    <sup>[<i><a {href} {title}>{ref}</a></i>]</sup>
{:else if ref !== null}
    <sup><a href="#note-{ref}" id="ref-{ref}" {title}>[{ref}]</a></sup>
{:else if note !== null}
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
