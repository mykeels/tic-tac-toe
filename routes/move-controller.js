const Board = require("../models/board");
const BoardMove = require("../models/board-move");

module.exports = function (req, res, next) {
    let boardArray = null;
        let player = Number(req.body.player);
    if (req.body.board) boardArray = JSON.parse(req.body.board);
    if (Array.isArray(boardArray) && !!Number(player)) {
        let board = new Board(boardArray);
        let pivot = BoardMove.selectBestMove(board, player);
        if (pivot) board.play(player, pivot.y, pivot.x);
        let boardState = board.getState();
        console.log(board.toString());
        console.log("");
        res.send({
            pivot: pivot,
            state: boardState
        });
    }
    else {
        res.status(304);
        res.send("Bad Request");
    }
};