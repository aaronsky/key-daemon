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
    var canvas = document.getElementById("game-stage"),
        context = canvas.getContext('2d'),
        level = new Level();

    var render = function () {
        level.update();
        level.draw(context);
        window.requestAnimFrame(function () {render(); });
    };
    render.call();
}());