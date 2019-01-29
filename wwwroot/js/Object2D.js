'use strict';
var Object2D = function _object2D() {
    var _position = new Vector2D(0, 0);
    var _vertices = [];
    var _lineColor = 'red';
    var _fillColor = 'white';
    var _dir = new Vector2D(0, 0);
    var _speed = 2;

    this.setDirection = function _setDirection(x, y) {
        _dir.x = x;
        _dir.y = y;
        _dir = _dir.normalized();
    };

    this.setSpeed = function _setSpeed(speed) {
        _speed = speed;
    };

    this.updateSpeed = function _updateSpeed(delta) {
        _speed += delta;
    };

    this.move = function _move(elapsedTimeMS) {
        let velocity = _dir.multiply(_speed * (elapsedTimeMS / 1000));
        _position = _position.add(velocity);
    };

    this.setPosition = function (x, y) {
        _position.x = x;
        _position.y = y;
    };

    this.addVertex = function _addVertex(x, y) {
        _vertices.push({ x: x, y: y });
    };

    this.render = function _render(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = _lineColor;
        ctx.fillStyle = _fillColor;

        let x = _position.x + _vertices[0].x;
        let y = _position.y + _vertices[0].y;
        ctx.moveTo(x, y);
        for (let i = 1; i < _vertices.length; i++) {
            x = _position.x + _vertices[i].x;
            y = _position.y + _vertices[i].y;
            ctx.lineTo(x, y);
        }

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };


    this.setLineColor = function _setLineColor(lineColor) {
        _lineColor = lineColor;
    };

    this.setFillColor = function _setFillColor(fillColor) {
        _fillColor = fillColor;
    };

    this.getPosition = function _getPosition() {
        return _position;
    };

    this.getDirection = function _getDirection() {
        return _dir;
    };

};
