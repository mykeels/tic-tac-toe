const Board = require("../models/board");
const BoardMove = require("../models/board-move");

module.exports = function (req, res, next) {
    let boardArray = null;
        let player = Number(req.body.player);
    if (req.body.board) boardArray = JSON.parse(req.body.board);
    if (Array.isArray(boardArray) && !!Number(player)) {
        let board = new Board(boardArray);
        let oldBoardState = board.getState();
        if (board.width() == 3 && (oldBoardState.xWinCount > 0 || oldBoardState.oWinCount > 0)) { //3x3 board game is ended
            oldBoardState.end = true;
            res.send({
                pivot: null,
                state: oldBoardState
            });
        }
        else {
            let pivot = BoardMove.selectBestMove(board, player);
            if (pivot) board.play(player, pivot.y, pivot.x);
            let newBoardState = board.getState();
            console.log(board.toString());
            console.log("");
            res.send({
                pivot: pivot,
                state: newBoardState
            });
        }
    }
    else {
        res.status(304);
        res.send("Bad Request");
    }
};