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
	
	ctx.font = 'normal 30pt Calibri';
	var wordSize = ctx.measureText(this.word).width;
	var remWordSize = ctx.measureText(this.remainingWord).width;
	var comWordSize = ctx.measureText(this.completed).width;
	var letterSize = ctx.measureText(this.remainingWord.charAt(0)).width;
	
	ctx.textAlign = "left";
	ctx.fillStyle = '#A7A7A7';
    ctx.fillText(this.completed, this.center.x - (wordSize/2), this.center.y);
    ctx.fillStyle = '#000';
    ctx.fillText(this.remainingWord, this.center.x - (wordSize/2) + comWordSize, this.center.y);
	
	ctx.strokeStyle = '#A7A7A7';
    ctx.beginPath();
    ctx.moveTo(this.center.x - (wordSize/2), this.center.y + 20);
    ctx.lineTo(this.center.x - (wordSize/2) + comWordSize, this.center.y + 20);
    ctx.lineWidth = 2;
    ctx.stroke();
	
	ctx.strokeStyle = '#000';
	ctx.beginPath();
    ctx.moveTo(this.center.x - (wordSize/2) + comWordSize, this.center.y + 20);
    ctx.lineTo(this.center.x - (wordSize/2) + comWordSize + letterSize, this.center.y + 20);
    ctx.lineWidth = 4;
    ctx.stroke();
	
	ctx.beginPath();
    ctx.moveTo(this.center.x - (wordSize/2) + comWordSize + letterSize, this.center.y + 20);
    ctx.lineTo(this.center.x + (wordSize/2), this.center.y + 20);
    ctx.lineWidth = 2;
    ctx.stroke();
	
	ctx.textAlign = "center";
};