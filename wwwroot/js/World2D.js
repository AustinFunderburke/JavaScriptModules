'use strict';

var World2D = function (context, width, height) {

    var _ctx = context;
    var _width = width;
    var _height = height;
    var _paddle = null;
    var _ball = null;
    var _score = 0;

    this.init = function _init() {

        _paddle = new Object2D();
        _paddle.setPosition(_width / 2, _height - 25);
        _paddle.addVertex(-20, -10);
        _paddle.addVertex(-20, 10);
        _paddle.addVertex(20, 10);
        _paddle.addVertex(20, -10);

        _ball = new Object2D();
        _ball.setPosition(_width / 2, _height / 2);
        _ball.addVertex(-5, -5);
        _ball.addVertex(-5, 5);
        _ball.addVertex(5, 5);
        _ball.addVertex(5, -5);
        _ball.setFillColor('yellow');
        _ball.setLineColor('yellow');

        _ball.setDirection(1, 1);
        _ball.setSpeed(100);

    };

    this.render = function _render() {

        _ctx.fillStyle = "rgb(0,0,0)";
        _ctx.fillRect(0, 0, _width, _height);
        _ctx.strokeStyle = "rgb(255,255,255)";

        _ctx.font = '48px serif';
        _ctx.fillStyle = 'rgba(255, 165, 0, 1)';
        _ctx.strokeText('Score:' + _score, 10, 50);
        _ctx.fillText('Score:' + _score, 10, 50);

        _paddle.render(_ctx);
        _ball.render(_ctx);

    };

    this.update = function _update(tickLengthMS) {
        _ball.move(tickLengthMS);

        let ballPos = _ball.getPosition();
        let paddlePos = _paddle.getPosition();
        let dir = _ball.getDirection();

        // ball hitting paddle
        let diff = paddlePos.y - ballPos.y;
        if (ballPos.x > paddlePos.x - 20) {
            if (ballPos.x < paddlePos.x + 20) {
                if (diff < 10) {
                    let newDir = dir.reflect(new Vector2D(0, 1));
                    _ball.setDirection(newDir.x, newDir.y); // sets balls direction
                    _ball.updateSpeed(10);
                    _score += 5;                           // score increase
                    return;
                }
            }
        }
        // bottom
        if (ballPos.y > _height) {
            let newDir = dir.reflect(new Vector2D(0, 1));
            _ball.setDirection(newDir.x, newDir.y);
            _ball.updateSpeed(30);
            _score -= 3;
        }
        // top 
        else if (ballPos.y < 0) {
            let newDir = dir.reflect(new Vector2D(0, -1));
            _ball.setDirection(newDir.x, newDir.y);       // sets balls direction
            _ball.updateSpeed(5);
        }
        // right side
        else if (ballPos.x > _width) {

            let newDir = dir.reflect(new Vector2D(-1, 0));
            _ball.setDirection(newDir.x, newDir.y);      // sets balls direction
            _ball.updateSpeed(5);
        }
        // left side
        else if (ballPos.x < 0) {

            let newDir = dir.reflect(new Vector2D(1, 0));
            _ball.setDirection(newDir.x, newDir.y);
            _ball.updateSpeed(5);
        }
        // Score to speed 
        if (_score >= 60) {

            _score = 0;
            _ball.setSpeed(100);
        }

    };

    // this moves the ball
    this.getPaddle = function _getPaddle() {
        return _paddle;
    };

};

