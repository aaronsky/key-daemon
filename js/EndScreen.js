"use strict";

function EndScreen(scores, centerX, centerY) {
    this.scores = scores || [];
    this.rect = {
        centerX: centerX,
        centerY: centerY
    };
    this.backgroundColor = "#545252";
    this.textColor = "#CDCDCD";
}

EndScreen.prototype = {constructor: EndScreen};

EndScreen.prototype.update = function () {
};

EndScreen.prototype.draw = function (ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0,
                 0,
                 this.rect.width,
                 this.rect.height);
    this.fillStyle = this.textColor;
    var i = 0,
        len = this.scores.length;
    for (i; i < len; i += 1) {
        ctx.fillText('Player ' + (i + 1) + "got " + this.scores[i] + " points!", this.rect.centerX - 43, (i * 75));
    }
};