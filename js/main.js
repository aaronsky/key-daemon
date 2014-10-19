"use strict";

var Core = (function () {
    var instance;

    function initInstance() {
        var canvas = document.getElementById("game-stage"),
            context = canvas.getContext('2d'),
			//audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
            playerCount = /*window.prompt('player count',4) ||*/ 4,
            centerX = canvas.width / 2,
            centerY = canvas.height / 2,
            level = new Level(playerCount, centerX, centerY),
            render = function () {
                level.update();
                level.draw(context);
                window.requestAnimationFrame(function () {render(); });
            };

        context.textAlign = 'center';
        context.textBaseline = 'middle';
        render.call();
        
        return {
            canvas: canvas,
            context: context,
			//audioCtx: audioCtx,
            currentLevel: level
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = initInstance();
            }
            return instance;
        }
    };
}());

Core.getInstance();