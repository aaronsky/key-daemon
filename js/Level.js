"use strict";
function Level(playerCount, centerX, centerY) {
    this.wordList = WordManager.generateWords();
    this.rect = {
        width: centerX * 2,
        height: centerY * 2,
        centerX: centerX,
        centerY: centerY
    };
    this.players = (function (randomWordCallback) {
        var result = [],
            i = 0;
        for (i; i < playerCount; i += 1) {
            var player = new Player(i, centerX, centerY);
            player.setWord(randomWordCallback());
            result.push(player);
        }
        return result;
    }(this.randomWordFromList.bind(this)));
	
	//If you want to get rid of the rules screen, change the last number of this delcaration to a 0
	//this.rules = new RulesMenu(this.rect.centerX,this.rect.centerY, 8);
    this.timeLeftSpinner = new LoadSpinner(this.rect.width / 10,
                                           5,
                                           "#DCDCDB",
                                           "#6D6D6D",
                                           this.rect.centerX,
                                           this.rect.centerY);
    this.timeLeftSpinner.isOn(true);
}
Level.prototype = {constructor: Level};
Level.prototype.update = function () {
    if (this.timeLeftSpinner.isDone()) {
        var scores = [];
        this.players.forEach(function (player) {
            scores.push(player.score);
        });
        var instance = Core.getInstance();
        instance.currentLevel = new EndScreen(scores, this.rect.centerX, this.rect.centerY);
    } else {
    //update player score
    //check input
	//this.rules.update();
    this.players.forEach(function (player) { player.update(); });
    this.timeLeftSpinner.update();
    }
};
Level.prototype.randomWordFromList = function () {
    return this.wordList[Math.floor(Math.random() * (this.wordList.length + 1))];
};
Level.prototype.draw = function (ctx) {
    this.players.forEach(function (player) { 
        player.draw(ctx); 
    });
    this.timeLeftSpinner.draw(ctx);
};
