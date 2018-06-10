"use strict";
class Ball {
    constructor(startX, startY, canvas) {
        this.x = startX;
        this.y = startY;
        this.dx = 3;
        this.dy = 5;
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
class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }
}
class BrickWall {
    constructor(canvas) {
        this.maxRows = 5;
        this.maxColumns = 7;
        this.maxBricks = this.maxColumns * this.maxRows;
        this.brickWidth = 100;
        this.brickHeight = 30;
        this.padding = 20;
        const offsetLeft = 100;
        const offsetTop = 100;
        this.ctx = canvas.getContext("2d");
        this.bricks = [];
        for (var column = 0; column < this.maxColumns; column++) {
            this.bricks[column] = [];
            for (var row = 0; row < this.maxRows; row++) {
                let x = (column * (this.brickWidth + this.padding)) + offsetLeft;
                let y = (row * (this.brickHeight + this.padding)) + offsetTop;
                this.bricks[column][row] = new Brick(x, y);
            }
        }
    }
    draw() {
        for (var column = 0; column < this.maxColumns; column++) {
            for (var row = 0; row < this.maxRows; row++) {
                let brick = this.bricks[column][row];
                if (brick.alive) {
                    this.ctx.beginPath();
                    let { x, y } = brick;
                    this.ctx.rect(x, y, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "rgba(0,0,255,1.0)";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }
    collide(x, y, dy) {
        for (var column = 0; column < this.maxColumns; column++) {
            for (var row = 0; row < this.maxRows; row++) {
                let brick = this.bricks[column][row];
                if (brick.alive) {
                    if (x > brick.x && x < brick.x + this.brickWidth
                        && y > brick.y && y < brick.y + this.brickHeight) {
                        this.bricks[column][row].alive = false;
                        return -dy;
                    }
                }
            }
        }
        return dy;
    }
}
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
const startX = canvas.width / 2;
const startY = canvas.height - 20;
var ball = new Ball(startX, startY, canvas);
var bricks = new BrickWall(canvas);
var paused = false;
setInterval(draw, 10);
var btnPause = document.getElementById("btnPause");
btnPause.onclick = tooglePause;
var btnRestart = document.getElementById("btnRestart");
btnRestart.onclick = resetGame;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!paused) {
        ball.applySpeed();
        ball.checkEdges();
        ball.dy = bricks.collide(ball.x, ball.y, ball.dy);
    }
    ball.draw();
    bricks.draw();
}
function tooglePause() {
    paused = !paused;
    btnPause.value = paused ? "Continue" : "Pause";
}
function resetGame() {
    document.location.reload();
}
