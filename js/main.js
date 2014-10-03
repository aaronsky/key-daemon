// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    "use strict";
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}());

(function () {
    "use strict";
    var canvas = document.getElementById("game-stage");
    var context = canvas.getContext('2d');
    var level = new Level(4);
    var centerX = canvas.width / 2,
        centerY = canvas.height / 2;

    var render = function () {
        level.update();
        level.draw(context, centerX, centerY);
        window.requestAnimFrame(function () {render(); });
    };
    render.call();
}());