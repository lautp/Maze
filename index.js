const {World, Render, Runner, Engine, Bodies, MouseConstraint, Mouse} = Matter;
const width = 800;
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

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

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
    Bodies.rectangle(400, 0, 800, 40, { isStatic:true }),
    Bodies.rectangle(400, 600, 800, 40, { isStatic:true }),
    Bodies.rectangle(0, 300, 40, 600, { isStatic:true }),
    Bodies.rectangle(800, 300, 40, 600, { isStatic:true })
];

World.add(world, walls);

for (let i = 0; i < 40; i++) {
    
    if (Math.random()<0.5) {
        World.add(world, Bodies.rectangle(Math.random()*width,Math.random()*height,50,50, {
            isStatic:false,
            render: {
                fillStyle: 'indigo'}
        }))
    }else{
        World.add(world, Bodies.circle(Math.random()*width,Math.random()*height, 35, {
            isStatic:false,
        }))
    }
    ;
    
}
