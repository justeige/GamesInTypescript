"use strict";
class Ball {
    constructor(startX, startY, canvas) {
        this.x = startX;
        this.y = startY;
        this.dx = 20;
        this.dy = 20;
        this.radius = 20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.ctx.fill();
        this.ctx.closePath();
    }
    applySpeed() {
        this.x += this.dx;
        this.y += this.dy;
    }
    checkEdges() {
        var screenWidth = this.canvas.width - this.radius;
        if (this.x + this.dx > screenWidth) {
            this.x = screenWidth;
            this.dx = -this.dx;
        }
        else if (this.x + this.dx < this.radius) {
            this.x = this.radius;
            this.dx = -this.dx;
        }
        var screenHeight = this.canvas.height - this.radius;
        if (this.y + this.dy > screenHeight) {
            this.y = screenHeight;
            this.dy = -this.dy;
        }
        else if (this.y + this.dy < this.radius) {
            this.y = this.radius;
            this.dy = -this.dy;
        }
    }
}
class BrickWall {
    constructor(canvas) {
        this.maxColumns = 7;
        this.maxRows = 5;
        this.brickWidth = 100;
        this.brickHeight = 30;
        this.padding = 20;
        this.ctx = canvas.getContext("2d");
    }
    draw() {
        const offsetLeft = 100;
        const offsetTop = 100;
        for (var column = 0; column < this.maxColumns; column++) {
            for (var row = 0; row < this.maxRows; row++) {
                this.ctx.beginPath();
                var x = (column * (this.brickWidth + this.padding)) + offsetLeft;
                var y = (row * (this.brickHeight + this.padding)) + offsetTop;
                this.ctx.rect(x, y, this.brickWidth, this.brickHeight);
                this.ctx.fillStyle = "rgba(0,0,255,1.0)";
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var ball = new Ball(canvas.width / 2, canvas.height - 20, canvas);
var bricks = new BrickWall(canvas);
setInterval(draw, 10);
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.applySpeed();
    ball.checkEdges();
    ball.draw();
    bricks.draw();
}
