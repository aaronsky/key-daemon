(function () {
    "use strict";
    
    var InputManager = {
        keys = [],
        keyVerify = function (e) {
        e = e || event; //IE Compatibility
        keys[e.keyCode] = e.type === 'keydown'; //true if keydown event, 
                                                //false if anything else
        },
        keyHandle = function (word) {
                word.update(keys);
        }
    };

 document.addEventListener("keydown", InputManager.keyVerify);

document.addEventListener("keyup", InputManager.keyVerify);
}());