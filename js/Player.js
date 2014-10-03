"use strict";
function Player(num) {
    this.id = num;
    this.setWord();
    this.color = "#f00";
    //this.color = id << '#000';
}
Player.prototype = {constructor: Player};
Player.prototype.setWord = function (newWord) {
    this.currentWord = new Word(newWord);
};

Player.prototype.update = function () {
    InputManager.keyHandle(this.currentWord);
};

Player.prototype.draw = function (ctx, centerX, centerY) {
    ctx.fillRect(0, 0, centerX - 5, centerY - 5);
    ctx.fillStyle = this.color;
    ctx.fill();
    this.currentWord.draw(ctx);
};