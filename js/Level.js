(function () {
    function Level(playerCount) {
        this.wordList = WordManager.generateList();
        this.players = [];
    }
    Level.prototype.update = function() {
        //update player score
        //check input
        InputManager.keyHandle(word);
        players.forEach(function(player) { player.update(); });
    };
    Level.prototype.draw = function (ctx, centerX, centerY) {        
        players.forEach(function (player) { player.draw(ctx); });

        ctx.fillRect(centerX - 5, 0, centerX + 5, centerY * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.fillRect(0, centerY - 5, centerX * 2, centerY + 5);
        ctx.fill();
    };
}());
