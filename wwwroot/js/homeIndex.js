'use strict';

(function _main() {

    var canvas = document.getElementById("drawingArea");
    var ctx = canvas.getContext("2d");

    let world = new World2D(ctx, canvas.width, canvas.height);

    canvas.onmousemove = function _movePaddle(event) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = Math.floor(event.clientX - rect.x);
        let paddle = world.getPaddle();
        paddle.setPosition(mouseX, canvas.height - 25);
    }


    let engineLoop = new EngineLoop(world);
    engineLoop.initialize();
    engineLoop.run();

})();