"use strict";
function Level(playerCount, centerX, centerY) {
    this.wordList = WordManager.generateWords();
    this.rect = {
        width: centerX * 2,
        height: centerY * 2,
        centerX: centerX,
        centerY: centerY
    };
    this.players = (function (wordList) {
        var result = [],
            i = 0;
        for (i; i < playerCount; i += 1) {
            var player = new Player(i, centerX, centerY);
            player.setWord(wordList[i]);
            result.push(player);
        }
        return result;
    }(this.wordList));
}
Level.prototype = {constructor: Level};
Level.prototype.update = function () {
    //update player score
    //check input
    this.players.forEach(function (player) { player.update(); });
};
Level.prototype.draw = function (ctx) {
    this.players.forEach(function (player) { 
        player.draw(ctx); 
    });

    ctx.beginPath();
    ctx.moveTo(this.rect.centerX, 0);
    ctx.lineTo(this.rect.centerX, this.rect.centerY * 2);
    ctx.moveTo(0, this.rect.centerY);
    ctx.lineTo(this.rect.centerX * 2, this.rect.centerY);
    ctx.lineWidth = 10;
    ctx.stroke();
};
