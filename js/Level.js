"use strict";
function Level(playerCount) {
    this.wordList = WordManager.generateWords();
    this.players = (function () {
        var result = [],
            i = 0;
        for (i; i < playerCount; i += 1) {
            var player = new Player(i);
            result.push(player);
        }
        return result;
    }());
}
Level.prototype = {constructor: Level};
Level.prototype.update = function () {
    //update player score
    //check input
    this.players.forEach(function (player) { player.update(); });
};
Level.prototype.draw = function (ctx, centerX, centerY) {
    this.players.forEach(function (player) { player.draw(ctx, centerX, centerY); });

    ctx.fillRect(centerX - 5, 0, centerX + 5, centerY * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.fillRect(0, centerY - 5, centerX * 2, centerY + 5);
    ctx.fill();
};
