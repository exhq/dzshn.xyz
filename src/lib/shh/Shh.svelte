<script>
    import { Tetris } from "$lib/shh/tetris.js";
    //@ts-expect-error
    import hand from "$lib/shh/hand.png";

    /** @typedef {ReturnType<typeof setTimeout>} Timeout */

    /** @type {string[]} */
    let keyBuffer = [];
    let uhm = false;
    /** @type {string} */
    //prettier-ignore
    $: uhh = uhm ? uhh : keyBuffer.reduce((p, x, i) => p + ("0" + (x.charCodeAt(0) ^ parseInt("6c69666520636f756c64206265206120647265616d".slice(i % 21 * 2, i % 21 * 2 + 2), 16)).toString(16)).slice(-2), "");
    /** @type {string?} */
    let tooltip = null;
    let tooltipOpen = false;

    /** @param {HTMLElement} _node */
    function shush(_node) {
        tooltip = null;
        tooltipOpen = false;
        uhm = true;
        return {
            destroy() {
                keyBuffer = [];
            },
        };
    }

    /** @param {HTMLCanvasElement} canvas */
    function tetris(canvas) {
        tooltip =
            "     swap ~ [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]\n" +
            "hard drop # [  ][~][#][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][   ] R rotate ccw\n" +
            "     left < [   ][<][V][>][ ][ ][ ][R][r][@][ ][ ][ ][  ] r rotate cw\n" +
            "soft drop v [    ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][    ] @ rotate 2x\n" +
            "    right > [ ][ ][ ][ ][                ][ ][ ][ ][ ][ ]";
        const game = new Tetris();
        /** @type {Set<string>} */
        const keys = new Set();

        const ctx = canvas.getContext("2d");
        if (ctx === null) return;

        /** @type {number} */
        let boardX;
        /** @type {number} */
        let boardY;
        /** @type {number} */
        let blockSize;
        /** @type {number} */
        let smallBlockSize;

        const resize = () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;

            blockSize = Math.floor((window.innerHeight * 0.8) / 22);
            smallBlockSize = Math.floor(blockSize / 2);
            boardX = Math.floor(window.innerWidth / 2 - blockSize * 5);
            boardY = Math.floor(window.innerHeight / 2 - blockSize * 13);
        };

        /** @type {Timeout} */
        let das;
        /** @type {Timeout} */
        let arr;
        /** @type {Timeout} */
        let sds;

        /** @param {KeyboardEvent} ev */
        const keydown = ({ code: k }) => {
            if (keys.has(k)) return; // no keydown; repeated event
            keys.add(k);

            if (k == "Escape") {
                game.playing = false;
            } else if (k == "KeyW") {
                game.lockPiece();
            } else if (k == "KeyA") {
                clearTimeout(das);
                clearTimeout(arr);
                game.moveRel(+0, -1);
                das = setTimeout(() => {
                    game.moveRel(+0, -1);
                    arr = setInterval(() => {
                        game.moveRel(+0, -1);
                    }, 100 / 3);
                }, 150);
            } else if (k == "KeyS") {
                game.moveRel(+1, +0);
                sds = setInterval(() => {
                    game.moveRel(+1, +0);
                }, 100 / 3);
            } else if (k == "KeyD") {
                clearTimeout(das);
                clearTimeout(arr);
                game.moveRel(+0, +1);
                das = setTimeout(() => {
                    game.moveRel(+0, +1);
                    arr = setInterval(() => {
                        game.moveRel(+0, +1);
                    }, 100 / 3);
                }, 150);
            } else if (k == "KeyJ") {
                game.rotate(-1);
            } else if (k == "KeyK") {
                game.rotate(+1);
            } else if (k == "KeyL") {
                game.rotate(+2);
            } else if (k == "KeyQ") {
                game.swap();
            }
        };
        /** @param {KeyboardEvent} ev */
        const keyup = ({ code: k }) => {
            keys.delete(k);
            if (k == "KeyA" || k == "KeyD") {
                clearTimeout(das);
                clearTimeout(arr);
            } else if (k == "KeyS") {
                clearTimeout(sds);
            }
        };

        const render = () => {
            game.tick();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#050505";
            ctx.fillRect(
                boardX,
                boardY + blockSize * 2,
                blockSize * 10,
                blockSize * 20
            );

            const board = game.playfield();
            for (let x = 0; x < 22; x++) {
                for (let y = 0; y < 10; y++) {
                    const i = board[x][y];
                    if (i == 0) continue;
                    if (i == 8) ctx.fillStyle = "#404040";
                    else
                        ctx.fillStyle =
                            "#" + (0x11 * (8 + i)).toString(16).repeat(3);
                    ctx.fillRect(
                        boardX + y * blockSize,
                        boardY + x * blockSize,
                        blockSize,
                        blockSize
                    );
                }
            }
            for (let i = 0; i < 4; i++) {
                const p = game.queue[i];
                const { minos } = game.spawnPiece(p);
                const offsetX = boardX + blockSize * 10 + smallBlockSize;
                const offsetY =
                    boardY +
                    blockSize * 2 +
                    smallBlockSize +
                    i * smallBlockSize * 4;
                for (const [dx, dy] of minos) {
                    ctx.fillStyle =
                        "#" + (0x11 * (8 + p)).toString(16).repeat(3);
                    ctx.fillRect(
                        offsetX + dy * smallBlockSize,
                        offsetY + dx * smallBlockSize,
                        smallBlockSize,
                        smallBlockSize
                    );
                }
            }
            if (game.hold) {
                const offsetX = boardX - smallBlockSize * 5;
                const offsetY = boardY + blockSize * 2 + smallBlockSize;
                ctx.fillStyle =
                    "#" + (0x11 * (8 + game.hold)).toString(16).repeat(3);
                for (const [dx, dy] of game.spawnPiece(game.hold).minos) {
                    ctx.fillRect(
                        offsetX + dy * smallBlockSize,
                        offsetY + dx * smallBlockSize,
                        smallBlockSize,
                        smallBlockSize
                    );
                }
            }
            if (!game.playing) {
                uhm = false;
                return;
            }
            window.requestAnimationFrame(render);
        };

        resize();
        window.requestAnimationFrame(render);
        window.addEventListener("keydown", keydown);
        window.addEventListener("keyup", keyup);
        window.addEventListener("resize", resize);

        return {
            destroy() {
                window.removeEventListener("keydown", keydown);
                window.removeEventListener("keyup", keyup);
                window.removeEventListener("resize", resize);
            },
        };
    }

    /** @param {HTMLElement} node */
    function something(node) {
        /** @param {KeyboardEvent} ev */
        const keydown = ({ key }) => {
            if (key == "z") uhm = false;
        };
        node.addEventListener("introend", () => {
            window.addEventListener("keydown", keydown);
        });
        return {
            destroy() {
                window.removeEventListener("keydown", keydown);
            },
        };
    }

    /** @param {HTMLElement} _node */
    const flash = (_node, {}) => ({ duration: 600, css: () => "filter: invert()" });

    /** @param {HTMLElement} node */
    function type(node, { delay = 48 }) {
        const text = node.textContent;
        if (text === null) throw "fish";
        return {
            duration: delay * text.length,
            /** @param {number} t */
            tick(t) {
                node.textContent = text.slice(0, Math.floor(t * text.length));
            },
        };
    }
</script>

<svelte:window
    on:keydown={({ key }) => {
        if (!uhm && key.match(/[a-z ?!,.\-]/)) {
            keyBuffer.push(key);
            keyBuffer = keyBuffer;
            setTimeout(() => {
                keyBuffer.shift();
                keyBuffer = keyBuffer;
            }, 2000);
        }
    }}
/>

{#if uhh == "180c12174910"}
    <canvas id="tetris" use:shush use:tetris out:flash />
{:else if uhh == "010c110a"}
    <div id="something" use:shush>
        <span in:type use:something>
            {window.atob("WW91IGtub3cgd2hhdCB5b3UgZGlkLg==")}
        </span>
        <img id="hand" src={hand} alt="" />
    </div>
{/if}
{#if uhm && tooltip}
    <pre
        class="tooltip"
        class:open-tooltip={tooltipOpen}
        aria-hidden="true"
        role="img"
        on:click={() => {
            tooltipOpen = !tooltipOpen;
        }}>{tooltipOpen ? tooltip : "what's this ????"}</pre>
{/if}

<style>
    @font-face {
        src: url("$lib/shh/OMORI_Left.ttf");
        font-family: "OMORI Left";
    }
    @font-face {
        src: url("$lib/shh/OMORI_Right.ttf");
        font-family: "OMORI Right";
    }
    #tetris {
        position: absolute;
        top: 0;
        left: 0;
        mix-blend-mode: exclusion;
        pointer-events: none;
    }
    #something {
        position: absolute;
        bottom: 16pt;
        left: 50%;
        transform: translateX(-50%);
        align-self: center;
        background: black;
        font-family: "OMORI Left";
        font-size: 36pt;
        padding: 0.2em 0.4em 0.5em;
        min-width: 14.3em;
        min-height: 1.5em;
        border: 2px solid white;
        margin: 0 auto;
    }
    #something #hand {
        position: absolute;
        bottom: 8pt;
        right: 8pt;
    }
    .tooltip {
        position: absolute;
        bottom: 0;
        left: 0;
        user-select: none;
        margin: 1ch;
        border-bottom: 2px dotted #808080;
    }
    .tooltip:hover {
        cursor: help;
    }
    .open-tooltip {
        border: none;
    }
</style>
