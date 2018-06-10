// game setup
var canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
setInterval(draw, 10);
var btnBack = <HTMLButtonElement> document.getElementById("btnBack");
btnBack.onclick = redoAction;
var btnRestart = <HTMLButtonElement> document.getElementById("btnRestart");
btnRestart.onclick = resetGame;
var paused = false;

// main draw function
function draw(): void {
    
    // screen needs manual cleanup
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw game elements
    drawGrid(ctx, canvas);
}

function redoAction(): void {
    alert("Not implemented yet!");
}

function resetGame(): void {
    document.location.reload();
}

function drawGrid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {

    const lineWidth = 4;
    let w = canvas.width;
    let h = canvas.height;
    let step = h / 8;

    ctx.beginPath(); 
    for (var x = 0;x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    ctx.strokeStyle = 'rgb(20,20,20)';
    ctx.lineWidth = lineWidth;
    
    ctx.stroke(); 
    ctx.beginPath(); 
    for (var y = 0;y <= h;y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    
    ctx.strokeStyle = 'rgb(20,20,20)';
    ctx.lineWidth = lineWidth;
    ctx.stroke(); 
}