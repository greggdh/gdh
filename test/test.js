EngineTest = TestCase("TestUnitaire");

EngineTest.prototype.testA = function () {
    var e = new Engine();
    assertTrue(e.startToken() === 0);
};

EngineTest.prototype.testB = function () {
    var e = new Engine();
    assertTrue(e.getPlayer(1) === "blanc");
};

EngineTest.prototype.testC = function () {
    var e = new Engine();
    e.onPlayed("a1");
    assertTrue(e.getCase("a1") === 1);
};

EngineTest.prototype.testD = function () {
    var e = new Engine();
    e.onPlayed("a1");
    assertTrue(e.coupPlayed() === 1);
};

EngineTest.prototype.teste = function () {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 1);
    assertTrue(e.getCase("c1") === 1);
};

EngineTest.prototype.testf = function () {
    var e = new Engine();
    e.nextPlayer();
    assertTrue(e.currentPlayer() === 2);
};
EngineTest.prototype.testHistoire6 = function () {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 1);
    e.onPlayed("a1");
    assertTrue(e.getCase("a1") === 2);
    assertTrue(e.startToken() === 2);
};

EngineTest.prototype.testHistoire7 = function () {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 0);
    e.onPlayed("a1");
    assertTrue(e.getCase("a1") === 2);
    assertTrue(e.startToken() === 2);
};
EngineTest.prototype.testHistoire8 = function () {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 1);
    e.onPlayed("a1");
    e.rotation(1, 0);
    assertTrue(e.getCase("a1") === 1);
    assertTrue(e.getCase("a3") === 2);
};

EngineTest.prototype.testHistoire9 = function () {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 1);
    e.onPlayed("a1");
    e.rotation(1, 0);
    assertException(function () {
        e.onPlayed("a3")
    }, "ExceptionBoard");
};

EngineTest.prototype.testHistoire10 = function () {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 1);
    e.onPlayed("a1");
    e.rotation(1, 0);
    e.onPlayed("b1");
    e.rotation(1, 1);
    e.onPlayed("a2");
    e.rotation(1, 0);
    e.onPlayed("c1");
    e.rotation(1, 1);
    e.onPlayed("a3");
    e.rotation(1, 0);
    e.onPlayed("d1");
    e.rotation(2, 0);
    e.onPlayed("f3");
    e.rotation(2, 1);
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
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1, 1);
    e.onPlayed("a1");
    e.rotation(1, 0);
    e.onPlayed("b1");
    e.rotation(1, 1);
    e.onPlayed("a2");
    e.rotation(1, 0);
    e.onPlayed("c1");
    e.rotation(1, 1);
    e.onPlayed("a3");
    e.rotation(1, 0);
    e.onPlayed("d1");
    e.rotation(2, 0);
    e.onPlayed("f3");
    e.rotation(2, 1);
    e.onPlayed("e1");
    assertTrue(e.getCase("a1") === 1);
    assertTrue(e.getCase("b1") === 1);
    assertTrue(e.getCase("c1") === 1);
    assertTrue(e.getCase("d1") === 1);
    assertTrue(e.getCase("e1") === 1);
    assertTrue(e.getCase("a3") === 2);
    assertTrue(e.getCase("b3") === 2);
    assertTrue(e.getCase("c3") === 2);
    assertTrue(e.getCase("d3") === 2);
    assertTrue(e.getWiner() === 1);

};