(function () {
    "use strict";
    function Word(newWord) {
        this.word = newWord;
        this.remainingWord = this.word;
        this.completed = '';
    }
    Word.prototype.update = function (keys) {
    };
    Word.prototype.draw = function (ctx) {
        ctx.fillStyle = '#000';
        ctx.fillText(this.remainingWord, 0, 0);
        ctx.fillStyle = '#fff';
        ctx.fillText(this.completed, 0, 0);
    };
}());