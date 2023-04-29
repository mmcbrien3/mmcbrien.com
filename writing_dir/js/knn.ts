let knnCanvas: ResizingCanvas = document.getElementById('knnCanvas') as ResizingCanvas;
let knnCtx: CanvasRenderingContext2D = knnCanvas.getContext('2d') as CanvasRenderingContext2D;

const NODE_RADIUS = 15;
const ORIGINAL_CANVAS_SIZE = 500;

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

class KnnNode {
    private x: number;
    private y: number;
    private knnClass: KnnClassification;
    private radius: number = NODE_RADIUS;
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

    draw() {
        this.radius = NODE_RADIUS * this.canvas.width / ORIGINAL_CANVAS_SIZE
        this.ctx.fillStyle = this.knnClass.nodeColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x * this.canvas.width, this.y * this.canvas.width, this.radius, 0, 2 * Math.PI);
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

function drawBackgroundKnn(canvas: ResizingCanvas, ctx: CanvasRenderingContext2D, nodes: KnnNode[]) {
    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            const classification = getClassOfKNearestNeighbors(i, j, nodes, 2)
            ctx.fillStyle = classification.regionColor;
            ctx.fillRect(i, j, 1, 1 );
        }
    }
}

interface classDistancePair {
    classification: KnnClassification,
    distance: number,
}

function getClassOfKNearestNeighbors(x: number, y: number, nodes: KnnNode[], k: number = 2): KnnClassification {
    const distancesByClass: classDistancePair[] = [];
    for (const node of nodes) {
        const d = node.findDistance(x, y)
        const classification = node.getClassification();
        distancesByClass.push({distance: d, classification});
    }

    distancesByClass.sort((a, b) => a.distance - b.distance);

    const nearestNeighborsByClass = new Map<string, number>()
    for (const dc of distancesByClass) {
        let nearest = 0;
        if (nearestNeighborsByClass.has(dc.classification.classId)) {
            nearest = nearestNeighborsByClass.get(dc.classification.classId)! + 1;
        } else {
            nearest = 1;
        }
        if (nearest >= k) {
            return dc.classification;
        }
        nearestNeighborsByClass.set(dc.classification.classId, nearest);
    }

    throw new Error('Could not find nearest');
}

knnCanvas.customResize = () => {
    drawBackgroundKnn(knnCanvas, knnCtx, nodes);
    nodes.forEach(n => n.draw());
}

