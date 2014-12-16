/*RulesMenu*/

//Author: Stephen Garabedian
//Date started: 12/12/14

//Function: create a screen that displays the basic rules of the game for a short time. The length of this screen is determined by the spinner object it also displays
//		Advances to a game screen after the spinner completes it's animation

'use strict';

function RulesMenu(centerX, centerY, time){	//Constructor, builds up necessary variables
	this.rect = {width: centerX * 2,
				 height: centerY * 2,
				 centerX: centerX,
				 centerY: centerY
				};
	this.backgroundColor = '#707070';
	this.textColor = '#303030';
	this.time = time;
	this.countdownTimer = new CountdownTimer(/*radius, time, baseColor, strokeColor, centerX, centerY, onCompletion*/);
	this.countdownTimer.isOn(true);
	this.rulesText = [
		//new FadeInText(/*xPos, yPos, fadeSpeed, text, textSize, textColor*/);
	];
}

RulesMenu.prototype = {constructor: RulesMenu};

RulesMenu.prototype.update = function () {	//If the spinner is still going,  update each line of rules text, otherwise advance to the next screen
	if ( !this.spinner.isOn ){
		for( var i = 0; i < this.rulesText.length; i ++ ) {
			this.rulesText[i].update(1);
			/* What does this next conditional statement do? */
			if ( !this.rulesText[i].done ){
				break;
			}
		}
		this.spinner.update();
	} else {
		var gameObj = app.getGame();
		gameObj.setCurrentGameState(new GameRound(/*playerCount, centerX, centerY*/));
	}
};

RulesMenu.prototype.draw = function (ctx) {	//Draw each line of the rules text and set up all our visual variables (text color, background color, etc)
	ctx.fillStyle = this.backgroundColor;
	ctx.fillRect( 0, 0, this.rect.width, this.rect.height);	//Make a box that fills the screen
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	var textSize = 30;
	/* Why is this next line necessary? */
	var colorWidth = ctx.measureText(this.rulesText[1].text).width + 50;
	ctx.font = 'normal ' + textSize + 'pt Lato-Light';
	
	for( var i = 0; i < this.rulesText.length; i ++ ) {
		this.rulesText[i].draw(ctx);
	}
	
	this.countdownTimer.draw(ctx);
};