let canvas = document.getElementById("nnCanvas");
let ctx = canvas.getContext("2d");

let simpleCanvas = document.getElementById("simpleCanvas");
let simpleCtx = simpleCanvas.getContext("2d");

let exampleCanvas = document.getElementById("exampleCanvas");
let exampleCtx = exampleCanvas.getContext("2d");

let MAX_VALUE = 3;

class NNNode {
    connections;
    bias;
    activationFunction;
    cachedValue;
    x;
    y;
    isOutputNode = false;
    radius = 10;
    constructor(upstreamNodes, upstreamWeights, bias, activationFunction, isOutputNode=false) {
        this.connections = [];
        for (let i = 0; i < upstreamNodes.length; i++) {
            this.connections.push(new Connection(upstreamNodes[i], upstreamWeights[i]));
        }
        this.bias = bias;
        this.activationFunction = activationFunction;
        this.cachedValue = undefined;
        this.isOutputNode = isOutputNode;
    }  

    compute() {
        if (this.cachedValue !== undefined) {
            return this.cachedValue;
        }

        // this is an input layer
        if (this.connections.length == 0) {
            this.cachedValue = this.bias;
            return this.cachedValue;
        }

        let sum = 0;
        for (let c of this.connections) {
            sum += c.getWeight() * c.getUpstream().compute();
        }
        let input = sum + this.bias;
        this.cachedValue = this.activationFunction(input);
        return this.cachedValue;
    }

    reset() {
        this.cachedValue = undefined;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        if (this.connections.length > 0 && !this.isOutputNode) {
            ctx.fillStyle = shadeColor('#ff5555', (this.bias - 1) / (MAX_VALUE * 2) * 100)
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 4, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }

        let value = this.compute();
        ctx.fillStyle = shadeColor('#50fa7b', (value - 1) / (MAX_VALUE * 2) * 100)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    getConnections() {
        return this.connections;
    }

    isInNode(x, y) {
        return ((x - this.x) ** 2 + (y - this.y) ** 2) ** 0.5 < (this.radius + 5);
    }
}

class Connection {
    upstreamNode;
    weight;
    constructor(upstreamNode, weight) {
        this.upstreamNode = upstreamNode;
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }

    getUpstream() {
        return this.upstreamNode;
    }
}

class Network {
    layers;
    canvas;
    ctx;
    dataDivId;
    padding = 0;
    constructor(canvas, ctx, dataDivId) {
        this.layers = [];
        this.canvas = canvas;
        this.ctx = ctx;
        this.dataDivId = dataDivId;
    }

    addLayer(layer) {
        this.layers.push(layer);
    }

    reset() {
        for (let l of this.layers) {
            for (let n of l) {
                n.reset();
            }
        }
    }

    drawNetwork() {
        let drawWidth = this.canvas.width - 2 * this.padding;
        let drawHeight = this.canvas.height - 2 * this.padding;
        let xDiff = drawWidth / (this.layers.length + 1);
        let currX = xDiff + this.padding;
        for (let l of this.layers) {
            let yDiff = drawHeight / (l.length + 1);
            let currY = yDiff + this.padding;
            for (let n of l) {
                n.setPosition(currX, currY);
                currY += yDiff;
            }
            currX += xDiff;
        }

        for (let l of this.layers.slice(1)) {
            for (let n of l) {
                for (let c of n.getConnections()) {
                    this.drawLine(c.getWeight(), n.x, n.y, c.upstreamNode.x, c.upstreamNode.y);
                }
            }
        }
        for (let l of this.layers) {
            for (let n of l) {
                n.draw(this.ctx);
            }
        }
    }

    drawLine(weight, startX, startY, endX, endY) {
        this.ctx.strokeStyle = shadeColor('#ff5555', (weight - 1) / 2 * 100)
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke(); 
    }
    
    clickOnNode(x, y) {
        for (let l of this.layers) {
            for (let n of l) {
                if (n.isInNode(x, y) && !n.isOutputNode) {
                    console.log('clicked on node');
                    n.bias = n.bias + 1 <= MAX_VALUE ? n.bias + 1 : - MAX_VALUE;
                    this.reset();
                    drawAll(this.ctx, this.canvas, this, this.dataDivId);
                    return;
                }
            }
        }
    }
}

function convertToHex(r, g, b) {
    let convertToRange = (x) => {return Math.round(x / MAX_VALUE * 205) + 50};
    let rVal = convertToRange(r).toString(16).toLocaleString('en-US', {minimumIntegerDigits: 2})
    let gVal = convertToRange(g).toString(16).toLocaleString('en-US', {minimumIntegerDigits: 2})
    let bVal = convertToRange(b).toString(16).toLocaleString('en-US', {minimumIntegerDigits: 2});
    let val = `#${rVal}${gVal}${bVal}`; // #ffffff in hex
    return val;
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function sigmoid(x) {
    return 1 / (1 + Math.E ** (-x));
}

function linear(x) {
    return x;
}

function tanh(x) {
    return Math.tanh(x);
}

function rand() {
    return Math.random() * -2 + 1
}

let exampleNetwork = new Network(exampleCanvas, exampleCtx, undefined);
let exampleFirstLayer = [new NNNode([], [], 0, linear), new NNNode([], [], 0, linear)]
let exampleMiddleLayer = [new NNNode(exampleFirstLayer, [1, 1], 0, tanh), new NNNode(exampleFirstLayer, [1, 1], 0, tanh), new NNNode(exampleFirstLayer, [1, 1], 0, tanh)]
let exampleOutputLayer = [new NNNode(exampleMiddleLayer, [1, 1, 1], 0, tanh, true)]
exampleNetwork.addLayer(exampleFirstLayer)
exampleNetwork.addLayer(exampleMiddleLayer)
exampleNetwork.addLayer(exampleOutputLayer);

let simpleNetwork = new Network(simpleCanvas, simpleCtx, "simpleData");
let simpleFirstLayer = [new NNNode([], [], 0, linear)]
let simpleMiddleLayer = [new NNNode(simpleFirstLayer, [1], 0, tanh)]
let simpleOutputLayer = [new NNNode(simpleMiddleLayer, [1], 0, tanh, true)]
simpleNetwork.addLayer(simpleFirstLayer)
simpleNetwork.addLayer(simpleMiddleLayer)
simpleNetwork.addLayer(simpleOutputLayer);

let network = new Network(canvas, ctx, "nnData");

let firstLayer = [new NNNode([], [], 0, linear), new NNNode([], [], 0, linear)];
network.addLayer(firstLayer);

let numHiddenLayers = 2;
let hiddenLayerSize = 3;
let previousLayer = firstLayer;
for (let h = 0; h < numHiddenLayers; h++) {
    let layer = [];
    let conns = [];
    for (let i = 0; i < previousLayer.length; i++) {
        conns.push(1)
    }
    for (let i = 0; i < hiddenLayerSize; i++) {
        layer.push(new NNNode(previousLayer, conns, 0, tanh));
    }
    network.addLayer(layer);
    previousLayer = layer;
}

let outputNode = new NNNode(network.layers[network.layers.length - 1], [1, 1, 1], 0, tanh, true);

console.log(outputNode.compute());

network.addLayer([outputNode]);

function drawData(network, dataDivId) {
    if (dataDivId === undefined) {
        return;
    }
    data = document.getElementById(dataDivId);
    inputValues = [];
    network.layers[0].forEach(n => {inputValues.push(n.compute().toFixed(2))});
    outputValue = network.layers[network.layers.length - 1][0].compute().toFixed(2);
    data.innerHTML = 
    `Input layer values: ${inputValues}<br>` + 
    `Output value: ${outputValue}<br>`;
}

function drawAll(ctx, canvas, network, dataDivId) {
    ctx.fillStyle = '#282a36';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    network.drawNetwork();
    drawData(network, dataDivId);
}

canvas.customResize = () => {
    drawAll(ctx, canvas, network, "nnData");
}

canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    let y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

    console.log(`clicked ${x}, ${y}`)
    // Collision detection between clicked offset and element.
    network.clickOnNode(x, y);

}, false);

simpleCanvas.customResize = () => {
    simpleCanvas.height = simpleCanvas.width / 2;
    drawAll(simpleCtx, simpleCanvas, simpleNetwork, "simpleData");
}

exampleCanvas.customResize = () => {
    drawAll(exampleCtx, exampleCanvas, exampleNetwork, undefined);
}

simpleCanvas.addEventListener('click', function(event) {
    var rect = simpleCanvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left) * simpleCanvas.width;
    let y = (event.clientY - rect.top) / (rect.bottom - rect.top) * simpleCanvas.height;

    console.log(`clicked ${x}, ${y}`)
    // Collision detection between clicked offset and element.
    simpleNetwork.clickOnNode(x, y);

}, false);