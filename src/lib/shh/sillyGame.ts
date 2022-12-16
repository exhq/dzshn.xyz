// "is that just an entire game of-"
// yes :3

interface Piece {
    type: Tile,
    x: number,
    y: number,
    r: number,
    tiles: [number, number][],
}

export enum Tile { I = 1, J, L, O, S, T, Z }

const SHAPES: Record<Tile, [number, number][][]> = {
    [Tile.I]: [
        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[0, 2], [1, 2], [2, 2], [3, 2]],
        [[2, 0], [2, 1], [2, 2], [2, 3]],
        [[0, 1], [1, 1], [2, 1], [3, 1]],
    ],
    [Tile.J]: [
        [[0, 0], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [0, 2], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [2, 2]],
        [[0, 1], [1, 1], [2, 0], [2, 1]],
    ],
    [Tile.L]: [
        [[0, 2], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
        [[1, 0], [1, 1], [1, 2], [2, 0]],
        [[0, 0], [0, 1], [1, 1], [2, 1]],
    ],
    [Tile.O]: [
        [[0, 1], [0, 2], [1, 1], [1, 2]],
        [[0, 1], [0, 2], [1, 1], [1, 2]],
        [[0, 1], [0, 2], [1, 1], [1, 2]],
        [[0, 1], [0, 2], [1, 1], [1, 2]],
    ],
    [Tile.S]: [
        [[0, 1], [0, 2], [1, 0], [1, 1]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
        [[1, 1], [1, 2], [2, 0], [2, 1]],
        [[0, 0], [1, 0], [1, 1], [2, 1]],
    ],
    [Tile.T]: [
        [[0, 1], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [1, 2], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [2, 1]],
    ],
    [Tile.Z]: [
        [[0, 0], [0, 1], [1, 1], [1, 2]],
        [[0, 2], [1, 1], [1, 2], [2, 1]],
        [[1, 0], [1, 1], [2, 1], [2, 2]],
        [[0, 1], [1, 0], [1, 1], [2, 0]],
    ],
};


type Kicks = Record<string, [number, number][]>

const KICKS: Kicks = {
    "0:1": [[+0, -1], [-1, -1], [+2, +0], [+2, -1]],
    "0:3": [[+0, +1], [-1, +1], [+2, +0], [+2, +1]],
    "1:0": [[+0, +1], [+1, +1], [-2, +0], [-2, +1]],
    "1:2": [[+0, +1], [+1, +1], [-2, +0], [-2, +1]],
    "2:1": [[+0, -1], [-1, -1], [+2, +0], [+2, -1]],
    "2:3": [[+0, +1], [-1, +1], [+2, +0], [+2, +1]],
    "3:0": [[+0, -1], [+1, -1], [-2, +0], [-2, -1]],
    "3:2": [[+0, -1], [+1, -1], [-2, +0], [-2, -1]],
};

const I_KICKS: Kicks = {
    "0:1": [[+0, -2], [+0, +1], [+1, -2], [-2, +1]],
    "0:3": [[+0, -1], [+0, +2], [-2, -1], [+1, +2]],
    "1:0": [[+0, +2], [+0, -1], [-1, +2], [+2, -1]],
    "1:2": [[+0, -1], [+0, +2], [-2, -1], [+1, +2]],
    "2:1": [[+0, +1], [+0, -2], [+2, +1], [-1, +2]],
    "2:3": [[+0, +2], [+0, -1], [-1, +2], [+2, -1]],
    "3:0": [[+0, +1], [+0, -2], [+2, +1], [-1, -2]],
    "3:2": [[+0, -2], [+0, +1], [+1, -2], [-2, +1]],
};

// yes, nes gravity with srs/guideline queue
const NES_GRAVITY_FRAMES: Record<number, number> = {
    29: 1,
    19: 2,
    16: 3,
    13: 4,
    10: 5,
    9: 6,
    8: 8,
    7: 13,
    6: 18,
    5: 23,
    4: 28,
    3: 33,
    2: 38,
    1: 43,
    0: 48,
};
const NES_GRAVITY_FRAMES_KEYS = Object.keys(NES_GRAVITY_FRAMES).map(x => parseInt(x)).sort((a, b) => b - a);

export const HEIGHT = 40;
export const HALF_HEIGHT = HEIGHT / 2;
export const WIDTH = 10;

export class SillyGame {
    playing: boolean;
    board: (Tile | 0)[][];
    queue: Tile[];
    piece: Piece;
    hold: Tile | null;
    holdLock: boolean;
    level: number;
    lastDrop: number;
    goal: number;
    lineClears: number;
    score: number;

    constructor() {
        this.playing = true;
        this.board = Array.from(Array(HEIGHT), () => Array.from(Array(WIDTH), () => 0));
        this.queue = [];
        this.fillQueue();
        this.piece = this.spawn(this.popQueue());
        this.hold = null;
        this.holdLock = false;
        this.level = 0;
        this.lastDrop = 0;
        this.goal = 10;
        this.lineClears = 0;
        this.score = 0;
    }

    fillQueue() {
        const bag = Array.from(Array(7), (_, i) => i + 1);
        while (bag.length) {
            this.queue.push(bag.splice(Math.floor(Math.random() * bag.length), 1)[0]);
        }
    }

    popQueue(): Tile {
        this.fillQueue();
        const piece = this.queue.shift();
        if (!piece) throw "fish";
        return piece;
    }

    spawn(type: Tile): Piece {
        let x = 18;
        const y = 3;
        const tiles = SHAPES[type][0];

        if (
            !this.overlaps({ x, y, tiles }) &&
            !this.overlaps({ x: x + 1, y, tiles })
        ) {
            x++;
        }

        return { type, x, y, r: 0, tiles };
    }

    overlaps(piece: Pick<Piece, "x" | "y" | "tiles">): boolean {
        for (const [x, y] of piece.tiles) {
            const px = x + piece.x;
            const py = y + piece.y;
            if (px < 0 || px >= HEIGHT) return true;
            if (py < 0 || py >= WIDTH) return true;
            if (this.board[px][py] != 0) return true;
        }
        return false;
    }

    lockPiece(): void {
        const piece = this.piece;
        while (piece.x < HEIGHT) {
            if (this.overlaps({ x: piece.x + 1, y: piece.y, tiles: piece.tiles })) {
                break;
            }
            piece.x++;
            this.score++;
        }

        for (const [x, y] of piece.tiles) {
            this.board[x + piece.x][y + piece.y] = piece.type;
        }

        if (piece.tiles.every(([x]) => piece.x + x < HEIGHT / 2)) {
            this.playing = false;
        }

        let lineClears = 0;
        for (let i = 0; i < HEIGHT; i++) {
            if (this.board[i].every(i => i > 0)) {
                this.board.splice(i, 1);
                this.board.unshift(Array.from(Array(WIDTH), () => 0));
                lineClears++;
            }
        }
        this.lineClears += lineClears;
        this.score += [0, 40, 100, 300, 1200][lineClears] * (this.level + 1);

        this.piece = this.spawn(this.popQueue());
        if (this.overlaps(this.piece)) {
            this.playing = false;
        }

        this.holdLock = false;

        if (this.lineClears >= this.goal) {
            this.level++;
            this.goal = this.lineClears + 10;
        }
    }

    swap(): void {
        if (this.holdLock) return;

        this.hold ??= this.popQueue();
        [this.hold, this.piece] = [this.piece.type, this.spawn(this.hold)];
        this.holdLock = true;
    }

    moveRelative(x: number, y: number): void {
        this.move(this.piece.x + x, this.piece.y + y);
    }

    move(x: number, y: number): void {
        const piece = this.piece;

        const xDir = x - piece.x < 0 ? -1 : 1;
        const yDir = y - piece.y < 0 ? -1 : 1;

        while (piece.x != x) {
            if (this.overlaps({ ...piece, x: piece.x + xDir})) {
                break;
            }
            piece.x += xDir;
            this.score++;
        }

        while (piece.y != y) {
            if (this.overlaps({ ...piece, y: piece.y + yDir})) {
                break;
            }
            piece.y += yDir;
        }
    }

    rotate(turns: number): void {
        const piece = this.piece;
        // no modulo?
        const r = ((piece.r + turns) % 4 + 4) % 4;
        const tiles = SHAPES[piece.type][r];

        if (!this.overlaps({ ...piece, tiles })) {
            piece.r = r;
            piece.tiles = tiles;
            return;
        }

        const table = piece.type == Tile.I ? I_KICKS : KICKS;

        for (const [x, y] of table[piece.r + ":" + r]) {
            if (!this.overlaps({ ...piece, tiles, x: piece.x + x, y: piece.y + y })) {
                piece.x += x;
                piece.y += y;
                piece.r = r;
                piece.tiles = tiles;
                return;
            }
        }
    }

    tick(): void {
        // thx @g3ner1c <https://github.com/dzshn/python-tetris/blob/main/tetris/impl/gravity.py#L112>

        let dropDelay = 0;
        for (const i of NES_GRAVITY_FRAMES_KEYS) {
            if (this.level >= i) {
                dropDelay = NES_GRAVITY_FRAMES[i] * (1000 / 60.0988);
                break;
            }
        }

        const now = performance.now();
        const sinceDrop = now - this.lastDrop;
        if (sinceDrop >= dropDelay) {
            if (this.overlaps({ ...this.piece, x: this.piece.x + 1 })) {
                this.lockPiece();
            } else {
                const score = this.score;
                this.moveRelative(1, 0);
                this.score = score;
            }
            this.lastDrop = now;
        }
    }
}
