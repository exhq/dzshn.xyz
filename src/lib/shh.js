import { Tetris } from "$lib/tetris.js";

/** @typedef {ReturnType<typeof setTimeout>} Timeout */

/** @type {string[]} */
const keyBuffer = [];
let gayming = false;

/** @param {KeyboardEvent} ev */
export function keydown(ev) {
    if (gayming) return;

    if (ev.key.match(/[a-z ?!,.\-]/)) {
        keyBuffer.push(ev.key);
        setTimeout(() => {
            keyBuffer.shift();
        }, 2000);
    }

    const uhm = keyBuffer.reduce(
        (p, x, i) =>
            p +
            (
                "0" +
                (
                    x.charCodeAt(0) ^
                    [
                        0x6c, 0x69, 0x66, 0x65, 0x20, 0x63, 0x6f, 0x75, 0x6c,
                        0x64, 0x20, 0x62, 0x65, 0x20, 0x61, 0x20, 0x64, 0x72,
                        0x65, 0x61, 0x6d,
                    ][i % 21]
                ).toString(16)
            ).slice(0, 2),
        ""
    );
    if (uhm == "010c01010401") tetris();
}

function tetris() {
    /** @type {Set<string>} */
    const keys = new Set();
    const game = new Tetris();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    canvas.style.position = "absolute";
    canvas.style.top = canvas.style.right = "0";
    canvas.style.mixBlendMode = "exclusion";
    canvas.style.pointerEvents = "none";

    document.body.appendChild(canvas);
    gayming = true;

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
    resize();

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
                ctx.fillStyle = "#" + (0x11 * (8 + p)).toString(16).repeat(3);
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
            window.removeEventListener("keydown", keydown);
            window.removeEventListener("keyup", keyup);
            window.removeEventListener("resize", resize);
            canvas.style.filter = "invert()";
            setTimeout(() => {
                canvas.remove();
            }, 800);
            gayming = false;
            return;
        }
        window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    window.addEventListener("resize", resize);
}
