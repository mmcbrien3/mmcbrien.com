let knnCanvas: ResizingCanvas = document.getElementById('knnCanvas') as ResizingCanvas;
let knnCtx: CanvasRenderingContext2D = knnCanvas.getContext('2d') as CanvasRenderingContext2D;

const NODE_RADIUS = 15;
const ORIGINAL_CANVAS_SIZE = 500;

const K = 2;

class KnnClassification {
    readonly classId: string;
    readonly nodeColor: string;
    readonly regionColor: string;

    constructor(classId: string, nodeColor: string, regionColor: string) {
        this.classId = classId;
        this.nodeColor = nodeColor;
        this.regionColor = regionColor;
    }
}

class KnnEnvironment {
    private nodes: KnnNode[];
    private selectedNode?: KnnNode;
    private canvas: ResizingCanvas;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: ResizingCanvas, ctx: CanvasRenderingContext2D, nodes: KnnNode[]) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.nodes = nodes;
    }

    onClick(x: number, y: number) {
        this.nodes.forEach(n => n.setIsNearestNeighbor(false));
        if (this.selectedNode === undefined){
            let isNodeSelected = false;
            for (const n of this.nodes) {
                if (n.isClicked(x, y)) {
                    this.selectedNode = n;
                    n.setSelected(true);
                    n.draw();
                    isNodeSelected = true;
                    break;
                }
            }
            if (!isNodeSelected) {
                this.drawAll();
                const nearestNeighbors = orderNodesByDistance(x, y, this.nodes);
                const maxDistance = nearestNeighbors[K-1].distance;
                for (let i = 0; i < K; i++) {
                    nearestNeighbors[i].node.setIsNearestNeighbor(true);
                    nearestNeighbors[i].node.draw();
                }
                this.drawDottedCircle(x, y, maxDistance);
            }
        } else {
            this.selectedNode.setPosition(x, y);
            this.selectedNode.setSelected(false);
            this.selectedNode = undefined;
            this.nodes.forEach(n => n.setIsNearestNeighbor(false));
            this.drawAll();
        }
    }

    drawDottedCircle(x, y, radius) {
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawAll() {
        drawBackgroundKnn(this.canvas, this.ctx, nodes);
        nodes.forEach(n => n.draw());
    }
}

class KnnNode {
    private x: number;
    private y: number;
    private knnClass: KnnClassification;
    private radius: number = NODE_RADIUS;
    private isSelected: boolean = false;
    private isNearestNeighbor: boolean = false;
    private canvas: ResizingCanvas;
    private ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, 
        knnClass: KnnClassification,
        canvas: ResizingCanvas,
        ctx: CanvasRenderingContext2D) {
            this.x = x;
            this.y = y;
            this.knnClass = knnClass;
            this.canvas = canvas;
            this.ctx = ctx;
    }

    getClassification() {
        return this.knnClass;
    }

    doesShareClass(node: KnnNode) {
        return this.knnClass.classId === node.getClassification().classId;
    }

    findDistance(x: number, y: number) {
        return (
            ((this.x * this.canvas.width) - x) ** 2 +
            ((this.y * this.canvas.height) - y) ** 2
        ) ** (1/2);
    }

    setPosition(x: number, y: number) {
        this.x = x / this.canvas.width;
        this.y = y / this.canvas.height;
    }

    setSelected(selected: boolean) {
        this.isSelected = selected;
    }

    setIsNearestNeighbor(isNearestNeighbor: boolean) {
        this.isNearestNeighbor = isNearestNeighbor;
    }

    isClicked(x: number, y:  number) {
        return ((x - this.x * this.canvas.width) ** 2 + (y - this.y * this.canvas.height) ** 2) ** 0.5 < (this.radius);
    }

    draw() {
        this.radius = NODE_RADIUS * this.canvas.width / ORIGINAL_CANVAS_SIZE

        if (this.isNearestNeighbor) {
            this.drawBackgroundCircle('#f1fa8c')
        }
        if (this.isSelected) {
            this.drawBackgroundCircle('#000000');
        }

        this.ctx.fillStyle = this.knnClass.nodeColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x * this.canvas.width, this.y * this.canvas.width, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private drawBackgroundCircle(color: string) {
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.arc(this.x * this.canvas.width, this.y * this.canvas.width, this.radius * 1.2, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

const nodes: KnnNode[] = [];

const nodeDetails = [
    {
        classId: 'red',
        color: '#ff0000',
        count: 2
    },
    {
        classId: 'blue',
        color: '#0000ff',
        count: 2
    },
    {
        classId: 'green',
        color: '#00ff00',
        count: 2
    },
]

const redClass = new KnnClassification('red', '#ff5555', '#dd3333');
const blueClass = new KnnClassification('blue', '#8be9fd', '#69c7db ');
const greenClass = new KnnClassification('green', '#50fa7b', '#30d859');

nodes.push(new KnnNode(0.05, .41, redClass, knnCanvas, knnCtx));
nodes.push(new KnnNode(0.1, .45, redClass, knnCanvas ,knnCtx));
nodes.push(new KnnNode(.2, .3, redClass, knnCanvas, knnCtx));

nodes.push(new KnnNode(.33, .8, blueClass, knnCanvas, knnCtx));
nodes.push(new KnnNode(.37, .89, blueClass, knnCanvas, knnCtx));

nodes.push(new KnnNode(.8, .45, greenClass, knnCanvas, knnCtx));
nodes.push(new KnnNode(.77, .51, greenClass, knnCanvas, knnCtx));
nodes.push(new KnnNode(.82, .52, greenClass, knnCanvas, knnCtx));
nodes.push(new KnnNode(.69, .52, greenClass, knnCanvas, knnCtx));

const knnEnvironment = new KnnEnvironment(knnCanvas, knnCtx, nodes);

function drawBackgroundKnn(canvas: ResizingCanvas, ctx: CanvasRenderingContext2D, nodes: KnnNode[]) {
    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            const classification = getClassOfKNearestNeighbors(i, j, nodes, K)
            ctx.fillStyle = classification.regionColor;
            ctx.fillRect(i, j, 1, 1 );
        }
    }
}

interface classDistancePair {
    classification: KnnClassification,
    node: KnnNode,
    distance: number,
}

function orderNodesByDistance(x: number, y: number, nodes: KnnNode[]) {
    const distancesByClass: classDistancePair[] = [];
    for (const node of nodes) {
        const d = node.findDistance(x, y)
        const classification = node.getClassification();
        distancesByClass.push({distance: d, classification, node});
    }

    distancesByClass.sort((a, b) => a.distance - b.distance);
    return distancesByClass;
}

function getClassOfKNearestNeighbors(x: number, y: number, nodes: KnnNode[], k: number = 2): KnnClassification {
    const distancesByClass = orderNodesByDistance(x, y, nodes);
    const nearestNeighborsByClass = new Map<string, number>()
    let mostNeighborsClass: KnnClassification | undefined;
    let mostNeighborsNumber = 0;
    let tieExists = true;
    for (let i = 0; i < k; i++) {
        let nearest = 0;
        const dc = distancesByClass[i];
        if (nearestNeighborsByClass.has(dc.classification.classId)) {
            nearest = nearestNeighborsByClass.get(dc.classification.classId)! + 1;
        } else {
            nearest = 1;
        }
        if (nearest > mostNeighborsNumber) {
            mostNeighborsNumber = nearest;
            mostNeighborsClass = dc.classification;
            tieExists = false;
        } else if (nearest == mostNeighborsNumber) {
            tieExists = true;
        }
        nearestNeighborsByClass.set(dc.classification.classId, nearest);
    }

    if (tieExists) {
        return new KnnClassification('TIE', '#999999', '#999999')
    } else if (mostNeighborsClass) {
        return mostNeighborsClass;
    } else {
        throw new Error('Could not find nearest');
    }
}



knnCanvas.customResize = () => {
    knnEnvironment.drawAll()
}

knnCanvas.addEventListener('click', function(event) {
    var rect = knnCanvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left) * knnCanvas.width;
    let y = (event.clientY - rect.top) / (rect.bottom - rect.top) * knnCanvas.height;

    console.log(`clicked ${x}, ${y}`)
    knnEnvironment.onClick(x, y);
}, false);