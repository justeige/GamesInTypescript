class Ball {
    public x: number;
    public y: number;
    
    private velocity: Vector;
    private radius: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(startX: number, startY: number, canvas: HTMLCanvasElement) {
        this.x = startX;
        this.y = startY;
        // start velocity (for testing!)
        this.velocity = new Vector(3, 5);
        this.radius = 20;
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d");
    }

    setVelocity(dx: number, dy: number): void {
        this.velocity.x = dx;
        this.velocity.y = dy;
    }

    getVelocity(): Vector {
        return this.velocity;
    }

    getRadius(): number {
        return this.radius;
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    applySpeed(): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    checkEdges(): boolean {
        
        // bouncing left or right
        var screenWidth = this.canvas.width - this.radius;
        if  (this.x + this.velocity.x >  screenWidth) {
            this.x = screenWidth;
            this.velocity.x = - this.velocity.x;
        } else if (this.x + this.velocity.x < this.radius) {
            this.x = this.radius;
            this.velocity.x = - this.velocity.x;
        }
    
         // bouncing bottom or top
        var screenHeight = this.canvas.height - this.radius;
        if (this.y + this.velocity.y > screenHeight) {
            // collision with bottom == lose
            return true;
        } else if (this.y + this.velocity.y < this.radius) {
            this.y = this.radius;
            this.velocity.y = - this.velocity.y;
        }

        // didn't collide with bottom
        return false;
    }
}
