/*StartScreen*/

//Author: Stephen Garabedian
//Date started: 12/10/14

//Function: create a landing screen that the player will see when they start the game
//		Will include the game's title and when the user clicks/presses enter/indicates that they would like to begin the game, switches the game's state to a RulesMenu object

'use strict';

function StartScreen(centerX, centerY/*,variablePlayerCount*/){
	//this.variablePlayerCount = variablePlayerCount;
	this.rect = {	//This refers to the gameState variable returned by app.game.getCurrentGameState
		centerX: centerX,
		centerY: centerY,
	};
	
	this.backgroundColor = '#707070';
	this.textColor = '#303030';
}

StartScreen.prototype = {constructor: StartScreen};	//Sets the constructor for the StartScreen prototype to the above StartScreen(centerX, centerY) function

StartScreen.prototype.update = function(){
	//Check the InputManager's keylogger to see if the enter key [13] has been pressed
	if ( InputManager.keysPressed[13] ){ // if the Enter key is currently being pressed
        this.end();
    }
}

StartScreen.prototype.draw = function(ctx){
	var numPlayers = this.variablePlayerCount || 4;	//Assuming 4 players if there's no variablePlayerCount passed in
	var height = this.rect.centerY * 2;
	var heightFragment = height/numPlayers;
	var width = this.rect.centerX * 2;
	var colors=['#FD7373','#FDB273','#5CCB5C','#459898'];
	
	for(var i = 0; i < numPlayers; i++)
	{
		ctx.fillStyle = colors[i];
		ctx.fillRect(0,i*heightFragment,width,heightFragment);
	}
	
	ctx.textBaseline = 'middle';	//Text will write on the Y axis you define, larger font sizes will expand upwards and downwards
	ctx.textAlign = 'start';		//Text will expand to the right of the X axis you define
	
	ctx.fillStyle = this.textColor;
	ctx.font = 'normal 70pt Lato-Light';
	
	ctx.fillText("Key Daemon Rework", 25, heightFragment - heightFragment/2);		//Write it in the middle of the topmost block 25 pixels over
	
    ctx.font = 'normal 12pt Lato-Light';
    ctx.fillText("A game by Stephen Garabedian",25, height - heightFragment/2);	//Write the credits in the middle of the last block 25 pixels over
    
    ctx.textAlign = 'right';	//Now text expands from right to left
    ctx.font = 'normal 72pt Lato-Light';
    ctx.fillText("Press Enter",width - 25,(height - heightFragment) - heightFragment/2);	//Write the command to continue in the second-to-bottommost block
}

StartScreen.prototype.end = function(){
	var gameObj = app.getGame();
	gameObj.setCurrentGameState(new RulesMenu(this.rect.centerX, this.rect.centerY, 10));	//the last variable here (the int) tells the RulesMenu how long it should last for (10 seconds is good)
}