function MessageType() { }
MessageType.CreateGame = 0;
MessageType.JoinGame = 1;
MessageType.LeaveGame = 2;
MessageType.NewGame = 3;
MessageType.MakePlay = 4;

function RequestMessage(type, msg) {
    this.message = msg || {};
    this.message_type = type || MessageType.CreateGame;
}

function calcScore(tiles, x, o) {

    tiles = tiles || [];
    var pivots = calcScore.getPivots(tiles);
    pivots.each(function (pivot) {
        var left = calcScore.calcLeft(tiles, pivot);
        if (left == 5) o += 1;
        else if (left == 3) x += 1;

        var right = calcScore.calcRight(tiles, pivot);
        if (right == 5) o += 1;
        else if (right == 3) x += 1;

        var top = calcScore.calcTop(tiles, pivot);
        if (top == 5) o += 1;
        else if (top == 3) x += 1;

        var bottom = calcScore.calcBottom(tiles, pivot);
        if (bottom == 5) o += 1;
        else if (bottom == 3) x += 1;

        var vert = calcScore.verticalMiddle(tiles, pivot);
        if (vert == 5) o += 1;
        else if (vert == 3) x += 1;

        var horz = calcScore.horizontalMiddle(tiles, pivot);
        if (horz == 5) o += 1;
        else if (horz == 3) x += 1;

        var diagleft = calcScore.leftDiagonal(tiles, pivot);
        if (diagleft == 5) o += 1;
        else if (diagleft == 3) x += 1;

        var diagright = calcScore.rightDiagonal(tiles, pivot);
        if (diagright == 5) o += 1;
        else if (diagright == 3) x += 1;
    });
    //console.log("x: " + x + "  o: " + o);
    return { x: x, o: o };
}
calcScore.calcLeft = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var a = tiles[y - 1][x - 1];
    var b = tiles[y][x - 1];
    var c = tiles[y + 1][x - 1];
    var ret = a * b * c;
    if (ret == 125) {
        tiles[y - 1][x - 1] = 50;
        tiles[y][x - 1] = 50;
        tiles[y + 1][x - 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y - 1][x - 1] = 30;
        tiles[y][x - 1] = 30;
        tiles[y + 1][x - 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.calcRight = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y - 1][x + 1] * tiles[y][x + 1] * tiles[y + 1][x + 1];
    if (ret == 125) {
        tiles[y - 1][x + 1] = 50;
        tiles[y][x + 1] = 50;
        tiles[y + 1][x + 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y - 1][x + 1] = 30;
        tiles[y][x + 1] = 30;
        tiles[y + 1][x + 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.calcTop = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y - 1][x - 1] * tiles[y - 1][x] * tiles[y - 1][x + 1];
    if (ret == 125) {
        tiles[y - 1][x - 1] = 50;
        tiles[y - 1][x] = 50;
        tiles[y - 1][x + 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y - 1][x - 1] = 30;
        tiles[y - 1][x] = 30;
        tiles[y - 1][x + 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.calcBottom = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y + 1][x - 1] * tiles[y + 1][x] * tiles[y + 1][x + 1];
    if (ret == 125) {
        tiles[y + 1][x - 1] = 50;
        tiles[y + 1][x] = 50;
        tiles[y + 1][x + 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y + 1][x - 1] = 30;
        tiles[y + 1][x] = 30;
        tiles[y + 1][x + 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.horizontalMiddle = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y][x - 1] * tiles[y][x] * tiles[y][x + 1];
    if (ret == 125) {
        tiles[y][x - 1] = 50;
        tiles[y][x] = 50;
        tiles[y][x + 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y][x - 1] = 30;
        tiles[y][x] = 30;
        tiles[y][x + 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.verticalMiddle = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y - 1][x] * tiles[y][x] * tiles[y + 1][x];
    if (ret == 125) {
        tiles[y - 1][x] = 50;
        tiles[y][x] = 50;
        tiles[y + 1][x] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y - 1][x] = 30;
        tiles[y][x] = 30;
        tiles[y + 1][x] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.leftDiagonal = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y - 1][x - 1] * tiles[y][x] * tiles[y + 1][x + 1];
    if (ret == 125) {
        tiles[y - 1][x - 1] = 50;
        tiles[y][x] = 50;
        tiles[y + 1][x + 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y - 1][x - 1] = 30;
        tiles[y][x] = 30;
        tiles[y + 1][x + 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.rightDiagonal = function (tiles, pivot) {
    pivot = pivot || { x: 1, y: 1 };
    var x = pivot.x; var y = pivot.y;
    var ret = tiles[y - 1][x + 1] * tiles[y][x] * tiles[y + 1][x - 1];
    if (ret == 125) {
        tiles[y - 1][x + 1] = 50;
        tiles[y][x] = 50;
        tiles[y + 1][x - 1] = 50;
        return 5;
    }
    else if (ret == 27) {
        tiles[y - 1][x + 1] = 30;
        tiles[y][x] = 30;
        tiles[y + 1][x - 1] = 30;
        return 3; // x wins
    }
    else return 0;
}
calcScore.getPivots = function (tiles) {
    tiles = tiles || [];
    var pivots = [];
    for (var x = 0; x < tiles.length; x++) {
        for (var y = 0; y < tiles[x].length; y++) {
            if (x > 0 && y > 0 && x < tiles.length - 1 && y < tiles[x].length - 1) {
                pivots.add({ x: x, y: y });
            }
        }
    }
    return pivots;
}

/*toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "10000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function MsgBox(msg, type) {
    type = type || "info";
    try {
        toastr[type](msg);
    }
    catch (ex) {

    }
}*/