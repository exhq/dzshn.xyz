<script>
    import oh from "$lib/assets/misery.png";
</script>

<main>
    <h1>404 &gt;~&lt;</h1>
    <span>this page isn't real. <a href="/">go home?</a></span>
    <img src={oh} alt="oh the misery" id="oh" />
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap");

    :root {
        background: #151515;
        color: #e0e0e0;
        font-family: "Fira Code", monospace;
        font-size: 16pt;
    }

    main {
        margin: auto;
        width: calc(100vw - 40px);
    }

    h1 {
        border-bottom: 4px dotted #fa50a0;
        padding: 20px 2px 0px;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
    }

    a {
        color: #fb69ad;
        text-decoration: none;
    }

    a:hover {
        color: #fb82bb;
    }

    #oh {
        image-rendering: pixelated;
        position: absolute;
        bottom: 20px;
        left: 20px;
        height: calc(100vh - 10em);
        width: calc(100vw - 40px);
    }
</style>
