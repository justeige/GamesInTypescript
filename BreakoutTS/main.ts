/// TODO move into its own file
class Ball {
    public x: number;
    public y: number;

    private radius: number;
    private ctx: CanvasRenderingContext2D;

    constructor(startX: number, startY: number, canvas: HTMLCanvasElement) {
        this.x = startX;
        this.y = startY;
        this.radius = 20;
        this.ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.ctx.fill();
        this.ctx.closePath();
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
var ball = new Ball(canvas.width / 2, canvas.height - 20, canvas); // spawn at bottom screen center
var bricks = new BrickWall(canvas);
setInterval(draw, 10);


// main draw function
function draw() {
    
    // screen needs manual cleanup
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw game elements
    ball.draw();
    bricks.draw();

    
}

