/// TODO move into its own file
class Ball {
    public x: number;
    public y: number;
    public dx: number;
    public dy: number;
    
    private radius: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(startX: number, startY: number, canvas: HTMLCanvasElement) {
        this.x = startX;
        this.y = startY;
        this.dx = 5;
        this.dy = 5;
        this.radius = 20;
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    applySpeed(): void {
        this.x += this.dx;
        this.y += this.dy;
    }

    checkEdges(): void {
        
        // bouncing left or right
        var screenWidth = this.canvas.width - this.radius;
        if  (this.x + this.dx >  screenWidth) {
            this.x = screenWidth;
            this.dx = - this.dx;
        } else if (this.x + this.dx < this.radius) {
            this.x = this.radius;
            this.dx = - this.dx;
        }
    
         // bouncing bottom or top
        var screenHeight = this.canvas.height - this.radius;
        if (this.y + this.dy > screenHeight) {
            this.y = screenHeight;
            this.dy = - this.dy;
        } else if (this.y + this.dy < this.radius) {
            this.y = this.radius;
            this.dy = - this.dy;
        }
    }
}

class BrickWall {
    private maxColumns = 7;
    private maxRows = 5;
    private brickWidth = 100;
    private brickHeight = 30;
    private padding = 20;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
    }

    draw(): void {
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