let nnCanvas: ResizingCanvas = document.getElementById('nnCanvas') as ResizingCanvas;
let nnCtx: CanvasRenderingContext2D = nnCanvas.getContext('2d') as CanvasRenderingContext2D;

let simpleCanvas: ResizingCanvas = document.getElementById('simpleCanvas') as ResizingCanvas;
let simpleCtx = simpleCanvas.getContext('2d') as CanvasRenderingContext2D;

let exampleCanvas: ResizingCanvas = document.getElementById('exampleCanvas') as ResizingCanvas;
let exampleCtx = exampleCanvas.getContext('2d') as CanvasRenderingContext2D;

let MAX_VALUE = 3;

class NNNode {
    public connections: Connection[];
    public bias: number;
    public activationFunction: Function;
    public x: number;
    public y: number; 
    public isOutputNode: boolean = false;
    public radius: number = 10;

    private cachedValue: number | undefined;

    constructor(upstreamNodes: NNNode[], upstreamWeights: number[], 
                bias: number, activationFunction: (input: number) => number, 
                isOutputNode=false) {
        this.connections = [];
        for (let i = 0; i < upstreamNodes.length; i++) {
            this.connections.push(new Connection(upstreamNodes[i], upstreamWeights[i]));
        }
        this.bias = bias;
        this.activationFunction = activationFunction;
        this.cachedValue = undefined;
        this.isOutputNode = isOutputNode;
    }  

    compute(): number {
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
        return this.cachedValue!;
    }

    reset(): void {
        this.cachedValue = undefined;
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D): void {
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

    getConnections(): Connection[] {
        return this.connections;
    }

    isInNode(x: number, y: number): boolean {
        return ((x - this.x) ** 2 + (y - this.y) ** 2) ** 0.5 < (this.radius + 5);
    }
}

class Connection {
    public upstreamNode: NNNode;
    public weight: number;
    constructor(upstreamNode: NNNode, weight: number) {
        this.upstreamNode = upstreamNode;
        this.weight = weight;
    }

    getWeight(): number {
        return this.weight;
    }

    getUpstream(): NNNode {
        return this.upstreamNode;
    }
}

class Network {
    public layers: NNNode[][];
    public canvas: ResizingCanvas;
    public ctx: CanvasRenderingContext2D
    public dataDivId?: string;
    public padding: number = 0;
    constructor(canvas: ResizingCanvas, ctx: CanvasRenderingContext2D, dataDivId?: string) {
        this.layers = [];
        this.canvas = canvas;
        this.ctx = ctx;
        this.dataDivId = dataDivId;
    }

    addLayer(layer: NNNode[]): void {
        this.layers.push(layer);
    }

    reset(): void {
        for (let l of this.layers) {
            for (let n of l) {
                n.reset();
            }
        }
    }

    drawNetwork(): void {
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

    drawLine(weight: number, startX: number, startY: number, endX: number, endY: number): void {
        this.ctx.strokeStyle = shadeColor('#ff5555', (weight - 1) / 2 * 100)
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke(); 
    }
    
    clickOnNode(x: number, y: number): void {
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

function shadeColor(color: string, percent: number): string {
    let R: number = parseInt(color.substring(1,3),16);
    let G: number = parseInt(color.substring(3,5),16);
    let B: number = parseInt(color.substring(5,7),16);

    R = R * (100 + percent) / 100;
    G = G * (100 + percent) / 100;
    B = B * (100 + percent) / 100;

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?'0'+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?'0'+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?'0'+B.toString(16):B.toString(16));

    return '#'+RR+GG+BB;
}

function sigmoid(x: number): number {
    return 1 / (1 + Math.E ** (-x));
}

function linear(x: number): number {
    return x;
}

function tanh(x: number): number {
    return Math.tanh(x);
}

function rand(): number {
    return Math.random() * -2 + 1
}

let exampleNetwork = new Network(exampleCanvas, exampleCtx, undefined);
let exampleFirstLayer = [new NNNode([], [], 0, linear), new NNNode([], [], 0, linear)]
let exampleMiddleLayer = [new NNNode(exampleFirstLayer, [1, 1], 0, tanh), new NNNode(exampleFirstLayer, [1, 1], 0, tanh), new NNNode(exampleFirstLayer, [1, 1], 0, tanh)]
let exampleOutputLayer = [new NNNode(exampleMiddleLayer, [1, 1, 1], 0, tanh, true)]
exampleNetwork.addLayer(exampleFirstLayer)
exampleNetwork.addLayer(exampleMiddleLayer)
exampleNetwork.addLayer(exampleOutputLayer);

let simpleNetwork = new Network(simpleCanvas, simpleCtx, 'simpleData');
let simpleFirstLayer = [new NNNode([], [], 0, linear)]
let simpleMiddleLayer = [new NNNode(simpleFirstLayer, [1], 0, tanh)]
let simpleOutputLayer = [new NNNode(simpleMiddleLayer, [1], 0, tanh, true)]
simpleNetwork.addLayer(simpleFirstLayer)
simpleNetwork.addLayer(simpleMiddleLayer)
simpleNetwork.addLayer(simpleOutputLayer);

let network = new Network(nnCanvas, nnCtx, 'nnData');

let firstLayer = [new NNNode([], [], 0, linear), new NNNode([], [], 0, linear)];
network.addLayer(firstLayer);

let numHiddenLayers = 2;
let hiddenLayerSize = 3;
let previousLayer = firstLayer;
for (let h = 0; h < numHiddenLayers; h++) {
    let layer: NNNode[] = [];
    let conns: number[] = [];
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

function drawData(network: Network, dataDivId?: string) {
    if (dataDivId === undefined) {
        return;
    }
    let data = document.getElementById(dataDivId);
    let inputValues: string[] = [];
    network.layers[0].forEach(n => {inputValues.push(n.compute().toFixed(2))});
    let outputValue = network.layers[network.layers.length - 1][0].compute().toFixed(2);
    data!.innerHTML = 
        `Input layer values: ${inputValues}<br>` + 
        `Output value: ${outputValue}<br>`;
}

function drawAll(ctx: CanvasRenderingContext2D, canvas: ResizingCanvas, network: Network, dataDivId?: string) {
    ctx.fillStyle = '#282a36';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    network.drawNetwork();
    drawData(network, dataDivId);
}

nnCanvas.customResize = () => {
    drawAll(nnCtx, nnCanvas, network, 'nnData');
}

nnCanvas.addEventListener('click', function(event) {
    var rect = nnCanvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left) * nnCanvas.width;
    let y = (event.clientY - rect.top) / (rect.bottom - rect.top) * nnCanvas.height;

    console.log(`clicked ${x}, ${y}`)
    // Collision detection between clicked offset and element.
    network.clickOnNode(x, y);

}, false);

simpleCanvas.customResize = () => {
    simpleCanvas.height = simpleCanvas.width / 2;
    drawAll(simpleCtx, simpleCanvas, simpleNetwork, 'simpleData');
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