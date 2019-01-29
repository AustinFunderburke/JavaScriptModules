'use strict';

class Vector2D {
    constructor(x, y) {
        // this makes the varitable private
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalized() {
        var mag = this.magnitude();
        return new Vector2D(this.x / mag, this.y / mag);
    }

    negated() {
        return new Vector2D(-this.x, -this.y);
    }

    vectorTo(vector) {
        return new Vector2D(vector.x - this.x, vector.y - this.y);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    project(axis) {
        return axis.multiply(this.dot(axis));
    }

    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    reflect(axis) {
        let neg = this.negated().normalized();
        let proj = neg.project(axis);
        let toNeg = proj.vectorTo(neg);
        return proj.add(toNeg.negated());
    }
}