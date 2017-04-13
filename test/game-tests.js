const assert = require("assert");
const Tile = require("../models/tile");
const Board = require("../models/board");
const BoardMove = require("../models/board-move");

let performGameTest = (board, startTile) => {
    console.log(`Input:\n${board.toString()}`);
    if (Array.isArray(board)) board = new Board(board);
    let opponent = startTile == Tile.X ? Tile.O : Tile.X;
    let iteration = 0;
    while (!board.isFull()) {
        iteration++;
        let player = iteration % 2 != 0 ? startTile : opponent;
        let pivot = BoardMove.selectBestMove(board, player);
        if (pivot) board.play(player, pivot.y, pivot.x);
        console.log(`Play ${iteration}:\n${JSON.stringify(board.getState())}`);
        console.log(board.toString());
    }
}

describe("Test Full 3x3 Game From Scratch", function () {
    it("should play a full game", function () {
        const emptyBoard = new Board(3);
        console.log(emptyBoard.toString());
        performGameTest(emptyBoard, Tile.X);
    })
})

describe("Test Full 6x6 Game From Scratch", function () {
    it("should play a full game", function () {
        const emptyBoard = new Board(6);
        console.log(emptyBoard.toString());
        performGameTest(emptyBoard, Tile.O);
    })
})

describe("Test Full 9x9 Game From Scratch", function () {
    it("should play a full game", function () {
        const emptyBoard = new Board(9);
        console.log(emptyBoard.toString());
        return new Promise(function (resolve) {
            performGameTest(emptyBoard, Tile.X);
            assert.ok(true);
            resolve();
        })
    })
})