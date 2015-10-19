function ExceptionBoard(){
    this.name = "ExceptionBoard";
}

var Engine = function(){
    var player1 = 1;
    var player2 = 2;
    var curPlayer;
    var board = new Array(6);

    this.currentPlayer = function(){
        return curPlayer;
    }
    this.coupPlayed = function(){
        var cpt=0;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                if (board[i][j] != 0 ) cpt ++;
            }
        }
        return cpt;
    };

    this.startToken = function(){
        var cpt=0;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                if (board[i][j] != 0) cpt ++;
            }
        }
        return cpt;
    };

    this.getPlayer = function(tmp){
        if (tmp== player1) return "blanc";
        if (tmp== player2 ) return "noir";
    };
    /*var getColor = function(tmp){
        if (tmp== "blanc") return player1;
        if (tmp== "noir" ) return player2;
    };*/

    var init = function(){
        for (var i = 0; i < 6; i++) {
            board[i] = new Array(6);
        }
        for (i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                board[i][j] = 0;
            }
        }
        curPlayer = 1;
    };
    init();

    this.getCase= function(coup){
        var ligne = coup.charCodeAt(0) - 97;
        var colone = coup.charCodeAt(1) - 49;
       return  board[ligne][colone];

    };


    this.onPlayed = function(coup1) {
        var i, j;
        var ligne = coup1.charCodeAt(0) - 97;
        var colone = coup1.charCodeAt(1) - 49;
        if (board[ligne][colone] == 0) board[ligne][colone] = curPlayer;
        else throw new ExceptionBoard();

    };

    var rotaMiniBoard = function(tab1, direction) {
        var tab = new Array(3);
        for (i = 0; i < 3; i++) {
            tab[i] = new Array(3);
        }
        if (direction){
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    tab[i][j] = tab1[j][2 - i];
                }
            }
        }
        else{
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    tab[i][j] = tab1[2-j][i];
                }
            }
        }

        return tab;
    };

    this.rotation = function(part, direction){
        var premI, premJ, i, j;
        if (part == 1) {
            premI = 0;
            premJ = 0;
        }
        if (part == 2) {
            premI = 3;
            premJ = 0;
        }
        if (part == 3) {
            premI = 0;
            premJ = 3;
        }
        if (part == 4){
            premI = 3;
            premJ = 3;
        }

        var tab1 = new Array(3);
        for(i=0; i < 3 ; i++){
            tab1[i] = new Array(3);
        }

        for(i=0; i < 3 ; i++){
            for(j=0; j < 3 ; j++){
                tab1[i][j] = board[i+premI][j+premJ];
            }
        }
        var tab2 =rotaMiniBoard(tab1, direction);
        for(i=0; i < 3 ; i++){
            for(j=0; j < 3 ; j++){
                board[i+premI][j+premJ] = tab2[i][j];
            }
        }
        this.nextPlayer();
    };

    this.nextPlayer = function(){
        if (curPlayer==1) curPlayer = 2;
    };
};