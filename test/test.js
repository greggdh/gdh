EngineTest = TestCase("TestUnitaire");

EngineTest.prototype.testA= function() {
    var e = new Engine();
    assertTrue(e.startToken()==0);
};

EngineTest.prototype.testB= function() {
    var e = new Engine();
    assertTrue(e.getPlayer(1)=="blanc");
};

EngineTest.prototype.testC= function() {
    var e = new Engine();
    e.onPlayed("a1");
    assertTrue(e.getCase("a1")== 1);
};

EngineTest.prototype.testD= function() {
    var e = new Engine();
    e.onPlayed("a1");
    assertTrue(e.coupPlayed()== 1);
};

EngineTest.prototype.teste= function() {
    var e = new Engine();
    e.onPlayed("a1");
    e.rotation(1);
    assertTrue(e.getCase("c1")== 1);
};

EngineTest.prototype.testf= function() {
    var e = new Engine();
    e.nextPlayer();
    assertTrue(e.currentPlayer()== 2);
};