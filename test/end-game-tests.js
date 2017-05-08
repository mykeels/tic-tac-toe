const assert = require("assert");
const Tile = require("../models/tile");
const Board = require("../models/board");
const BoardMove = require("../models/board-move");

describe("Detect that a user has won", function () {
    it("should play a full game", function () {
        const emptyBoard = new Board(3);
        console.log(emptyBoard.toString());
        performGameTest(emptyBoard, Tile.X);
    })
})