let piCanvas: ResizingCanvas = document.getElementById('piCanvas') as ResizingCanvas;
let piCtx: CanvasRenderingContext2D = piCanvas.getContext('2d') as CanvasRenderingContext2D;
let filledCanvas: ResizingCanvas = document.getElementById('filledCanvas') as ResizingCanvas;
let filledCtx: CanvasRenderingContext2D = filledCanvas.getContext('2d') as CanvasRenderingContext2D;
let piText: HTMLDivElement = document.getElementById('piValue') as HTMLDivElement;

piCanvas.customResize = () => {
    reset();
    darts.forEach(d => d.draw(piCtx));
}

filledCanvas.customResize = () => {
    fill();
}

let timeoutDelay = 100;
let maxTimeoutDelay = 250;
let minTimeoutDelay = 1;
let currentTimeoutId: number | undefined = undefined;

function goFaster(): void {
    timeoutDelay = Math.max(minTimeoutDelay, timeoutDelay - 50);
    clearTimeout(currentTimeoutId);
    currentTimeoutId = setTimeout(() => loop(), timeoutDelay);
}

function goSlower() {
    timeoutDelay = Math.min(maxTimeoutDelay, timeoutDelay + 50);
    clearTimeout(currentTimeoutId);
    currentTimeoutId = setTimeout(() => loop(), timeoutDelay);
}


let darts: Dart[] = [];
let dartsInCircleCount = 0;
let maxDarts = 100000;

let bgColor = '#282a36';
let piColor = '#50fa7b';
let circleColor = '#44475a';
let dartInCircleColor = '#50fa7b';
let dartNotInCircleColor = '#ff5555';

function fill() {
    filledCtx.fillStyle = dartNotInCircleColor;
    filledCtx.fillRect(0, 0, filledCanvas.width, filledCanvas.height);
    filledCtx.fillStyle = dartInCircleColor;
    filledCtx.beginPath();
    filledCtx.arc(filledCanvas.width / 2, filledCanvas.height / 2, filledCanvas.width / 2, 0, 2 * Math.PI);
    filledCtx.closePath();
    filledCtx.fill();
}

class Dart {
    public x: number;
    public y: number;
    constructor() {
        this.x = Math.random() * 2 - 1;
        this.y = Math.random() * 2 - 1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.isInCircle()) {
            ctx.fillStyle = dartInCircleColor;
        } else {
            ctx.fillStyle = dartNotInCircleColor;
        }
        ctx.beginPath();
        let drawX = ((this.x + 1) / 2) * piCanvas.width;
        let drawY = ((this.y + 1) / 2) * piCanvas.width;
        ctx.arc(drawX, drawY, 2, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    isInCircle(): boolean {
        return (this.x ** 2 + this.y ** 2) ** 0.5 < 1;
    }
}

function drawBackground(): void {
    console.log('filling bg');
    piCtx.fillStyle = bgColor;
    piCtx.fillRect(0, 0, piCanvas.width, piCanvas.height);
}

function reset(): void {
    drawBackground();
    drawCircle();
}

function drawCircle(): void {
    piCtx.strokeStyle = circleColor;
    piCtx.beginPath();
    piCtx.arc(piCanvas.width / 2, piCanvas.height / 2, piCanvas.width / 2, 0, 2 * Math.PI);
    piCtx.stroke();
}

function loop(): void {
    if (darts.length < maxDarts) {
        let dart = new Dart();
        dart.draw(piCtx);
        darts.push(dart);
        if (dart.isInCircle()) {
            dartsInCircleCount += 1;
        }
        let pi = calculatePi(darts, dartsInCircleCount);
        drawPi(pi);
        currentTimeoutId = setTimeout(() => loop(), timeoutDelay);
    }
}

function drawPi(pi) {
    piText.innerHTML = 
    `Dots: ${darts.length}<br>` + 
    `Dots in circle: ${dartsInCircleCount}<br>` + 
    `Computed pi value: ${pi.toFixed(3)}<br>` + `
    % Error: ${(Math.abs(pi - Math.PI) / Math.PI * 100).toFixed(3)}`;
}

function calculatePi(darts , dartsInCircleCount) {
    let totalDarts = darts.length
    // area of circle = pi * r ^ 2
    // area of square = (2 * r) ^ 2 = 4r^2
    // dartsInCircle / totalDarts = pi / 4
    // pi = dartsInCircle / totalDarts * 4
    return dartsInCircleCount / totalDarts * 4
}

fill();
reset();
loop();

function buttonReset() {
    darts = [];
    dartsInCircleCount = 0;
    reset();
    clearTimeout(currentTimeoutId);
    loop();
}

document.getElementById('resetButton')!.addEventListener('click', buttonReset);
document.getElementById('fasterButton')!.addEventListener('click', goFaster);
document.getElementById('slowerButton')!.addEventListener('click', goSlower);