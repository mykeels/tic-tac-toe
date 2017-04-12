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
    it("should be empty and in default state", function () {
        assert.notEqual(emptyBoardData, null);
        assert.notEqual(emptyBoardData, "");
        let board = new Board(emptyBoardData);
        assert.equal(board.isEmpty(), true);
        assert.equal(board.isValid(), true);
        assert.equal(board.getState().xWinCount, 0);
        assert.equal(board.getState().oWinCount, 0);
    })
})

/**X Player Tests **/
describe("Test That Player X Wins On Right of 3x3 Board", function () {
    const xRightWinData = require("../data/scores/x-right-win.json");
    it("should win via right side of the board", function () {
        assert.notEqual(xRightWinData, null);
        assert.notEqual(xRightWinData, "");
        let board = new Board(xRightWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

describe("Test That Player X Wins On Bottom of 3x3 Board", function () {
    const xWinData = require("../data/scores/x-bottom-win.json");
    it("should win via bottom side of the board", function () {
        assert.notEqual(xWinData, null);
        assert.notEqual(xWinData, "");
        let board = new Board(xWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

describe("Test That Player X Wins On Top of 3x3 Board", function () {
    const xWinData = require("../data/scores/x-top-win.json");
    it("should win via top side of the board", function () {
        assert.notEqual(xWinData, null);
        assert.notEqual(xWinData, "");
        let board = new Board(xWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

describe("Test That Player X Wins On Left Diagonal of 3x3 Board", function () {
    const xWinData = require("../data/scores/x-left-diagonal-win.json");
    it("should win via left diagonal side of the board", function () {
        assert.notEqual(xWinData, null);
        assert.notEqual(xWinData, "");
        let board = new Board(xWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

describe("Test That Player X Wins On Right Diagonal of 3x3 Board", function () {
    const xWinData = require("../data/scores/x-right-diagonal-win.json");
    it("should win via right diagonal side of the board", function () {
        assert.notEqual(xWinData, null);
        assert.notEqual(xWinData, "");
        let board = new Board(xWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

describe("Test That Player X Wins On Middle Vertical Side of 3x3 Board", function () {
    const xWinData = require("../data/scores/x-middle-vertical-win.json");
    it("should win via middle vertical side of the board", function () {
        assert.notEqual(xWinData, null);
        assert.notEqual(xWinData, "");
        let board = new Board(xWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

describe("Test That Player X Wins On Middle Horizontal Side of 3x3 Board", function () {
    const xWinData = require("../data/scores/x-middle-horizontal-win.json");
    it("should win via middle horizontal side of the board", function () {
        assert.notEqual(xWinData, null);
        assert.notEqual(xWinData, "");
        let board = new Board(xWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 1);
        assert.equal(state.oWinCount, 0);
    })
})

/**O Player Tests **/
describe("Test That Player O Wins On Right of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-right-win.json");
    it("should win via right side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})

describe("Test That Player O Wins On Bottom of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-bottom-win.json");
    it("should win via bottom side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})

describe("Test That Player O Wins On Top of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-top-win.json");
    it("should win via top side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})

describe("Test That Player O Wins On Left Diagonal of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-left-diagonal-win.json");
    it("should win via left diagonal side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})

describe("Test That Player O Wins On Right Diagonal of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-right-diagonal-win.json");
    it("should win via right diagonal side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})

describe("Test That Player O Wins On Middle Vertical Side of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-middle-vertical-win.json");
    it("should win via middle vertical side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})

describe("Test That Player O Wins On Middle Horizontal Side of 3x3 Board", function () {
    const oWinData = require("../data/scores/o-middle-horizontal-win.json");
    it("should win via middle horizontal side of the board", function () {
        assert.notEqual(oWinData, null);
        assert.notEqual(oWinData, "");
        let board = new Board(oWinData);
        let state = board.getState();
        assert.equal(board.isValid(), true);
        assert.equal(state.xWinCount, 0);
        assert.equal(state.oWinCount, 1);
    })
})