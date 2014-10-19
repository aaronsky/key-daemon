//Doug's Javascript. Direct all hate to Doug.
"use strict";

function RulesMenu(centerX, centerY, time) {
    this.rect = {
        centerX: centerX,
        centerY: centerY
    };
    this.backgroundColor = "#545252";
    this.textColor = "#CDCDCD";
    this.time = time;
    this.spinner = new LoadSpinner(200,
                                   time,
                                   "#DCDCDB",
                                   "#6D6D6D",
                                   this.rect.centerX * 2 - 230,
                                   this.rect.centerY * 2 - 230);
    this.spinner.isOn(true);
    this.rulesTexts = [
        new RuleFadeIn(50, 50, 3, "Pick A Color"),
        new RuleFadeIn(50, 150, 3, "Type Your Word"),
        new RuleFadeIn(50, 250, 3, "Use One Finger"),
        new RuleFadeIn(50, 350, 3, "You Have 2 Minutes")
    ];
    
}

RulesMenu.prototype = {constructor: RulesMenu};

RulesMenu.prototype.slideUp = function () {

};

RulesMenu.prototype.animate = function () {

};

RulesMenu.prototype.update = function () {
    var i = 0,
        len = this.rulesTexts.length;
    for (i; i < len; i += 1) {
        this.rulesTexts[i].update(1);
        if (!this.rulesTexts[i].done) {
            break;
        }
    }
    this.spinner.update();

};

RulesMenu.prototype.draw = function (ctx) {
    if (!this.spinner.isDone()) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0,
                     0,
                     this.rect.centerX * 2,
                     this.rect.centerY * 2);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'hanging';
        var textSize = 30,
            colorWidth = ctx.measureText("Pick A Color").width + 50;
        ctx.font = 'normal ' + textSize + 'pt Raleway Light';

        this.text1.draw(ctx);
        this.text2.draw(ctx);
        this.text3.draw(ctx);
        this.text4.draw(ctx);

        this.spinner.draw(ctx);
    }
};
