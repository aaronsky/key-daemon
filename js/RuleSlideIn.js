//Doug's Javascript. Direct all hate to Doug.
"use strict";
function RuleFadeIn(X, Y, speed, text, textSize, textColor) {
	this.loc = { X:X, Y:Y};
	this.text = {text:text, size:textSize, color:textColor };
	this.alpha = 0;
	this.done = false;
	this.speed = speed;
}

RuleFadeIn.prototype = {constructor: RuleFadeIn};

RuleFadeIn.prototype.update = function (dt) {
	if(!this.done){
		this.alpha += this.speed * dt;
		if(this.alpha > 255){
			this.done = true;
		}
	}
};

RuleFadeIn.prototype.draw = function (ctx) {
	ctx.textAlign = 'left';
	ctx.textBaseline = 'hanging';
	ctx.font = 'normal ' + this.text.size + 'pt Raleway Light';
	var colorWidth = ctx.measureText("Pick A Color").width + 50;

	ctx.globalAlpha = this.alpha/255;
	ctx.fillStyle = this.text.color;
	ctx.fillText(this.text.text, this.loc.X,this.loc.Y);
//	ctx.fillStyle = "#FDE8E8";
//	ctx.fillRect(colorWidth + textSize,50,textSize,textSize);
//	ctx.fillStyle = "#E7E9F5";
//	ctx.fillRect(colorWidth + textSize*3,50,textSize,textSize);
//	ctx.fillStyle = "#FEF8DA";
//	ctx.fillRect(colorWidth + textSize*5,50,textSize,textSize);
//	ctx.fillStyle = "#E3EFD0";
//	ctx.fillRect(colorWidth + textSize*7,50,textSize,textSize);
	ctx.globalAlpha = 1;
};
