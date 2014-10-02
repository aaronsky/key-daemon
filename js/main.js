"use strict";

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
})();

(function() {
    var canvas = document.getElementById("game-stage"),
        context = canvas.getContext('2d');
    
    var render = function () {
        requestAnimFrame(function(){render()});
    };
    render.call();
}());