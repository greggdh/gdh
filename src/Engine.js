function ExceptionBoard() {
    "use strict";
    this.name = "ExceptionBoard";
}

function ExceptionBadToken() {
    "use strict";
    this.name = "ExceptionBadToken";
}

var Engine = function (type, nbPlayer) {
    "use strict";
    var player1, player2, player3, player4, player1For3, player2For3, player3For3, curPlayer, board, winer;

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
    var getPlayerXl3 = function () {
        if (curPlayer === 1) {
            return player1For3;
        }
        if (curPlayer === 2){
            return player3For3;
        }
        return player3For3;
    };
    var getPlayerNm = function () {
        if (curPlayer === player1) {
            return "blanc";
        }
        return "noir";
    };
    var getPlayerXl4 = function () {
        if (curPlayer === player1) {
            return "rouge";
        }
        if (curPlayer === player2) {
            return "jaune";
        }
        if (curPlayer === player3) {
            return "vert";
        }
        return "bleu";
    };
    this.getPlayer = function () {
        if (type === "nm") {
            return getPlayerNm();
        }
        if (nbPlayer === 4) {
            return getPlayerXl4();
        }
        return getPlayerXl3();
    };

    var initNm = function () {
        player1 = 1;
        player2 = 2;
        player3 = null;
        player4 = null;
        curPlayer = 1;
        board = new Array(6);
        winer = 0;
        var i, j;
        board = newArray(6);
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 6; j++) {
                board[i][j] = 0;
            }
        }
    };
    var initXl = function () {
        player1 = 1;
        player2 = 2;
        player3 = 3;
        player4 = null;
        if (nbPlayer === 4) {
            player4 = 4;
        }
        player4 = null;
        curPlayer = 1;
        board = new Array(9);
        winer = 0;
        var i, j;
        board = newArray(9);
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                board[i][j] = 0;
            }
        }
    };
    this.choicePlayer = function (couleur1, couleur2, couleur3) {
        player1For3 = couleur1;
        player2For3 = couleur2;
        player3For3 = couleur3;
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
    var getTokenNm = function (token) {
        if (token === "blanc") {
            return 1;
        }
        return 2;
    };
    var getTokenXl3 = function (token) {
        if (token === player1For3) {
            return 1;
        }
        if (token === player2For3) {
            return 2;
        }
        return 3;
    };
    var getTokenXl4 = function (token) {
        if (token === "rouge") {
            return 1;
        }
        if (token === "jaune") {
            return 2;
        }
        if (token === "vert") {
            return 3;
        }
        return 4;
    };
    var getToken = function (token) {
        if (type === "nm") {
            return getTokenNm(token);
        }
        if (nbPlayer === 3) {
            return getTokenXl3(token);
        }
        return getTokenXl4(token);
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
    var nextPlayerNm = function () {
        if (curPlayer === 1) {
            return 2;
        }
        return 1;
    };
    var nextPlayerXl3 = function () {
        if (curPlayer === 1) {
            return 2;
        }
        if (curPlayer === 2) {
            return 3;
        }
        return 1;
    };
    var nextPlayerXl4 = function () {
        if (curPlayer === 1) {
            return 2;
        }
        if (curPlayer === 2) {
            return 3;
        }
        if (curPlayer === 3) {
            return 4;
        }
        return 1;
    };
    this.nextPlayer = function () {
        if (type === "nm") {
            curPlayer = nextPlayerNm();
        } else {
            if (nbPlayer === 3) {
                curPlayer = nextPlayerXl3();
            } else {
                curPlayer = nextPlayerXl4();
            }
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
    /*this.randomGame = function () {
        var line, column, part = new Array(4), direction = new Array(2), indiceDirection, indicePart;
        direction = ["c", "a"];
        part = ["tl", "tr", "bl", "br"];
        while (winer === 0) {
            do {
                line = parseInt(Math.random() * 10) % 5;
                column = parseInt(Math.random() * 10) % 5;
            } while (board[line][column] === 0);
            board[line][column] = curPlayer;
            this.testWin(line, column);
            indiceDirection =  parseInt(Math.random() * 10) % 1;
            indicePart = parseInt(Math.random() * 10) % 3;
            this.rotation(part[indicePart], direction[indiceDirection]);
        }
    };*/
    this.getWinner = function () {
        return winer;
    };
    if (type === "nm") {
        initNm();
    } else {
        initXl();
    }
};