"use strict";
var InputManager = {
    keys: [],
    keyVerify: function (e) {
        e = e || event; //IE Compatibility
        this.keys[e.keyCode] = e.type === 'keydown'; //true if keydown event, 
                                                     //false if anything else
    },
    keyHandle: function (word) {
        word.update(this.keys);
    }
};

document.addEventListener("keydown", InputManager.keyVerify.bind(InputManager));

document.addEventListener("keyup", InputManager.keyVerify.bind(InputManager));
