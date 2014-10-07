"use strict";
function Player(num, centerX, centerY) {
    centerX = centerX || window.innerWidth * 0.5;
    centerY = centerY || window.innerHeight * 0.5;
    this.id = num;
    this.currentWord;
    this.color = (function (id) {
        var color;
		switch(id){
			case 0:
				color = "#FDE8E8";
				break;
			case 1:
				color = "#E7E9F5";
				break;
			case 2:
				color = "#FEF8DA";
				break;
			case 3:
				color = "#E3EFD0";
				break;
		}
        return color;
    }(this.id));
    this.rect = {
        x: (this.id % 2) * centerX,
        y: (function (id){
                if (id == 1)
                    return 0;
                else if (id == 2)
                    return centerY;
                else
                    return (id % 2) * centerY;
            }(this.id)),
        width: centerX,
        height: centerY
    };
    this.rect.centerX = this.rect.x + (this.rect.width * 0.5);
    this.rect.centerY = this.rect.y + (this.rect.height * 0.5);
    this.score = 0;
    //this.color = id << '#000';
}
Player.prototype = {constructor: Player};
Player.prototype.setWord = function (newWord) {
    this.currentWord = new Word(newWord, this.rect.centerX, this.rect.centerY);
};

Player.prototype.update = function () {
    InputManager.keyHandle(this.currentWord);
    if(this.currentWord.solved) {
        this.setWord(Core.getInstance().currentLevel.randomWordFromList());
        this.score += 100;
    }
};

Player.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    this.currentWord.draw(ctx);
    ctx.fillStyle = '#676767';
    ctx.font = 'normal 16pt Calibri';
	ctx.textAlign = "right";
    //super hardcoded, switch to modulo at some point
    var scoreRect = (function (id, centerX, centerY) {
        var rect = {};
        switch (id) {
            case 0:
                rect.x = centerX - 25;
                rect.y = centerY - 25;
                break;
            case 1:
                rect.x = centerX * 2 - 25;
                rect.y = centerY - 25;
                break;
            case 2:
                rect.x = centerX - 25;
                rect.y = centerY * 2 - 25;
                break;
            case 3:
                rect.x = centerX * 2 - 25;
                rect.y = centerY * 2 - 25;
                break;
            default:
                rect.x = rect.y = 0;
                break;
        }
        return rect;
    }(this.id, this.rect.width, this.rect.height));
    ctx.fillText(this.score, 
                 scoreRect.x,
                 scoreRect.y);
};