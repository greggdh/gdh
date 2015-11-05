function ExceptionBoard() {
    "use strict";
    this.name = "ExceptionBoard";
}

function ExceptionBadToken() {
    "use strict";
    this.name = "ExceptionBadToken";
}

var Engine = function (size, nbPlayer) {
    "use strict";
    var player1, player2, player3, player4, curPlayer, board, winer;

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
    this.getPlayer = function () {
        if (curPlayer === player1) {
            return "blanc";
        }
        return "noir";
    };

    var initNm = function () {
        player1 = 1;
        player2 = 2;
        player3 = null;
        player4 = null;
        curPlayer = 1;
        board = new Array(6);
        winer = 0;
        board = newArray(6);
        boardLoop(function (i, j) {
            board[i][j] = 0;
        });
    };
    this.choicePlayerBegin = function (couleur) {
        if (couleur === "blanc") {
            curPlayer = 1;
        } else {
            curPlayer = 2;
        }

    };

    this.getCase = function (coup) {
        var ligne = coup.charCodeAt(0) - 97;
        var colone = coup.charCodeAt(1) - 49;
        return board[ligne][colone];

    };
    var getToken = function (token) {
        if (token === "blanc") {
            return 1;
        }
        return 2;
    };
    this.onPlayed = function (coup1, token) {
        var ligne = coup1.charCodeAt(0) - 97;
        var colone = coup1.charCodeAt(1) - 49;
        if (board[ligne][colone] !== 0) {
            throw new ExceptionBoard();
        } else if (curPlayer !== getToken(token)) {
            throw new ExceptionBadToken();
        } else {
            board[ligne][colone] = curPlayer;
            this.testWin(ligne, colone);
        }
    };

    var rotaMiniBoard = function (tab1, direction) {
        var tab = newArray(3);
        if (direction === "c") {
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
        if (part === "tr") {
            premI = 3;
        }
        if (part === "bl") {
            premJ = 3;
        }
        if (part === "br") {
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
    var diago4 = function (beginC, beginL) {
        var column = beginC, line = beginL, cpt = 0;
        while (column !== 4) {
            if (board[line][column] === curPlayer) {
                cpt++;
            }
            column++;
            line--;
        }
        return cpt;
    };
    var diago3 = function (beginC, beginL) {
        var column = beginC, line = beginL, cpt = 0;
        while (column !== 4) {
            if (board[line][column] === curPlayer) {
                cpt++;
            }
            column++;
            line++;
        }
        return cpt;
    };
    var diago2 = function () {
        var column = 0, line = 5, cpt = 0;
        while (column !== 5) {
            if (board[line][column] === curPlayer) {
                cpt++;
            }
            column++;
            line--;
        }
        return cpt;
    };
    var diago1 = function () {
        var i = 0, cpt = 0;
        while (i !== 5) {
            if (board[i][i] === curPlayer) {
                cpt++;
            }
            i++;
        }
        return cpt;
    };
    var winDgUp = function () {
        if (diago2() >= 5 || diago4(0, 4) >= 5 || diago4(1, 5) >= 5) {
            return 1;
        }
        return 0;
    };
    var winDgDown = function () {
        if (diago1() >= 5 || diago3(0, 1) >= 5 || diago3(1, 0)) {
            return 1;
        }
        return 0;
    };
    var winDg = function () {
        if (winDgUp === 1 || winDgDown === 1) {
            return 1;
        }
        return 0;
    };
    var winVt = function (column) {
        var cpt = 0, i;
        for (i = 0; i < 6; i++) {
            if (board[i][column] === 0) {
                cpt++;
            }
        }

        return cpt;
    };
    var winHz = function (line) {
        var cpt = 0, i;
        for (i = 0; i < 6; i++) {
            if (board[line][i] === 0) {
                cpt++;
            }
        }

        return cpt;
    };
    this.testWinPlayer = function (line, column) {
        var resultHz, resultVt, resultDg;
        resultHz = winHz(line);
        resultVt = winVt(column);
        resultDg = winDg();
        if ((resultHz >= 5) || (resultVt >= 5) || (resultDg === 1)) {
            winer = curPlayer;
        }
    };
    this.testWin = function (line, column) {
        this.testWinPlayer(line, column);
        if (this.startToken() === 36) {
            winer = -1;
        }
    };
    this.playMoveList = function (baseList) {
        var list = baseList.split(";"), i, move, direction, part;
        for (i = 0; i < list.length; i++) {
            move = list[i].charAt(0) + list[i].charAt(1);
            direction = list[i].charAt(2);
            part = list[i].charAt(3) + list[i].charAt(4);
            this.onPlayed(move, this.getPlayer());
            if (direction) {
                this.rotation(part, direction);
            }
        }
    };
    this.getWinner = function () {
        return winer;
    };

    initNm();
};