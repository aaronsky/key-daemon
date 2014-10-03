(function () {
    "use strict";
    var canvas = document.getElementById("game-stage");
    var context = canvas.getContext('2d');
    var playerCount = window.prompt('player count',4) || 4;
    var centerX = canvas.width / 2,
        centerY = canvas.height / 2;
    var level = new Level(playerCount, centerX, centerY);

    context.textAlign = 'center';
    context.textBaseline = 'middle';
    var render = function () {
        level.update();
        level.draw(context);
        window.requestAnimationFrame(function () {render(); });
    };
    render.call();
}());