"use strict";
class Ball {
    constructor(startX, startY, canvas) {
        this.x = startX;
        this.y = startY;
        this.velocity = new Vector(3, 5);
        this.radius = 20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    setVelocity(dx, dy) {
        this.velocity.x = dx;
        this.velocity.y = dy;
    }
    getVelocity() {
        return this.velocity;
    }
    getRadius() {
        return this.radius;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.ctx.fill();
        this.ctx.closePath();
    }
    applySpeed() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    checkEdges() {
        var screenWidth = this.canvas.width - this.radius;
        if (this.x + this.velocity.x > screenWidth) {
            this.x = screenWidth;
            this.velocity.x = -this.velocity.x;
        }
        else if (this.x + this.velocity.x < this.radius) {
            this.x = this.radius;
            this.velocity.x = -this.velocity.x;
        }
        var screenHeight = this.canvas.height - this.radius;
        if (this.y + this.velocity.y > screenHeight) {
            return true;
        }
        else if (this.y + this.velocity.y < this.radius) {
            this.y = this.radius;
            this.velocity.y = -this.velocity.y;
        }
        return false;
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
        this.aliveCount = 0;
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
        this.aliveCount = this.maxBricks;
    }
    anyAlive() {
        return this.aliveCount > 0;
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
    collide(ball) {
        let x = ball.x;
        let y = ball.y;
        let radius = ball.getRadius();
        var dy = ball.getVelocity().y;
        for (var column = 0; column < this.maxColumns; column++) {
            for (var row = 0; row < this.maxRows; row++) {
                let brick = this.bricks[column][row];
                if (brick.alive) {
                    if (x + radius > brick.x && x - radius < brick.x + this.brickWidth
                        && y + radius > brick.y && y - radius < brick.y + this.brickHeight) {
                        this.aliveCount--;
                        this.bricks[column][row].alive = false;
                        return -dy;
                    }
                }
            }
        }
        return dy;
    }
}
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Paddle {
    constructor(startX, startY, canvas) {
        this.x = startX;
        this.y = startY;
        this.width = 120;
        this.height = 15;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "rgba(0,255,0,1.0)";
        this.ctx.fill();
        this.ctx.closePath();
    }
    collide(ball) {
        let x = ball.x;
        let y = ball.y;
        let radius = ball.getRadius();
        var dy = ball.getVelocity().y;
        if (x + radius > this.x && x - radius < this.x + this.width
            && y + radius > this.y && y - radius < this.y + this.height) {
            return -dy;
        }
        return dy;
    }
}
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
const startX = canvas.width / 2;
const startY = canvas.height / 2;
var ball = new Ball(startX, startY, canvas);
var bricks = new BrickWall(canvas);
var paused = false;
setInterval(draw, 10);
var btnPause = document.getElementById("btnPause");
btnPause.onclick = tooglePause;
var btnRestart = document.getElementById("btnRestart");
btnRestart.onclick = resetGame;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyPressedEvent, false);
document.addEventListener("keyup", keyReleasedEvent, false);
var paddle = new Paddle(canvas.width / 2, canvas.height - 20, canvas);
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!paused) {
        ball.applySpeed();
        if (ball.checkEdges()) {
            alert("Game over!");
            paused = true;
            return;
        }
        var dy = bricks.collide(ball);
        ball.setVelocity(ball.getVelocity().x, dy);
        dy = paddle.collide(ball);
        ball.setVelocity(ball.getVelocity().x, dy);
        if (rightPressed) {
            paddle.x += 5;
        }
        if (leftPressed) {
            paddle.x -= 5;
        }
        if (!bricks.anyAlive()) {
            alert("You won!");
            paused = true;
            return;
        }
    }
    ball.draw();
    bricks.draw();
    paddle.draw();
}
function tooglePause() {
    paused = !paused;
    btnPause.value = paused ? "Continue" : "Pause";
}
function resetGame() {
    document.location.reload();
}
function keyPressedEvent(e) {
    if (e.keyCode == 68) {
        rightPressed = true;
    }
    else if (e.keyCode == 65) {
        leftPressed = true;
    }
}
function keyReleasedEvent(e) {
    if (e.keyCode == 68) {
        rightPressed = false;
    }
    else if (e.keyCode == 65) {
        leftPressed = false;
    }
}
