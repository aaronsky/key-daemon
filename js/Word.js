"use strict";
function Word(newWord, x, y) {
    this.word = newWord;
    this.remainingWord = this.word;
    this.completed = '';
    this.center = {
        x: x || 400, //debug values
        y: y || 300
    }
}
Word.prototype = {constructor: Word};
Word.prototype.update = function (keys) {
    if (keys[this.remainingWord.charCodeAt(0)]) {
        this.completed += this.remainingWord[0];
        this.remainingWord = this.remainingWord.substr(1);
    }
        
};
Word.prototype.draw = function (ctx) {
    ctx.font = 'normal 28pt Calibri';
    ctx.fillStyle = '#000';
    ctx.fillText(this.word, this.center.x, this.center.y);
    ctx.fillStyle = '#fff';
    ctx.fillText(this.completed, this.center.x, this.center.y);
};