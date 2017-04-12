const Board = require("./board");
const BoardState = require("./board-state");
const Tile = require("./tile")

const Pivot = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Pivot.getPivots = (board) => {
    let pivots = [];
    for(let x = 1; x < board.length - 1; x++) {
        for(let y = 1; y < board[0].length - 1; y++) {
            pivots.push(new Pivot(x, y));
        }
    }
    return pivots;
}


Pivot.getEmptyPoints = (board) => {
    let pivots = [];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (board[row][col] == Tile.Blank) pivots.push(new Pivot(col, row));
        }
    }
    return pivots;
}

module.exports = Pivot;