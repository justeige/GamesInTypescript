/// <reference path="vector.ts" />
/// <reference path="ball.ts" />
/// <reference path="brick.ts" />



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
    }

    // draw game elements
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