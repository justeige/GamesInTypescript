/// <reference path="vector.ts" />
/// <reference path="ball.ts" />
/// <reference path="brick.ts" />
/// <reference path="paddle.ts" />


// game setup
var canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
const startX = canvas.width / 2;
const startY = canvas.height - 20;
var ball = new Ball(startX, startY, canvas); // spawn at bottom screen center
var bricks = new BrickWall(canvas);
var paused = false;
setInterval(draw, 10);
var btnPause = <HTMLButtonElement> document.getElementById("btnPause");
btnPause.onclick = tooglePause;
var btnRestart = <HTMLButtonElement> document.getElementById("btnRestart");
btnRestart.onclick = resetGame;

var rightPressed: boolean = false;
var leftPressed: boolean = false;

document.addEventListener("keydown", keyPressedEvent, false);
document.addEventListener("keyup", keyReleasedEvent, false);

var paddle = new Paddle(canvas.width / 2, canvas.height - 20, canvas);


// main draw function
function draw() {
    
    // screen needs manual cleanup
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!paused) {
        // apply physics
        ball.applySpeed();
        ball.checkEdges();
        var dy = bricks.collide(ball.x, ball.y, ball);
        ball.setVelocity(ball.getVelocity().x, dy);

        // apply user input
        if (rightPressed) {
            paddle.x += 5;
        } 
        if (leftPressed) {
            paddle.x -= 5;
        } 
    }

    // draw game elements
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

function keyPressedEvent(e: KeyboardEvent) {
    if(e.keyCode == 68) {
        rightPressed = true;
    }
    else if(e.keyCode == 65) {
        leftPressed = true;
    }
}

function keyReleasedEvent(e: KeyboardEvent) {
    if(e.keyCode == 68) {
        rightPressed = false;
    }
    else if(e.keyCode == 65) {
        leftPressed = false;
    }
}