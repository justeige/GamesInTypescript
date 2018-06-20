class Brick {
    public x: number;
    public y: number;
    public alive: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }
}

class BrickWall {

    private readonly maxRows = 5;
    private readonly maxColumns = 7;
    private readonly maxBricks = this.maxColumns * this.maxRows;
    private brickWidth = 100;
    private brickHeight = 30;
    private padding = 20;
    private ctx: CanvasRenderingContext2D;
    private bricks: Brick[][];
    private aliveCount = 0;

    constructor(canvas: HTMLCanvasElement) {
        const offsetLeft = 100;
        const offsetTop = 100;
        this.ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
        this.bricks = [];
        for (var column = 0; column < this.maxColumns; column++) {
            this.bricks[column] = [];
            for (var row = 0; row < this.maxRows; row++) {
                let x = (column * (this.brickWidth + this.padding)) + offsetLeft;
                let y = (row * (this.brickHeight + this.padding)) + offsetTop;
                this.bricks[column][row] = new Brick(x,y);
            }
        }
        this.aliveCount = this.maxBricks;
    }

    anyAlive(): boolean {
        return this.aliveCount > 0;
    }

    draw(): void {
        for (var column = 0; column < this.maxColumns; column++) {
            for (var row = 0; row < this.maxRows; row++) {
                let brick = this.bricks[column][row];
                if (brick.alive) {
                    this.ctx.beginPath();
                    let {x, y} = brick;
                    this.ctx.rect(x, y, this.brickWidth, this.brickHeight);
                    this.ctx.fillStyle = "rgba(0,0,255,1.0)";                        
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }   
        }
    }

    collide(ball: Ball): number {
        let x = ball.x;
        let y = ball.y;
        let radius = ball.getRadius();
        var dy = ball.getVelocity().y;
        for(var column = 0; column < this.maxColumns; column++) {
            for(var row = 0; row < this.maxRows; row++) {
                let brick = this.bricks[column][row];
                if (brick.alive) {
                    if (x + radius > brick.x && x - radius < brick.x + this.brickWidth
                     && y + radius > brick.y && y - radius < brick.y + this.brickHeight) {
                        this.aliveCount--;
                        this.bricks[column][row].alive = false;
                        return - dy; // collided with one brick
                    }
                }
            }
        }
        return dy; // do nothing
    }
}