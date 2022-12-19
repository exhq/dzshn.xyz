<script lang="ts">
    /* cat folow mouse (real) (now in svelte)
     *
     * based on ariana's oneko.js: <https://github.com/adryd325/oneko.js> 
     * original code is MIT licensed: <https://github.com/adryd325/oneko.js/blob/main/LICENSE>
     */

    import onekoGif from "$lib/oneko.gif";

    const nekoSpeed = 10;
    const spriteSets: Record<string, [number, number][]> = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratch: [[-5, 0], [-6, 0], [-7, 0]],
        tired: [[-3, -2]],
        sleeping: [[-2, 0], [-2, -1]],
        N: [[-1, -2], [-1, -3]],
        NE: [[0, -2], [0, -3]],
        E: [[-3, 0], [-3, -1]],
        SE: [[-5, -1], [-5, -2]],
        S: [[-6, -3], [-7, -2]],
        SW: [[-5, -3], [-6, -1]],
        W: [[-4, -2], [-4, -3]],
        NW: [[-1, 0], [-1, -1]],
    };

    let backgroundPosition: string;
    let currentFrame = 0;
    let frames = spriteSets.idle;

    let posX = 32;
    let posY = 32;

    let mousePosY = 0;
    let mousePosX = 0;

    let idleAnimation: string | null = null;
    let idleTime = 0;
    let idleAnimationFrame = 0;

    $: {
        const [x, y] = frames[currentFrame % frames.length];
        backgroundPosition = `${x * 32}px ${y * 32}px`;
    }

    function handleMouse({ clientX, clientY }: MouseEvent) {
        mousePosX = clientX;
        mousePosY = clientY;
    }

    function setSprite(name: string, frame: number) {
        frames = spriteSets[name];
        currentFrame = frame;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime++;

        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            idleAnimation = Math.random() > 0.5 ? "sleeping" : "scratch";
        }
    
        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                }
                break;
            case "scratch":
                setSprite("scratch", idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame++;
    }

    setInterval(() => {
        currentFrame++;
        const diffX = posX - mousePosX;
        const diffY = posY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < 48) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            idleTime = Math.min(idleTime, 7);
            idleTime--;
            return;
        }

        let direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";

        setSprite(direction, currentFrame);

        posX -= (diffX / distance) * nekoSpeed;
        posY -= (diffY / distance) * nekoSpeed;
    }, 100);
</script>

<svelte:window on:mousemove={handleMouse} />

<div
    id="oneko"
    style:background-image="url({onekoGif})"
    style:background-position={backgroundPosition}
    style:left="{posX - 16}px"
    style:top="{posY - 16}px"
/>

<style>
    #oneko {
        width: 32px;
        height: 32px;
        position: fixed;
        image-rendering: pixelated;
    }
</style>
