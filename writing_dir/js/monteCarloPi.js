let canvas = document.getElementById("piCanvas");
let filledCanvas = document.getElementById("filledCanvas");
let filledCtx = filledCanvas.getContext("2d");
let piText = document.getElementById("piValue");
let ctx = canvas.getContext("2d");

canvas.customResize = () => {
    reset();
    darts.forEach(d => d.draw(ctx));
}

filledCanvas.customResize = () => {
    fill();
}

let timeoutDelay = 100;
let maxTimeoutDelay = 250;
let minTimeoutDelay = 1;
let currentTimeoutId = undefined;

function goFaster() {
    timeoutDelay = Math.max(minTimeoutDelay, timeoutDelay - 50);
    clearTimeout(currentTimeoutId);
    currentTimeoutId = setTimeout(() => loop(), timeoutDelay);
}

function goSlower() {
    timeoutDelay = Math.min(maxTimeoutDelay, timeoutDelay + 50);
    clearTimeout(currentTimeoutId);
    currentTimeoutId = setTimeout(() => loop(), timeoutDelay);
}


let darts = [];
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
    x;
    y;
    constructor() {
        this.x = Math.random() * 2 - 1;
        this.y = Math.random() * 2 - 1;
    }

    draw(ctx) {
        if (this.isInCircle()) {
            ctx.fillStyle = dartInCircleColor;
        } else {
            ctx.fillStyle = dartNotInCircleColor;
        }
        ctx.beginPath();
        let drawX = ((this.x + 1) / 2) * canvas.width;
        let drawY = ((this.y + 1) / 2) * canvas.width;
        ctx.arc(drawX, drawY, 2, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    isInCircle() {
        return (this.x ** 2 + this.y ** 2) ** 0.5 < 1;
    }
}

function drawBackground() {
    console.log("filling bg");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function reset() {
    drawBackground();
    drawCircle();
}

function drawCircle() {
    ctx.strokeStyle = circleColor;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    ctx.stroke();
}

function loop() {
    if (darts.length < maxDarts) {
        let dart = new Dart();
        dart.draw(ctx);
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

document.getElementById("resetButton").addEventListener("click", buttonReset);
document.getElementById("fasterButton").addEventListener("click", goFaster);
document.getElementById("slowerButton").addEventListener("click", goSlower);