// @ts-check

/** @enum {number} */
export const PieceType = Object.freeze({
    I: 1,
    J: 2,
    L: 3,
    O: 4,
    S: 5,
    T: 6,
    Z: 7,
});

/**
 * @typedef {[number, number]} Coord
 *
 * @typedef {Object} Piece
 * @prop {PieceType} type
 * @prop {number} x
 * @prop {number} y
 * @prop {number} r
 * @prop {Coord[]} minos
 *
 * @typedef {number[][]} Board
 */

/** @type Record<PieceType, Coord[][]> */
// prettier-ignore
const shapes = {
    [PieceType.I]: [
        [ [1, 0], [1, 1], [1, 2], [1, 3], ],
        [ [0, 2], [1, 2], [2, 2], [3, 2], ],
        [ [2, 0], [2, 1], [2, 2], [2, 3], ],
        [ [0, 1], [1, 1], [2, 1], [3, 1], ],
    ],
    [PieceType.L]: [
        [ [0, 2], [1, 0], [1, 1], [1, 2], ],
        [ [0, 1], [1, 1], [2, 1], [2, 2], ],
        [ [1, 0], [1, 1], [1, 2], [2, 0], ],
        [ [0, 0], [0, 1], [1, 1], [2, 1], ],
    ],
    [PieceType.J]: [
        [ [0, 0], [1, 0], [1, 1], [1, 2], ],
        [ [0, 1], [0, 2], [1, 1], [2, 1], ],
        [ [1, 0], [1, 1], [1, 2], [2, 2], ],
        [ [0, 1], [1, 1], [2, 0], [2, 1], ],
    ],
    [PieceType.S]: [
        [ [0, 1], [0, 2], [1, 0], [1, 1], ],
        [ [0, 1], [1, 1], [1, 2], [2, 2], ],
        [ [1, 1], [1, 2], [2, 0], [2, 1], ],
        [ [0, 0], [1, 0], [1, 1], [2, 1], ],
    ],
    [PieceType.Z]: [
        [ [0, 0], [0, 1], [1, 1], [1, 2], ],
        [ [0, 2], [1, 1], [1, 2], [2, 1], ],
        [ [1, 0], [1, 1], [2, 1], [2, 2], ],
        [ [0, 1], [1, 0], [1, 1], [2, 0], ],
    ],
    [PieceType.T]: [
        [ [0, 1], [1, 0], [1, 1], [1, 2], ],
        [ [0, 1], [1, 1], [1, 2], [2, 1], ],
        [ [1, 0], [1, 1], [1, 2], [2, 1], ],
        [ [0, 1], [1, 0], [1, 1], [2, 1], ],
    ],
    [PieceType.O]: [
        [ [0, 1], [0, 2], [1, 1], [1, 2], ],
        [ [0, 1], [0, 2], [1, 1], [1, 2], ],
        [ [0, 1], [0, 2], [1, 1], [1, 2], ],
        [ [0, 1], [0, 2], [1, 1], [1, 2], ],
    ],
};

/** @typedef {Record<number, Coord[]>} KickTable */

/** @type {KickTable} */
// prettier-ignore
const kickTable = {
    // a, b -> kickTable for a = initial and b = final rotation
    0b00_01: [ [+0, -1], [-1, -1], [+2, +0], [+2, -1], ],
    0b00_11: [ [+0, +1], [-1, +1], [+2, +0], [+2, +1], ],
    0b01_00: [ [+0, +1], [+1, +1], [-2, +0], [-2, +1], ],
    0b01_10: [ [+0, +1], [+1, +1], [-2, +0], [-2, +1], ],
    0b10_01: [ [+0, -1], [-1, -1], [+2, +0], [+2, -1], ],
    0b10_11: [ [+0, +1], [-1, +1], [+2, +0], [+2, +1], ],
    0b11_00: [ [+0, -1], [+1, -1], [-2, +0], [-2, -1], ],
    0b11_10: [ [+0, -1], [+1, -1], [-2, +0], [-2, -1], ],
    // 180° kicktable from TETR.IO
    0b00_10: [ [-1, +0], [-1, +1], [-1, -1], [+0, +1], [+0, -1], ],
    0b01_11: [ [+0, +1], [-2, +1], [-1, +1], [-2, +0], [-1, +0], ],
    0b10_00: [ [+1, +0], [+1, -1], [+1, +1], [+0, -1], [+0, +1], ],
    0b11_01: [ [+0, -1], [-2, -1], [-1, -1], [-2, +0], [-1, +0], ],
};

/** @type {KickTable} */
// prettier-ignore
const kickTableI = {
    0b00_01: [ [+0, -1], [+0, +1], [+1, -2], [-2, +1], ],
    0b00_11: [ [+0, -1], [+0, +2], [-2, -1], [+1, +2], ],
    0b01_00: [ [+0, +2], [+0, -1], [-1, +2], [+2, -1], ],
    0b01_10: [ [+0, -1], [+0, +2], [-2, -1], [+1, +2], ],
    0b10_01: [ [+0, +1], [+0, -2], [+2, +1], [-1, +2], ],
    0b10_11: [ [+0, +2], [+0, -1], [-1, +2], [+2, -1], ],
    0b11_00: [ [+0, +1], [+0, -2], [+2, +1], [-1, -2], ],
    0b11_10: [ [+0, -2], [+0, +1], [+1, -2], [-2, +1], ],
    0b00_10: [ [-1, +0], [-1, +1], [-1, -1], [+0, +1], [+0, -1], ],
    0b01_11: [ [+0, +1], [-2, +1], [-1, +1], [-2, +0], [-1, +0], ],
    0b10_00: [ [+1, +0], [+1, -1], [+1, +1], [+0, -1], [+0, +1], ],
    0b11_01: [ [+0, -1], [-2, -1], [-1, -1], [-2, +0], [-1, +0], ],
};

/**
 * @param {Board} board
 * @param {Pick<Piece, "x" | "y" | "minos">} piece
 * @returns {boolean}
 */
function overlaps(board, { x, y, minos }) {
    for (let [dx, dy] of minos) {
        let mx = x + dx;
        let my = y + dy;
        if (mx < 0 || mx >= 22 || my < 0 || my >= 10) return true;
        if (board[mx][my]) return true;
    }
    return false;
}

export class Tetris {
    constructor() {
        /** @type {Board} */
        this.board = new Array(22).fill(0).map(() => new Array(10).fill(0));
        /** @type {PieceType[]} */
        this.queue = [];
        this.refillQueue();
        this.piece = this.spawnPiece(this.popQueue());
        /** @type {PieceType?} */
        this.hold = null;
        this.holdLock = false;
        this.level = 1;
        this.lineClears = 0;
        this.playing = true;
        this.isIdle = false;
        this.lastDrop = this.lastInput = performance.now();
        this.lockResets = 0;
    }

    /** @private */
    refillQueue() {
        let bag = [1, 2, 3, 4, 5, 6, 7];
        while (bag.length) {
            this.queue.push(
                ...bag.splice(Math.floor(Math.random() * bag.length), 1)
            );
        }
    }

    /** @private @returns {PieceType} */
    popQueue() {
        if (this.queue.length < 7) this.refillQueue();
        return this.queue.splice(0, 1)[0];
    }

    /**
     * @param {Pick<Piece, "x" | "y" | "minos">} piece
     * @returns {boolean}
     */
    overlaps({ x, y, minos }) {
        return overlaps(this.board, { x, y, minos });
    }

    /** @param {PieceType} type @returns {Piece} */
    spawnPiece(type) {
        return { type, x: 0, y: 3, r: 0, minos: shapes[type][0] };
    }

    /** @returns {Board} */
    playfield() {
        const board = [...this.board].map((x) => [...x]);
        const piece = this.piece;
        let ghostX = piece.x;
        for (let x = piece.x; x < 22; x++) {
            if (overlaps(board, { ...piece, x })) break;
            ghostX = x;
        }
        for (let [dx, dy] of piece.minos) {
            board[ghostX + dx][piece.y + dy] = 8;
            board[piece.x + dx][piece.y + dy] = piece.type;
        }
        return board;
    }

    lockPiece() {
        if (!this.playing) return;

        const piece = this.piece;

        for (let x = piece.x + 1; x < 22; x++) {
            if (this.overlaps({ ...piece, x })) break;
            piece.x = x;
        }
        if (piece.minos.every(([dx]) => piece.x + dx < 2)) this.playing = false;

        for (let [dx, dy] of piece.minos) {
            this.board[piece.x + dx][piece.y + dy] = piece.type;
        }

        for (let i = 0; i < 22; i++) {
            if (this.board[i].every((x) => x)) {
                this.board.splice(i, 1);
                this.board.splice(0, 0, new Array(10).fill(0));
                this.lineClears++;
            }
        }
        this.level = Math.floor(this.lineClears / 10);

        this.piece = this.spawnPiece(this.popQueue());

        if (this.overlaps(this.piece)) {
            this.playing = false;
        }

        this.holdLock = false;
        this.isIdle = false;
        this.lockResets = 0;
    }

    tick() {
        const now = performance.now();
        if (
            (this.isIdle && now - this.lastInput >= 500) ||
            this.lockResets >= 15
        ) {
            this.lockPiece();
            return;
        }

        const dropDelay =
            (0.8 - (this.level - 1) * 0.007) ** (this.level - 1) * 1000;
        const sinceDrop = now - this.lastDrop;
        if (sinceDrop >= dropDelay) {
            this.moveRel(Math.floor(sinceDrop / dropDelay), 0, true);
            this.lastDrop = now;
        }
    }

    /** @param {number} toX @param {number} toY */
    move(toX, toY, _auto = false) {
        if (!this.playing) return;

        const piece = this.piece;
        const fromX = piece.x;
        const fromY = piece.y;

        const dirX = toX > fromX ? 1 : -1;
        for (let x = fromX; x != toX + dirX; x += dirX) {
            if (this.overlaps({ ...piece, x })) break;
            piece.x = x;
        }
        const dirY = toY > fromY ? 1 : -1;
        for (let y = fromY; y != toY + dirY; y += dirY) {
            if (this.overlaps({ ...piece, y })) break;
            piece.y = y;
        }

        this.lastInput = performance.now();
        if (this.isIdle && !_auto) {
            this.lockResets++;
        }
        if (!this.isIdle && this.overlaps({ ...piece, x: piece.x + 1 })) {
            this.isIdle = true;
        }
    }

    /** @param {number} x @param {number} y */
    moveRel(x, y, _auto = false) {
        this.move(this.piece.x + x, this.piece.y + y, _auto);
    }

    /** @param {number} r */
    rotate(r) {
        const piece = this.piece;
        const rr = (((piece.r + r) % 4) + 4) % 4; // total mod 4
        const minos = shapes[piece.type][rr];
        if (!this.overlaps({ ...piece, minos })) {
            piece.r = rr;
            piece.minos = minos;
            return;
        }
        const table = piece.type == PieceType.I ? kickTableI : kickTable;
        const kicks = table[piece.r * 4 + rr];
        for (const [dx, dy] of kicks) {
            if (!this.overlaps({ x: dx + piece.x, y: dy + piece.y, minos })) {
                piece.x += dx;
                piece.y += dy;
                piece.r = rr;
                piece.minos = minos;
                break;
            }
        }

        if (this.isIdle) {
            this.lastInput = performance.now();
            this.lockResets++;
        }
        if (!this.isIdle && this.overlaps({ ...piece, x: piece.x + 1 })) {
            this.isIdle = true;
            this.lastInput = performance.now();
        }
    }

    swap() {
        if (this.holdLock) return;

        if (this.hold === null) {
            [this.hold, this.piece] = [
                this.piece.type,
                this.spawnPiece(this.popQueue()),
            ];
        } else {
            [this.hold, this.piece] = [
                this.piece.type,
                this.spawnPiece(this.hold),
            ];
        }

        this.holdLock = true;
    }
}
