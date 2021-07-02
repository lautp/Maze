const {World, Render, Runner, Engine, Bodies} = Matter;
const cells = 5;
const width = 600;
const height = 600;
const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height,
        wireframes:false
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);


// Walls my version
/* for (let i = 0; i < 4; i++) {
   
    if (i === 0) {
       xPos=400;
       yPos=0;
       widthBox=800;
       heightBox=50;
    }
    if (i === 1) {
       xPos=0;
       yPos=300;
       widthBox=50;
       heightBox=600;
    }
    if (i === 2) {
       xPos=800;
       yPos=300;
       widthBox=50;
       heightBox=600;
    }
    if (i === 3) {
       xPos=400;
       yPos=600;
       widthBox=800;
       heightBox=50;
    }

    const shape = Bodies.rectangle(xPos,yPos,widthBox,heightBox, {
        isStatic:true
    })

    World.add(world, shape);
} */

// Walls tutorial

const walls = [
    Bodies.rectangle(width/2, 0, width, 40, { isStatic:true, render: { fillStyle: 'purple'} }),
    Bodies.rectangle(width/2, height, width, 40, { isStatic:true, render: { fillStyle: 'purple'} }),
    Bodies.rectangle(0, height/2, 40, height, { isStatic:true, render: { fillStyle: 'purple'} }),
    Bodies.rectangle(width, height/2, 40, height, { isStatic:true, render: { fillStyle: 'purple'} })
];

World.add(world, walls);

/* const shuffle = function {

} */

const grid = Array(cells).fill(null).map(()=> Array(cells).fill(false));

const verticals = Array(cells).fill(null).map(()=> Array(cells - 1).fill(false));

const horizontals = Array(cells - 1).fill(null).map(()=> Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);

const stepThroughCell = function (row, column) {

    if (grid[row][column]) {
        return;
    }

    grid[row][column] = true;

    const neighbours = [
        [row - 1, column],
        [row, column + 1],
        [row - 1, column],
        [row, column - 1]
    ]
}

console.log(grid);