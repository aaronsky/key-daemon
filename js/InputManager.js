/*InputManager*/

//Author: Stephen Garabedian
//Date started: 12/12/14

//Function: Detects our keypresses and allows other classes to test which keys are currently pressed

'use strict'; 

var InputManager = {
	keysPressed: [],
	keyDown: function (e) {
		e = e;
		if( e.keyCode == 13 ) {	//Have to check for this specifically, keycodeToChar will read an 'enter' as an empty character. And querying for keysPressed[""] wouldn't be clear. Instead I explicitly create keysPressed[13] for this case with 13 representing the key value for the 'enter' key
			this.keysPressed[13] = e.type === 'keydown';	//keysPressed[13] is true if they keytype is EXACTLY keydown
		} else {
			var codeFromKey = this.keycodeToChar(e.keyCode);
			this.keysPressed[codeFromKey] = e.type === 'keydown'; //again, true if there's a keydown event, false otherwise
		}
	},
	keyUp: function (e) {
		e = e;
		if( e.keyCode == 13 ) {
			this.keysPressed[13] = e.type !== 'keyup';
		} else {
			var codeFromKey = this.keycodeToChar(e.keyCode);
			this.keysPressed[codeFromKey] = e.type !== 'keyup'; //true if there's a keyup event for this key
		}
	},
	keyHandle: function (word) {
		word.update(this.keysPressed);	//Pass to the word parameter whatever keys are currently pressed
	},
	keycodeToChar: function (code) {
		var letter = String.fromCharCode((96 <= code && code <= 105) ? code - 48 : code);	//If our coded letter is between 96 and 105 it's a numpad number, so just set it to the normal number row keycode value
		return letter;
	}
};

document.addEventListener('keydown', InputManager.keyDown.bind(InputManager));

document.addEventListener('keyup', InputManager.keyUp.bind(InputManager));