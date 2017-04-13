const Tile = require("./tile");
const BoardState = require("./board-state");

const Board = function (entry) {
    let board = []; //private
    let size = 0;
    if (Array.isArray(entry)) {
        board = entry;
        size = board.length;
    }
    else {
        size = Math.min(Math.max(Number(entry), 3), 12); //min of 3 and max of 12
        let row = [];
        for (let i = 0; i < size; i++) {
            row.push(Tile.Blank);
        }
        for (let i = 0; i < size; i++) {
            board.push(row.slice(0));
        }
    }
    const MIN_LENGTH = 3, MAX_LENGTH = 12, ZERO = 0, ONE = 1;

    this.state = null;
    this.getState = () => {
        if (!this.state) this.state = new BoardState(board);
        state = BoardState.calcScore(board, this.state);
        return this.state;
    }
    this.isEmpty = () => board.filter(row => row.filter(tile => tile == Tile.Blank).length == row.length).length == board.length;
    this.isFull = () => board.filter(row => row.filter(tile => tile != Tile.Blank).length == row.length).length == board.length;
    this.isValid = () => {
        return board && board.length >= MIN_LENGTH && board.length <= MAX_LENGTH && board.filter(row => !Array.isArray(row)).length == 0 &&
            board.map(row => row.length).reduce((arr, count) => {
                if (arr.indexOf(count) < 0) arr.push(count);
                return arr;
            }, []).length == ONE && board.filter(row => row.length < MIN_LENGTH || row.length > MAX_LENGTH).length == 0;
    }
    this.play = (tile, row, col) => {
        board[row][col] = tile;
        return this.getState();
    }
    this.getBoard = function (pivot, size) {
        size = size || 3;
        var ret = [];
        if (pivot.y + size > board.length) throw new Error("New Sub-Board Rows cannot be out of bounds of Parent Board");
        if (pivot.x + size > board.length) throw new Error("New Sub-Board Columns cannot be out of bounds of Parent Board");
        for (let y = pivot.y; y < size + pivot.y; y++) {
            var row = [];
            for (let x = pivot.x; x < size + pivot.x; x++) {
                row.push(board[y][x] + 0);
            }
            ret.push(row);
        }
        return ret;
    }
    this.width = function () {
        return board.length;
    }
    this.height = function () {
        return board[0].length;
    }
    this.toString = function () {
        let ret = [];
        for (let row = 0; row < board.length; row++) {
            let rowArr = [];
            for (let col = 0; col < board[row].length; col++) {
                let tile = board[row][col];
                if (tile == Tile.O) rowArr.push("o");
                else if (tile == Tile.X) rowArr.push("x");
                else if (tile == Tile.Blank) rowArr.push("-");
                else if (tile == Tile.XInvalid) rowArr.push("X");
                else if (tile == Tile.OInvalid) rowArr.push("O");
                else rowArr.push("-");
            }
            ret.push(rowArr.join(" "));
        }
        return ret.join("\n");
    }
}

module.exports = Board;