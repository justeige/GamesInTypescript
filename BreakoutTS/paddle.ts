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
        this.height = 30;
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
    
}