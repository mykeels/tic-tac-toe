var app = angular.module("TicTacToe", []);
app.controller("GameCtrl", function ($scope) {
    $scope.socket = null;
    $scope.messages = [];
    $scope.size = 3;
    $scope.tiles = [];
    $scope.score = { x: 0, o: 0 }
    $scope.game_type = "local";
    $scope.your_turn = true;
    $scope.network_btn = "Network Game";
    $scope.getTileHeight = (length) => Math.ceil(Math.ceil(screen.width * (length < 6 ? 0.85 : (length < 9 ? 0.8 : 0.75))) / length);
    $scope.getTileWidth = (length) => 'calc(' + Math.floor(100 / length) + '% - 4px)';
    $scope.changeTiles = function () {
        var a1 = [];
        for (var i = 0; i < $scope.size; i++) {
            var a2 = [];
            for (var j = 0; j < $scope.size; j++) {
                a2.add(0);
            }
            a1.add(a2);
        }
        $scope.tiles = a1;
        return a1;
    }
    $scope.newGame = function () {
        $scope.changeTiles();
        for (var i = 0; i < $scope.size; i++) {
            for (var j = 0; j < $scope.size; j++) {
                $scope.tiles[i][j] = 0;
            }
        }
    }
    $scope.networkGame = function () {
        if ($scope.socket == null) {
            $scope.connect();
            $scope.network_btn = "New Game";
            $scope.game_type = "network";
        }
        else {
            $scope.newGame();
            $scope.socket.send(new RequestMessage(MessageType.NewGame, $scope.size).toJson());
        }
    }
    $scope.localGame = function () {
        $scope.game_type = "local";
        $scope.your_turn = true;
        $scope.newGame();
    }
    $scope.nextplay = "X";
    $scope.play = function (x, y) {
        if ($scope.your_turn) {
            $scope.makeplay(x, y);
            $scope.socket.send(new RequestMessage(MessageType.MakePlay, { x: x, y: y }).toJson());
            if ($scope.game_type == "network") $scope.your_turn = false;
            //toastr["success"]("You have played " + { x: x, y: y }.toJson());
        }
    }
    $scope.makeplay = function (x, y) {
        if ($scope.tiles[y][x] == 0) {
            if ($scope.nextplay == "X") {
                $scope.nextplay = "O";
                $scope.tiles[y][x] = 3;//3 means 'X';
            }
            else {
                $scope.nextplay = "X";
                $scope.tiles[y][x] = 5; //5 means 'O'
            }
        }
        $scope.calcGame();
    }
    $scope.calcGame = function () {
        var score = calcScore($scope.tiles, $scope.score.x, $scope.score.o);
        $scope.score.x = score.x;
        $scope.score.o = score.o;
        //$scope.socket.send("hello");
    }
    $scope.connect = function () {
        $scope.socket = new WebSocket("ws://10.10.4.221:23222", []);
        $scope.socket.onopen = function () {
            $scope.messages.add("New Socket Connection Established");
            //toastr["info"]("New Socket Connection Established");
            //console.log($scope.socket.readyState);
            $scope.socket.send(new RequestMessage(MessageType.CreateGame, $scope.size).toJson());
        }
        $scope.socket.onclose = function () {
            $scope.messages.add("Connection Terminated");
            //toastr["success"]("Connection Terminated");
        }
        $scope.socket.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            console.log(msg);
            $scope.messages.add(msg);
            if (msg.message_type == 0 && msg.message == true) {
                $scope.newGame();
                $scope.$apply();
                $scope.messages.add("You have started a new game");
                //toastr["success"]("You have started a new game");
            }
            else if (msg.message_type == 1 && msg.message != false) {
                if (msg.message != null && !Number.isNaN(Number(msg.message))) {
                    $scope.size = msg.message;
                }
                $scope.$apply();
                $scope.newGame();
                $scope.$apply();
                $scope.messages.add("A user has joined this game");
                $scope.$apply();
                //toastr["success"]("A user has joined this game");
            }
            else if (msg.message_type == 2) {
                $scope.localGame();
                $scope.socket = null;
                $scope.network_btn = "Network Game";
                $scope.$apply();
            }
            else if (msg.message_type == 3) {
                if (msg.message != null && !Number.isNaN(Number(msg.message))) {
                    $scope.size = msg.message;
                }
                $scope.newGame();
                $scope.$apply();
            }
            else if (msg.message_type == 4) {
                if ($scope.tiles[msg.message.y][msg.message.x] == 0) {
                    $scope.makeplay(msg.message.x, msg.message.y);
                    $scope.your_turn = true;
                }

                //toastr["success"]("Other User Plays " + msg.message.toJson());
                $scope.$apply();
            }
        }
    }
    $scope.Math = Math;
});