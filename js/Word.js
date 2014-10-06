"use strict";
function Word(newWord, x, y) {
    this.word = newWord || '';
    this.remainingWord = this.word;
    this.completed = '';
    this.center = {
        x: x || 400, //debug values
        y: y || 300
    };
    this.solved = false;
}
Word.prototype = {constructor: Word};
Word.prototype.update = function (keys) {
    var nextLetter = this.remainingWord.charAt(0).toUpperCase();
    if (keys[nextLetter]) {
        this.completed += this.remainingWord.charAt(0);
        this.remainingWord = this.remainingWord.substr(1);
    }
    if (this.remainingWord.length === 0 && this.completed === this.word)
    {
        console.log('word done');
        this.solved = true;
    }
        
};
Word.prototype.draw = function (ctx) {
    ctx.font = 'normal 28pt Calibri';
    ctx.fillStyle = '#000';
    ctx.fillText(this.remainingWord, this.center.x, this.center.y);
    ctx.fillStyle = '#fff';
    ctx.fillText(this.completed, this.center.x, this.center.y);
};