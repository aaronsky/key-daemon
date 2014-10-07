var Core = (function () {
    var instance;

    function initInstance() {
        var objCore = {},
            canvas = document.getElementById("game-stage"),
            context = canvas.getContext('2d'),
            playerCount = /*window.prompt('player count',4) ||*/ 4,
            centerX = canvas.width / 2,
            centerY = canvas.height / 2;
        objCore.canvas = canvas;
        objCore.context = context;
        objCore.currentLevel = new Level(playerCount, centerX, centerY);

        objCore.context.textAlign = 'center';
        objCore.context.textBaseline = 'middle';
        var render = function () {
            objCore.currentLevel.update();
            objCore.currentLevel.draw(objCore.context);
            window.requestAnimationFrame(function () {render(); });
        };
        render.call();
        return objCore;
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