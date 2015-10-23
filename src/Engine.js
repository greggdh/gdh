function ExceptionBoard() {
    "use strict";
    this.name = "ExceptionBoard";
}

var Engine = function () {
    "use strict";
    var player1 = 1, player2 = 2, curPlayer, board = new Array(6);

    var foreach = function (n, callback) {
        var i, j;
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                callback(i, j);
            }
        }
    };

    var boardLoop = function (callback) {
        foreach(6, callback);
    };

    this.currentPlayer = function () {
        return curPlayer;
    };
    this.coupPlayed = function () {
        var cpt = 0;
        boardLoop(function (i, j) {
            if (board[i][j] !== 0) {
                cpt++;
            }
        });
        return cpt;
    };

    var newArray = function (max) {
        var i;
        var tab1 = new Array(max);
        for (i = 0; i < max; i++) {
            tab1[i] = new Array(max);
        }
        return tab1;
    };

    this.startToken = function () {
        var cpt = 0;
        boardLoop(function (i, j) {
            if (board[i][j] !== 0) {
                cpt++;
            }
        });
        return cpt;
    };

    this.getPlayer = function (tmp) {
        if (tmp === player1) {
            return "blanc";
        }
        if (tmp === player2) {
            return "noir";
        }
    };

    var init = function () {
        var i, j;
        board = newArray(6);
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 6; j++) {
                board[i][j] = 0;
            }
        }
        curPlayer = 1;
    };

    this.getCase = function (coup) {
        var ligne = coup.charCodeAt(0) - 97;
        var colone = coup.charCodeAt(1) - 49;
        return board[ligne][colone];

    };


    this.onPlayed = function (coup1) {
        var ligne = coup1.charCodeAt(0) - 97;
        var colone = coup1.charCodeAt(1) - 49;
        if (board[ligne][colone] === 0) {
            board[ligne][colone] = curPlayer;
        } else {
            throw new ExceptionBoard();
        }
    };

    var rotaMiniBoard = function (tab1, direction) {
        var tab = newArray(3);
        if (direction) {
            foreach(3, function (i, j) {
                tab[i][j] = tab1[j][2 - i];
            });
        } else {
            foreach(3, function (i, j) {
                tab[i][j] = tab1[2 - j][i];
            });
        }

        return tab;
    };

    var getPart = function (part) {
        var premI = 0, premJ = 0;
        if (part === 2) {
            premI = 3;
        }
        if (part === 3) {
            premJ = 3;
        }
        if (part === 4) {
            premI = 3;
            premJ = 3;
        }
        return {"i" : premI, "j" : premJ};
    };

    this.rotation = function (part, direction) {
        var prem;
        prem = getPart(part);

        var tab1 = newArray(3);

        foreach(3, function (i, j) {
            tab1[i][j] = board[i + prem.i][j + prem.j];
        });
        var tab2 = rotaMiniBoard(tab1, direction);
        foreach(3, function (i, j) {
            board[i + prem.i][j + prem.j] = tab2[i][j];
        });
        this.nextPlayer();
    };

    this.nextPlayer = function () {
        if (curPlayer === 1) {
            curPlayer = 2;
        } else {
            curPlayer = 1;
        }
    };
    init();
};