/*                                              
                                        |   |
                                        |---| |--| | |  __
                                        |   | |--| | | |  |
                                        |   | |___ | | |__|
*/

// Do not forget to see index.html to understand all the codes
let statusElt = document.getElementById("info");
let stack, mouse, mouseConstraint, stone, sling, firing, stones, statusTxt, chain, feedback, prevStone;
let mangoes = [];
let fallenMangoes = [];
let firedStones = [];
let newMangoPositions = [];
let noOfMangoesFallen = 0;
let gameDone = false;
let chances = 5;
let mangoesGetSmaller = false;
let createFeedbackAllowedStatus = 0;

updatescoreAndChancesText(feedback);

const Engine = Matter.Engine;
const World = Matter.World;
const Render = Matter.Render;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Common = Matter.Common;
const Events = Matter.Events;
const SAT = Matter.SAT;
let engine = Engine.create();
let world = engine.world;
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1999,
        height: 1333,
        wireframes: false,
        background: './images/area.jpg'
    }
});

let canvas = {
    width: render.options.width,
    height: render.options.height
}

createStone(150 * 2.5, 300 * 3.3);

let rightEdge = // Right Edge
    (Bodies.rectangle(canvas.width + 20, canvas.height / 2, 40, canvas.height, {
        isStatic: true,
        name: "Edge",
        render: {
            visible: false
        },
        friction: 1
    }));

let ground = Bodies.rectangle((canvas.width / 2), (canvas.height - (10 / 2)) - 50, canvas.width, 60, {
    isStatic: true,
    name: "Ground",
    render: {
        visible: false
    },
    friction: 1
});

// ground and edges
World.add(world,
    // Ground
    [ground, rightEdge,
        // Left Edge
        (Bodies.rectangle(-20, canvas.height / 2, 40, canvas.height, {
            isStatic: true,
            name: "Edge",
            render: {
                visible: false
            },
            friction: 1
        }))
    ]
);

let boy = Bodies.rectangle(stone.position.x + 40 * 2.5, stone.position.y + 20 * 3.3, 20 * 2.5, 40 * 3.3, {
    isStatic: true,
    render: {
        sprite: {
            texture: './images/boy.png',
            xScale: 0.08 * 2.5,
            yScale: 0.065 * 3.3
        }
    },
    collisionFilter: {
        group: -1
    },
    name: "Boy",
});

let basket = Bodies.rectangle(260 * 2.5, 355 * 3.3, 100, 50, {
    isStatic: true,
    render: {
        sprite: {
            texture: './images/basket.png',
            xScale: 0.64 * 2.5,
            yScale: 0.6 * 3.3
        }
    },
    collisionFilter: {
        group: -1
    },
    density: 30,
    name: "Basket",
});

// Positions of the mangoes
let mangoPos = [
    { x: 614 * 2.5, y: 44 * 3.3 },
    { x: 562 * 2.5, y: 100 * 3.3 },
    { x: 699 * 2.5, y: 35 * 3.3 },
    { x: 660 * 2.5, y: 77 * 3.3 },
    { x: 671 * 2.5, y: 154 * 3.3 },
    { x: 475 * 2.5, y: 57 * 3.3 }
];

createMangoes(mangoPos);

// Adding the muse instance in the game so that we can drag the stone.
mouse = Mouse.create(render.canvas);
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: false
        },
        pointA: mouse.position,
    }
});
// Setting the render canvas's mouse property to the mouse obj.
render.mouse = mouse;

sling = Constraint.create({
    pointA: {
        x: 150 * 2.5,
        y: 300 * 3.3
    },
    bodyB: stone,
    stiffness: 0.1
});

firing = false;

// Update the information text
function updatescoreAndChancesText() {
    statusTxt = "|| Mangoes Collected: " + fallenMangoes.length + " |||| " + "Chances / Stones Left: " + chances + " ||||" + " Press F5 function key to restart the game ||";
    statusElt.innerHTML = statusTxt;
}

// Create a stone object
function createStone(x, y) {
    let scale = Common.random(0.05 * 2.5, 0.08 * 2.5)
    stone = Bodies.circle(x, y, 28, {
        render: {
            sprite: {
                texture: './images/stone.png',
                xScale: scale,
                yScale: scale
            }
        },
        collisionFilter: {
            group: -1
        },
        density: 2,
        name: "myStone",
        friction: 0.67
    });
}

// Creating a group of mangoes
function createMangoes(posArray) {
    for (let i = 1; i < posArray.length + 1; i++) {
        let mango = Bodies.circle(posArray[i - 1].x, posArray[i - 1].y, 20 * 2.5, {
            isStatic: true,
            render: {
                sprite: {
                    texture: './images/mango.png',
                    xScale: 0.08 * 2.5,
                    yScale: 0.05 * 3.3
                }
            },
            density: .5,
            name: "mango" + i,
            friction: 1
        });
        mangoes.push(mango);
        World.add(world, mango);
    }
}