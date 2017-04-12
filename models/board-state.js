const Board = require("board")
const Tile = require("tile")
const Pivot = require("pivot")
const Game = require("game")

var BoardState = function (board) {
    board = board || {}
    this.size = board.length || 0;
    this.xWinCount = 0;
    this.oWinCount = 0;
    this.getScore = (tile) => {
        if (tile == Tile.X) return this.xWinCount;
        else if (tile == Tile.O) return this.oWinCount;
        else return 0;
    }
}

BoardState.checkWin = (board, pivot, player) => {
    let blankTile = board[pivot.y][pivot.x];
    
    let score = (new Board(board)).getState().getScore(player);
    board.play(player, pivot.y, pivot.x);

    let isWin = (new Board(board)).getState().getScore(player) > score;
    board.play(blankTile, pivot.y, pivot.x);

    return isWin;
}

BoardState.calcScore = (board, state) => {
    if (state == null) state = new BoardState(board);
    let pivots = Pivot.getPivots(board);
    let xScore = state.xWinCount;
    let oScore = state.oWinCount;
    pivots.forEach(pivot => {
        let updateState = (tile, state) => {
            if (tile == Tile.X) state.xWinCount++;
            else if (tile == Tile.O) state.oWinCount++;
            return state;
        }

        let left = calcLeft(board, pivot);
        let right = calcRight(board, pivot);
        let top = calcTop(board, pivot);
        let bottom = calcBottom(board, pivot);
        let vertMiddle = calcVerticalMiddle(board, pivot);
        let horzMiddle = calcHorizontalMiddle(board, pivot);
        let diagLeft = calcLeftDiagonal(board, pivot);
        let diagRight = calcRightDiagonal(board, pivot);
        state = updateState(left, state);
        state = updateState(right, state);
        state = updateState(top, state);
        state = updateState(bottom, state);
        state = updateState(vertMiddle, state);
        state = updateState(horzMiddle, state);
        state = updateState(diagLeft, state);
        state = updateState(diagRight, state);
    });
    return state;
}

let calcLeft = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y - 1][x - 1],
        b = board[y][x - 1],
        c = board[y + 1][x - 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y - 1][x - 1] = board[y][x - 1] = board[y + 1][x - 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y - 1][x - 1] = board[y][x - 1] = board[y + 1][x - 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcRight = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y - 1][x + 1],
        b = board[y][x + 1],
        c = board[y + 1][x + 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y - 1][x + 1] = board[y][x + 1] = board[y + 1][x + 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y - 1][x + 1] = board[y][x + 1] = board[y + 1][x + 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcTop = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y - 1][x - 1],
        b = board[y - 1][x],
        c = board[y - 1][x + 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y - 1][x - 1] = board[y - 1][x] = board[y - 1][x + 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y - 1][x - 1] = board[y - 1][x] = board[y - 1][x + 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcBottom = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y + 1][x - 1],
        b = board[y + 1][x],
        c = board[y + 1][x + 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y + 1][x - 1] = board[y + 1][x] = board[y + 1][x + 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y + 1][x - 1] = board[y + 1][x] = board[y + 1][x + 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcHorizontalMiddle = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y][x - 1],
        b = board[y][x],
        c = board[y][x + 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y][x - 1] = board[y][x] = board[y][x + 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y][x - 1] = board[y][x] = board[y][x + 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcHorizontalMiddle = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y][x - 1],
        b = board[y][x],
        c = board[y][x + 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y][x - 1] = board[y][x] = board[y][x + 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y][x - 1] = board[y][x] = board[y][x + 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcVerticalMiddle = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y - 1][x],
        b = board[y][x],
        c = board[y + 1][x];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y - 1][x] = board[y][x] = board[y + 1][x] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y - 1][x] = board[y][x] = board[y + 1][x] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcLeftDiagonal = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y - 1][x - 1],
        b = board[y][x],
        c = board[y + 1][x + 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y - 1][x - 1] = board[y][x] = board[y + 1][x + 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y - 1][x - 1] = board[y][x] = board[y + 1][x + 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

let calcRightDiagonal = (board, pivot) => {
    let x = pivot.x, y = pivot.y;
    let a = board[y - 1][x + 1],
        b = board[y][x],
        c = board[y + 1][x - 1];
    
    let prod = +a * +b * +c;
    if (prod == Game.XWON) {
        board[y - 1][x + 1] = board[y][x] = board[y + 1][x - 1] = Tile.XInvalid;
        return Tile.X;
    }
    else if (prod == Game.OWON) {
        board[y - 1][x + 1] = board[y][x] = board[y + 1][x - 1] = Tile.OInvalid;
        return Tile.O;
    }
    return Tile.Blank;
}

module.exports = BoardState;