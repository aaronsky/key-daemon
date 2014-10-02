(function () {
    "use strict";
    function Player(num) {
        this.id = num;
        this.currentWord;
        //this.color = id << '#000';
    }
    
    Player.prototype.setWord = function (newWord) {
        this.currentWord = new Word(newWord);
    };
    
    Player.prototype.update = function () {
        this.currentWord.update();
    };
    
    Player.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        this.currentWord.draw(ctx);
    };
    
}());