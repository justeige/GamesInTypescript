class Paddle {
    public x: number;
    public y: number;
    
    private width: number;
    private height: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(startX: number, startY: number, canvas: HTMLCanvasElement) {
        this.x = startX;
        this.y = startY;
        this.width = 120;
        this.height = 15;
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "rgba(0,255,0,1.0)";                        
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    collide(ball: Ball): number {
        let x = ball.x;
        let y = ball.y;
        let radius = ball.getRadius();
        var dy = ball.getVelocity().y;

        if (x + radius > this.x && x - radius < this.x + this.width
            && y + radius > this.y && y - radius < this.y + this.height) {
            return - dy; // collided
        }

        return dy; // do nothing
    }
}