EngineTest = TestCase("TestUnitaire");

EngineTest.prototype.testA = function () {
    var e = new Engine("nm");
    assertTrue(e.startToken() === 0);
};

EngineTest.prototype.testB = function () {
    var e = new Engine("nm");
    assertTrue(e.getPlayer() === "blanc");
};

EngineTest.prototype.testC = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    assertTrue(e.getCase("a1", "blanc") === 1);
};

EngineTest.prototype.testD = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    assertTrue(e.coupPlayed() === 1);
};

EngineTest.prototype.teste = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", "c");
    assertTrue(e.getCase("c1") === 1);
};

EngineTest.prototype.testf = function () {
    var e = new Engine("nm");
    e.nextPlayer();
    assertTrue(e.currentPlayer() === 2);
};
EngineTest.prototype.testHistoire6 = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a1", "noir");
    assertTrue(e.getCase("a1") === 2);
    assertTrue(e.startToken() === 2);
};

EngineTest.prototype.testHistoire7 = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", "a");
    e.onPlayed("a1", "noir");
    assertTrue(e.getCase("a1") === 2);
    assertTrue(e.startToken() === 2);
};
EngineTest.prototype.testHistoire8 = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a1", "noir");
    e.rotation("tl", "a");
    assertTrue(e.getCase("a1") === 1);
    assertTrue(e.getCase("a3") === 2);
};

EngineTest.prototype.testHistoire9 = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", 1);
    e.onPlayed("a1", "noir");
    e.rotation("tl", 0);
    assertException(function () {
        e.onPlayed("a3", "blanc")
    }, "ExceptionBoard");
};

EngineTest.prototype.testHistoire10 = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a1", "noir");
    e.rotation("tl", "a");
    e.onPlayed("b1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a2", "noir");
    e.rotation("tl", "a");
    e.onPlayed("c1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a3", "noir");
    e.rotation("tl", "a");
    e.onPlayed("d1", "blanc");
    e.rotation("tr", "a");
    e.onPlayed("f3", "noir");
    e.rotation("tr", "c");
    assertTrue(e.coupPlayed() === 8);
    assertTrue(e.getCase("a1") === 1);
    assertTrue(e.getCase("b1") === 1);
    assertTrue(e.getCase("c1") === 1);
    assertTrue(e.getCase("d1") === 1);
    assertTrue(e.getCase("a3") === 2);
    assertTrue(e.getCase("b3") === 2);
    assertTrue(e.getCase("c3") === 2);
    assertTrue(e.getCase("d3") === 2);
};

EngineTest.prototype.testHistoire11 = function () {
    var e = new Engine("nm");
    e.onPlayed("a1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a1", "noir");
    e.rotation("tl", "a");
    e.onPlayed("b1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a2", "noir");
    e.rotation("tl", "a");
    e.onPlayed("c1", "blanc");
    e.rotation("tl", "c");
    e.onPlayed("a3", "noir");
    e.rotation("tl", "a");
    e.onPlayed("d1", "blanc");
    e.rotation("tr", "a");
    e.onPlayed("f3", "noir");
    e.rotation("tr", "c");
    e.onPlayed("e1", "blanc");
    assertTrue(e.getCase("a1") === 1);
    assertTrue(e.getCase("b1") === 1);
    assertTrue(e.getCase("c1") === 1);
    assertTrue(e.getCase("d1") === 1);
    assertTrue(e.getCase("e1") === 1);
    assertTrue(e.getCase("a3") === 2);
    assertTrue(e.getCase("b3") === 2);
    assertTrue(e.getCase("c3") === 2);
    assertTrue(e.getCase("d3") === 2);
    assertTrue(e.getWinner() === 1);

};

EngineTest.prototype.testVertical = function () {
    var e = new Engine("nm");
    e.choicePlayerBegin("noir");
    e.onPlayed("a1", "noir");
    e.onPlayed("a2", "noir");
    e.onPlayed("a3", "noir");
    e.onPlayed("a4", "noir");
    e.onPlayed("a5", "noir");
    assertTrue(e.getCase("a1")=== 2);
    assertTrue(e.getCase("a2")=== 2);
    assertTrue(e.getCase("a3")=== 2);
    assertTrue(e.getCase("a4")=== 2);
    assertTrue(e.getCase("a5")=== 2);
    assertTrue(e.getWinner() === 2);

};

EngineTest.prototype.testDiagonal = function () {
    var e = new Engine("nm");
    e.choicePlayerBegin("noir");
    e.onPlayed("b6", "noir");
    e.onPlayed("c5", "noir");
    e.onPlayed("d4", "noir");
    e.onPlayed("e3", "noir");
    e.onPlayed("f2", "noir");
    assertTrue(e.getWinner() === 2);

};

EngineTest.prototype.testHistoire12 = function () {
    var e = new Engine("nm");
    e.choicePlayerBegin("blanc");
    var moveList= "c4cbl;d4abr;c3ctl;c3ctl;c4cbl;e5cbr;b1ctl;b2ctr;c4cbl;c3ctr";
    e.playMoveList(moveList);
    assertTrue(e.getCase("a1")=== 2);
    assertTrue(e.getWinner() === 2);
};

EngineTest.prototype.testHistoire13 = function () {
    var e = new Engine();
    e.choicePlayerBegin("noir");
    assertTrue(e.currentPlayer() === 2);
};

EngineTest.prototype.testHistoire14 = function () {
    var e = new Engine("nm");
    e.choicePlayerBegin("blanc");
    var moveList1 = "a1cbl;d1cbr;b1cbl;e1cbr;c1cbl;f1cbr";
    var moveList2 = "a2cbl;d2cbr;b2cbl;e2cbr;c2cbl;f2cbr";
    var moveList3 = "a3cbl;d3cbr;b3cbl;e3cbr;c3cbl;f3cbr";
    var moveList4 = "b5ctl;a4ctr;e4ctl;b4ctr;f4ctl;d4ctr";
    var moveList5 = "d5ctl;a5ctr;f5ctl;c4ctr;a6ctl;c5ctr";
    var moveList6 = "b6ctl;e5ctr;d6ctl;c6ctr;f6ctl;e6ctr";
    e.playMoveList(moveList1);
    e.playMoveList(moveList2);
    e.playMoveList(moveList3);
    e.playMoveList(moveList4);
    e.playMoveList(moveList5);
    e.playMoveList(moveList6);
    assertTrue(e.getWinner() === -1);
};

EngineTest.prototype.testHistoire15 = function () {
    var e = new Engine("nm");
    e.choicePlayerBegin("blanc");
    assertException(function () {
        e.onPlayed("a1", "noir")
    }, "ExceptionBadToken");
};

EngineTest.prototype.testHistoire16 = function () {
    var e = new Engine("xl", 4);
    assertTrue(e.getPlayer() === "rouge");

};

EngineTest.prototype.testHistoire17 = function () {
    var e = new Engine("xl", 4);
    e.onPlayed("a1", "rouge");
    e.nextPlayer();
    e.onPlayed("b1", "jaune");
    e.nextPlayer();
    e.onPlayed("c1", "vert");
    e.nextPlayer();
    e.onPlayed("d1", "bleu");
    assertTrue(e.getPlayer() === "bleu");

};
EngineTest.prototype.testHistoire18 = function () {
    var e = new Engine("xl", 3);
    e.choicePlayer("vert", "bleu", "rouge");
    e.onPlayed("b1", "vert");
    e.nextPlayer();
    e.onPlayed("c1", "bleu");
    e.nextPlayer();
    e.onPlayed("d1", "rouge");
    assertTrue(e.getPlayer() === "rouge");

};
/*EngineTest.prototype.testHistoire19 = function () {
    var e = new Engine("nm");
    e.randomGame();
    assertTrue(e.getWinner()=== 1 || e.getWinner()=== 2 || e.getWinner()=== -1);
};*/