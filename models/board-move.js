const Board = require("./board")
const BoardState = require("./board-state")
const Pivot = require("./pivot")
const Game = require("./game")
const Tile = require("./tile")

let BoardMove = function () {
    this.selectBestMove = function (board, tile) {
        if (board.length < 3) throw new Error("Board should be of size 3 or more");
        if (board[0].length < 3) throw new Error("Board should be of size 3 or more");
        let max = 0;
        let bestPivot = null;
        for (let row = 0; row <= board.length - 3; row++) {
            for (let col = 0; col <= board[0].length - 3; col++) {
                let l
            }
        }
        //to be continued
    }

    let selectBest = function (board, tile) {
        let max = 0;
        let bestPivot = null;
        for (let row = 0; row <= board.length; row++) {
            for (let col = 0; col <= board[0].length; col++) {
                if (board[row][col] == Tile.Blank) {
                    let fitnessValue = getFitness(board, new Pivot(col, row), tile);
                    if (fitnessValue > max) {
                        max = fitnessValue;
                        bestPivot = new Pivot(col, row);
                    }
                }
            }
        }
        if (bestPivot == null) {
            let pivots = Pivot.getEmptyPoints(board);
            if (pivots.length > 0) bestPivot = pivots[Math.floor(Math.random() * pivots.length)];
        }
        return bestPivot;
    }

    let getFitness = (board, pivot, player) => {
        let opponent = player == Tile.X ? Tile.O : Tile.X;
        if (BoardState.checkWin(board, pivot, player)) return Game.PLAYERWON;
        else if (BoardState.checkWin(board, pivot, opponent)) return Game.OPPONENTWON;
        else return Game.RANDOMPLAY;
    }
}

module.exports = BoardMove;