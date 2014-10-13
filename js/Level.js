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
	this.rules = new RulesMenu(this.rect.centerX,this.rect.centerY, 8);
}
Level.prototype = {constructor: Level};
Level.prototype.update = function () {
    //update player score
    //check input
	//this.spinny.update();
	this.rules.update();
    this.players.forEach(function (player) { player.update(); });
};
Level.prototype.randomWordFromList = function () {
    return this.wordList[Math.floor(Math.random() * (this.wordList.length - 0 + 1) + 0)];
};
Level.prototype.draw = function (ctx) {
    this.players.forEach(function (player) { 
        player.draw(ctx); 
    });
	this.rules.draw(ctx);
	//this.spinny.draw(ctx);

//    ctx.beginPath();
//    ctx.moveTo(this.rect.centerX, 0);
//    ctx.lineTo(this.rect.centerX, this.rect.centerY * 2);
//    ctx.moveTo(0, this.rect.centerY);
//    ctx.lineTo(this.rect.centerX * 2, this.rect.centerY);
//    ctx.lineWidth = 10;
//    ctx.stroke();
};
