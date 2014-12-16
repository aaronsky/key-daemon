/*Main method!*/

//Author: Stephen Garabedian
//Building on: the existing version of KeyDaemon developed by Aaron Sky, Doug Wattro, Stephen Garabedian and Richard Weiss
//All code here has been rewritten by myself (Stephen Garabedian) so that I may better understand the code structures behind the original KeyDaemon, and build upon it on my own
//Date started: 12/10/14

//Function: instantiate the game variable for the global app.
//		Give that game object the canvas, context (eventually the audioCtx as well), and the ability to get the gameState and set the gameState
//		For information on how to call these functions or access these variables, see the very bottom of this document

/*			TODO			*/
/*/
 *	
 * TOP PRIORITY:	FadeInText and CountdownTimer
 *
 *
 *	Implement a getPlayerCount() method
 *		Show the user a number of boxes they can click on
 *		Boxes will be labeled 2, 3, 4, etc. for a variable number of players
 *		When the StartScreen is up, divide it into the number of players
 *			Do this by adding the playerCount to the StartScreen constructor so it can be accessed when the StartScreen draws
 *
 *	DONE Make StartScreen.js
 *		Must have the following
 *		DONE	StartScreen(centerX, centerY) - will instantiate the rect object with the centerX and centerY parameters passed in (this.rect = {centerX:centerX,centerY:centerY};)
 *		DONE					This rect object is an element of the function calling StartScreen (in this case, gameState)
 *		DONE					Once StartScreen is called, gameState will have a rect object centered at (centerX,centerY)
 *		DONE					Rect appears to just be an array that holds these two parameters. This rect object gets passed between gamestates
 *		DONE		StartScreen.prototype.FUNCTIONNAME = function() {}
 *		DONE		StartScreen.prototype = {constructor: StartScreen};
 *		DONE		function update - if the player is ready to continue past the start screen (presses enter, hits an OK button, meets some condition that says they're ready to go)
 *				function draw - get the height of the rect, divide it by the number of players (so that you can have a horizontal rectangle for each player's color)
 *								also get the width of the rect to define how wide each rectangle should be drawn
 *								make a rectangle for each player that is <width> wide and <height segment> tall
 *								ctx.textBaseline="middle"; will make it so text will write with the center being at the Y coordinate you defined (center the text on the horizontal bar the text is written on)
 *								ctx.textAlign="start"; will make it so text will left-align to the X coordinate specified and expand to the right
 *								write the text for the title of the game, credits, directions for how the user should go about continuing onto the next game state
 *		DONE		function end - get the app's game object, and calls that variable's setCurrentGameState to (new RulesMenu(this.rect.centerX, this.rect.centerY, 10));
 *		DONE		StartScreen.prototype = {constructor: StartScreen};
 *
 *  DONE	Make RulesMenu.js
 *		Must have the following
 *		DONE	RulesMenu(centerX, centerY, time) - will give the rect object a width and height (centerX * 2, centerY * 2) and the centerX and centerY passed to it by StartScreen
 *		DONE										Set the background color and text color for the rules screen and stores the time parameter into a this.time variable
 *		DONE										Create a new countdownTimer object (this.countdownTimer = new CountdownTimer()) and set that countdownTimer's isOn attribute to true (this.countdownTimer.isOn(true))
 *		DONE										Give the rulesText array objects that are new FadeInText objects
 *		DONE	RulesMenu.prototype = {constructor: RulesMenu};
 *		DONE	function update - check if this's countdownTimer is done doing it's thing, if it is get app.game and set it's current gameState to a new GameRound object
 *		DONE					  otherwise, loop through each element of the rulesText array and call each object's update function where the parameter is a function of the speed at which the text should fade in (1 is normal, 3 is REALLY FAST)
 *		DONE								and check if the current rulesText is not done, then break (not entirely sure why this break statement is here)
 *		DONE	function draw - set the context's fill style to this's backgroundColor, use the context's fillRect to make a screen-covering box, align the text, baseline the text, size the text, 
 *		DONE																							make a colorWidth variable that's equal to context.measureText("first line of rules text").width + 50; (Why is this here?)
 *		DONE					set the font, loop through each element of the rulesText, and draw them onto the current context, then call this's CountdownTimer's draw command onto the context
 *
 *
 *	Make InputManager.js
 *		Must have the following
 *			var InputManager = { }; //This is an object
 *				give the object an empty array called keys
 *				function keyVerify: function(e){ }, - e = e || event //IE Compatibility
 *					if e's keyCode is the enter key (13) set this's keys array at 13 to e.type === 'keydown';
 *					otherwise, make a variable to track the code from the key equal to this.keycodeToChar(the keycode from e);
 *						and set the keys array at the code from the key variable to e.type === 'keydown'; //This will set this.keys[codeFromKey] to true if keydown, false if anything else
 *				function keyHandle: function (word) { }, - word.update(this.keys); //Gives the word parameter whatever keys are currently pressed
 *				function keyCodeToChar: function (code) { } - make a letter variable, set it to String.fromCharCode((96 <= code && code <= 105) ? code - 48 : code); return letter;
 *				document.addEventListener("keydown", InputManager.keyVerify.bind(InputManager));
 *				document.addEventListener("keyup", InputManager.keyVerify.bind(InputManager));
 *
 *			               __ _       _     _              _ 
 *			              / _(_)     (_)   | |            | |
 *			  _   _ _ __ | |_ _ _ __  _ ___| |__   ___  __| |
 *			 | | | | '_ \|  _| | '_ \| / __| '_ \ / _ \/ _` |
 *			 | |_| | | | | | | | | | | \__ \ | | |  __/ (_| |
 *			  \__,_|_| |_|_| |_|_| |_|_|___/_| |_|\___|\__,_|
 *
 *	Make CountdownTimer.js
 *		Must have the following
 *			               __ _       _     _              _ 
 *			              / _(_)     (_)   | |            | |
 *			  _   _ _ __ | |_ _ _ __  _ ___| |__   ___  __| |
 *			 | | | | '_ \|  _| | '_ \| / __| '_ \ / _ \/ _` |
 *			 | |_| | | | | | | | | | | \__ \ | | |  __/ (_| |
 *			  \__,_|_| |_|_| |_|_| |_|_|___/_| |_|\___|\__,_|
 *
 *	Make FadeInText.js
 *		Must have the following
 *			               __ _       _     _              _ 
 *			              / _(_)     (_)   | |            | |
 *			  _   _ _ __ | |_ _ _ __  _ ___| |__   ___  __| |
 *			 | | | | '_ \|  _| | '_ \| / __| '_ \ / _ \/ _` |
 *			 | |_| | | | | | | | | | | \__ \ | | |  __/ (_| |
 *			  \__,_|_| |_|_| |_|_| |_|_|___/_| |_|\___|\__,_|
 *
 *	Make gameRound.js
 *		Must have the following
 *			               __ _       _     _              _ 
 *			              / _(_)     (_)   | |            | |
 *			  _   _ _ __ | |_ _ _ __  _ ___| |__   ___  __| |
 *			 | | | | '_ \|  _| | '_ \| / __| '_ \ / _ \/ _` |
 *			 | |_| | | | | | | | | | | \__ \ | | |  __/ (_| |
 *			  \__,_|_| |_|_| |_|_| |_|_|___/_| |_|\___|\__,_|
 *
/*/

"use strict"

var app = (function(){
	var game; //Variable describing the game's instance
	
	function initGame(){
		var canvas = document.getElementById('gameWindow');
		var context = canvas.getContext('2d');
		//audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		//var variablePlayerCount = /*getPlayerCount() ||*/ 4;	//If I want to make the game modular enough to include a variable number of players, I can allow the number of players to be selected in a getPlayerCount() method
		var playerCount = 4;
		var centerX = canvas.width/2;
		var centerY = canvas.height/2;
		var gameState = new StartScreen(centerX, centerY/*, variablePlayerCount*/);
		var update = function(){
			gameState.update();
			gameState.draw(context);
            window.requestAnimationFrame(function () {update(); });
		}
		var getGameState = function(){
			return gameState;
		}
		var setGameState = function(newGameState){
			gameState = newGameState;
		}
		
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        update.call();
		
		return {	//When initGame is called, it will "pass" the canvas, context, get/setGameState and (eventually) audioCtx up
			canvas: canvas,			//Thus, allowing the variable that gets assigned the value of initGame access to these four (eventually five) functions/variables
			context: context,
			//audioCtx: audioCtx,
			getCurrentGameState : getGameState,
			setCurrentGameState : setGameState,
		};
	}//I think I need a comma here, right? 	//Nope actually I don't
	
	return {	//Pass up to whatever called the app function the getGame method which will return the game variable
		getGame: function() {
			if(!game){
				game = initGame();
			}
			return game;
		}
	};//Last function of the app object, so it should end with a semicolon
	
}());

app.getGame();	//Now the app calls it's get game, which will call init game (if there isn't already a game object) which sets up everything we need and sends back
				//					the canvas, context, getCurrentGameState and setCurrentGameState (eventaully audioCtx as well)
				//					these can be accessed by assigning app.getGame to a variable, then calling that variable's .initGame() function
				//					Now, whatever you assigned app.getGame's variable's.initGame() to, you can now say that variable.canvas and do stuff with the canvas
				//	EXAMPLE: var instance = app.getGame(); var currentGame = instance.initGame(); currentGame.functionCall;
				//		NOW instance can call getGame to create a new game object for a new round/game instance
				//			currentGame can call all functions of the game object that's accessable to everything that has access to app