//Stephen's JS for the startScreen
//When the core instantiates the level variable for the first time
//  It will be set to a startScreen object
//  StartScreen will then set the core's level to a RulesMenu object when the StartScreen is done
//    -  Set the core's current level with core.getInstance().currentLevel;

"use strict";

function StartScreen(centerX, centerY)  {
    this.rect = {
        centerX: centerX,
        centerY: centerY
    };
    
    this.backgroundColor = "#545252";
    this.textColor = "#CDCDCD";
    this.titleText = [
        new RuleFadeIn(50, 50, 3, "Insert Working Title Here"),
        new RuleFadeIn(50, 150, 5, "A game by Aaron Sky, Richard Weiss, Doug Wattro and Stephen Garabedian"),
        new RuleFadeIn(50, 250, 3, "Press Enter to Start")
    ];
    
}

StartScreen.prototype = {constructor: StartScreen};

StartScreen.prototype.update = function () {
    var i = 0,
        len = this.titleText.length;
    for (i; i < len; i += 1) {
        this.titleText[i].update(1);
        if (!this.titleText[i].done) {
            break;
        }
    }
    //Add a mouse event listener and a keyboard event listener
    //Both a click on the button, or an enter keypress should call the end function
    if ( InputManager.keys[ 13 ] ){ // OR when the player clicks on a "go" button
        this.end();   
    }
}

StartScreen.prototype.draw = function (ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.rect.centerX * 2, this.rect.centerY * 2);
    ctx.fillStyle = this.textColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'hanging';
    var textSize = 30,
        colorWidth = ctx.measureText("Insert Working Title Here").width + 50;
    ctx.font = 'normal ' + textSize + 'pt Raleway Light';
    
    var i = 0,
    len = this.titleText.length;
    for (i; i < len; i ++ ) {
            this.titleText[i].draw(ctx);   
    }    
}

StartScreen.prototype.end = function () {
    var instance = Core.getInstance();
    instance.setCurrentLevel(new RulesMenu(this.rect.centerX, this.rect.centerY, 8));
}