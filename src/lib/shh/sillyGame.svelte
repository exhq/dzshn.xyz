<script lang="ts">
    import { onMount } from "svelte";
    import { SillyGame, Tile, HEIGHT, HALF_HEIGHT, WIDTH } from "./sillyGame";

    export let destroy: () => void;

    const game = new SillyGame();
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let height: number;
    let width: number;
    let tileSize: number;
    let winHeight: number;
    let winWidth: number;
    
    const personalBest = parseInt(localStorage.getItem("sillyGamePB") ?? "0");

    const keybinds: Record<string, () => void> = {
        Escape: () => { game.playing = false },
        KeyW: game.lockPiece.bind(game),
        KeyA: game.moveRelative.bind(game, +0, -1),
        KeyS: game.moveRelative.bind(game, +1, +0),
        KeyD: game.moveRelative.bind(game, +0, +1),
        KeyJ: game.rotate.bind(game, -1),
        KeyK: game.rotate.bind(game, +1),
        KeyQ: game.swap.bind(game),
    };

    function handleResize() {
        winHeight = window.innerHeight;
        winWidth = window.innerWidth;

        tileSize = Math.floor(
            Math.min(
                winHeight * 0.80 / (HALF_HEIGHT + 4), winWidth * 0.80 / WIDTH,
            )
        );
        height = tileSize * (HALF_HEIGHT + 4);
        width = tileSize * WIDTH;
    }

    function handleKey({ code }: KeyboardEvent) {
        const handler = keybinds[code];
        if (handler) {
            handler();
            game.level = game.level;
            game.queue = game.queue;
        }
    }

    function putTile(tile: 0 | 8 | Tile, x: number, y: number) {
        if (tile == 0 && x < HALF_HEIGHT) return;

        if (tile == 0) {
            ctx.fillStyle = "#050505";
        } else if (tile == 8) {
            ctx.fillStyle = "#f0f0f0";
        } else {
            ctx.fillStyle = "#" + ((tile + 7) * 0x11).toString(16).repeat(3);
        }
        ctx.fillRect(
            y * tileSize,
            (x - HALF_HEIGHT + 2) * tileSize,
            tileSize,
            tileSize,
        );
    }

    function renderCanvas() {
        game.tick();

        ctx.clearRect(0, 0, width, height);
        for (let i = HALF_HEIGHT - 2; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {
                putTile(game.board[i][j], i, j);
            }
        }

        let ghostX = game.piece.x;
        while (ghostX < HEIGHT) {
            if (game.overlaps({ ...game.piece, x: ghostX + 1 })) break;
            ghostX++;
        }

        for (const [x, y] of game.piece.tiles) {
            putTile(8, ghostX + x, game.piece.y + y);
            putTile(game.piece.type, game.piece.x + x, game.piece.y + y);
        }

        if (!game.playing) {
            if (game.score > personalBest) {
                localStorage.setItem("sillyGamePB", game.score.toString());
            }
            canvas.style.filter = "invert()";
            setTimeout(destroy, 500);
            return;
        }
        window.requestAnimationFrame(renderCanvas);
    }

    onMount(() => {
        const _ctx = canvas.getContext("2d");
        if (!_ctx) {
            destroy();
            throw new Error("no canvas :(");
        }
        ctx = _ctx;
        handleResize();
        window.requestAnimationFrame(renderCanvas);
    });
</script>

<svelte:window on:keydown={handleKey} on:resize={handleResize} />

<canvas
    bind:this={canvas} {height} {width}
    style:top="{(winHeight - height) / 2}px"
    style:left="{(winWidth - width) / 2}px"
/>

<pre
    id="hud"
    style:top="{(winHeight - height) / 2 + tileSize * 2}px"
    style:left="{(winWidth - width) / 2 + width}px"
>

<b>HOLD</b>
  {game.hold ? Tile[game.hold] : "empty"}

<b>QUEUE</b>
  {game.queue.slice(0, 4).map((x) => Tile[x]).join(" ")}

<b>BEST</b>
  {personalBest}

<b>SCORE</b>
  {game.score}

<b>LEVEL</b>
  {game.level}

</pre>

<style>
    canvas {
        position: absolute;
        mix-blend-mode: exclusion;
        pointer-events: none;
    }

    #hud {
        font-family: "Fira Code";
        background: #15151580;
        position: absolute;
        margin: 0;
        padding: 0 2ch;
    }
</style>
