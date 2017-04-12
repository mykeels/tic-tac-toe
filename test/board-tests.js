const assert = require("assert");
const Board = require("../models/board");
const BoardState = require("../models/board-state");
// const BoardMove = require("../models/board-move");
// const Game = require("../models/game");
// const Pivot = require("../models/pivot");
// const Tile = require("../models/tile");

describe("Test That Width And Height Are Same", function () {
    let board = new Board(3);
    it("should have equal width and height", function () {
        assert.equal(board.width(), board.height())
    })
})

describe("Test That Board Is Empty", function () {
    const emptyBoardData = require("../data/board/empty-board.json");
    it("should have equal width and height", function () {
        assert.notEqual(emptyBoardData, null);
        assert.notEqual(emptyBoardData, "");
        let board = new Board(emptyBoardData);
        assert.equal(board.isEmpty(), true);
        assert.equal(board.isValid(), true);
        assert.equal(board.getState().xWinCount, 0);
        assert.equal(board.getState().oWinCount, 0);
    })
})