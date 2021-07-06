const {World, Render, Runner, Engine, Bodies, Body, Events} = Matter;
const cells = 3;
const width = 600;
const height = 600;
const unitLength = width/cells;

const engine = Engine.create();

const {world} = engine;
engine.world.gravity.y = 0;
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

// Walls 

const walls = [
    Bodies.rectangle(width/2, 0, width, 2, { isStatic:true, render: { fillStyle: 'purple'} }),
    Bodies.rectangle(width/2, height, width, 2, { isStatic:true, render: { fillStyle: 'purple'} }),
    Bodies.rectangle(0, height/2, 2, height, { isStatic:true, render: { fillStyle: 'purple'} }),
    Bodies.rectangle(width, height/2, 2, height, { isStatic:true, render: { fillStyle: 'purple'} })
];

World.add(world, walls);

//Maze generation

const shuffle = function (arr) {
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter)

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    
    return arr;
}

const grid = Array(cells).fill(null).map(()=> Array(cells).fill(false));

const verticals = Array(cells).fill(null).map(()=> Array(cells - 1).fill(false));

const horizontals = Array(cells - 1).fill(null).map(()=> Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);


const stepThroughCell = (row, column) => {
//If i have visited the cell at [row, column], then return
    if (grid[row][column]) {
        return;
    }
// Mark this cell as being visited
    grid[row][column] = true;
//Assemble randomly-ordered list of neighbors
    const neighbours = shuffle ([
        [row - 1, column, "up"],
        [row, column + 1, "right"],
        [row + 1, column, "down"],
        [row, column - 1, "left"]
    ]);

    
//for each neighbor...
for (let neighbour of neighbours) {
    const [nextRow, nextColumn, direction] = neighbour;
    
//See if that neighbour is out if bounds
    if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells){
        continue;
    }
//If we visited that neighbour, continue to next neighbour
    if (grid[nextRow][nextColumn]) {
        continue;
    }
//Remove a wall from either horizontal or vertical array
    if (direction === "left"){
        verticals[row][column - 1] = true;
    }else if (direction === "right"){
        verticals[row][column]= true;
    }else if (direction === "up"){
        horizontals[row - 1][column] = true;
    }else if (direction === "down"){
        horizontals[row][column] = true;
    }
    //Visit that next cell
    stepThroughCell(nextRow, nextColumn);
}

}; 

stepThroughCell(startRow, startColumn); 

horizontals.forEach( (row, rowIndex) => {
    row.forEach( (open, columnIndex) => {
        if (open){
        return;
    }
    
    const wall = Bodies.rectangle(
        columnIndex*unitLength+unitLength/2,
        rowIndex*unitLength+unitLength, 
        unitLength, 
        2,
        {
            isStatic: true,
            render :{
                fillStyle:"purple"
            }
        }
        );
        World.add(world, wall)
    });

});

verticals.forEach( (row, rowIndex) => {
    row.forEach( (open, columnIndex) => {
        if (open){
        return;
    }
    
    const wall = Bodies.rectangle(
        columnIndex*unitLength+unitLength,
        rowIndex*unitLength+unitLength/2,
        2,
        unitLength,
        {
            isStatic: true,
            render :{
                fillStyle:"purple"
            }
        }
    );
    
    World.add(world, wall)

    });

});

//Goal

const goal = Bodies.rectangle(
    width-unitLength/2,
    height-unitLength/2,
    unitLength * 0.7,
    unitLength * 0.7,
    {
        label: 'goal',
        isStatic: true,
        render: {
            fillStyle: "red"
        }
    }
)

World.add(world, goal);

//Ball

const ball = Bodies.circle(
    unitLength/2,
    unitLength/2,
    unitLength/4,
    {
        label: 'ball',
        isStatic:false,
        render: {
            fillStyle:"green"
        }
    }
);

World.add(world, ball);

document.addEventListener('keydown', (event) =>{
    const {x,y} = ball.velocity;

    if (event.keyCode === 87 || event.keyCode === 38) {
        Body.setVelocity(ball, {x, y: y - 2})
    }
    if (event.keyCode === 68 || event.keyCode === 39) {
        Body.setVelocity(ball, {x: x + 2, y})
    }
    if (event.keyCode === 83 || event.keyCode === 40) {
        Body.setVelocity(ball, {x, y: y + 2})
    }
    if (event.keyCode === 65 || event.keyCode === 37) {
        Body.setVelocity(ball, {x: x - 2, y})
    }
});

//Win con

Events.on(engine, 'collisionStart', event => {
event.pairs.forEach( collision => {
    const labels = ['ball', 'goal']

    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
        console.log('You won!');
    }
});
});
