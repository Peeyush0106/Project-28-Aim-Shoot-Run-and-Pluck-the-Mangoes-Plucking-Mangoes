// Do not forget to see index.html to understand all the codes
var scoreElt = document.getElementById("score");

var stack, mouse, mouseConstraint, stone, sling, firing, stones, noOfMangoesFallen, scoreTxt;
var mangoes = [];
var fallenMangoNames = [];
var firedStones = [];
noOfMangoesFallen = 0;
var gameDone = false;
var chances = 5;

updatescoreAndChancesText();

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
var engine = Engine.create();
var world = engine.world;
var render = Render.create({
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

// ground and edges
World.add(world,
    [
        // Ground
        (Bodies.rectangle((canvas.width / 2), (canvas.height - (10 / 2)) - 50, canvas.width, 60, {
            isStatic: true,
            name: "Ground",
            render: {
                visible: false
            },
            friction: 1
        })),

        // Right Edge
        (Bodies.rectangle(canvas.width + 20, canvas.height / 2, 40, canvas.height, {
            isStatic: true,
            name: "Edge",
            render: {
                visible: false
            },
            friction: 1
        })),

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

var boy = Bodies.rectangle(stone.position.x + 100, stone.position.y + 65, 50, 100, {
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

// Positions of the mangoes
let mangoPos = [
    { x: 614 * 2.5, y: 44 * 3.3 },
    { x: 562 * 2.5, y: 100 * 3.3 },
    { x: 620 * 2.5, y: 130 * 3.3 },
    { x: 660 * 2.5, y: 77 * 3.3 },
    { x: 671 * 2.5, y: 154 * 3.3 },
    { x: 475 * 2.5, y: 57 * 3.3 }
];

// Creating an array of mangoes
for (var i = 1; i < mangoPos.length + 1; i++) {
    var mango = Bodies.circle(mangoPos[i - 1].x, mangoPos[i - 1].y, 20 * 2.5, {
        isStatic: true,
        render: {
            sprite: {
                texture: './images/mango.png',
                xScale: 0.08 * 2.5,
                yScale: 0.05 * 3.3
            }
        },
        density: 0.5,
        name: "mango" + i,
        friction: 1
    });
    mangoes.push(mango);
    World.add(world, mango);
}

// Adding the muse instance in the game so that we can drag the stone.
mouse = Mouse.create(render.canvas);
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: false
        }
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

// Turning on an event to check the end of a mouse drag so that we can shoot the stone
Events.on(mouseConstraint, 'enddrag', function (e) {
    if (e.body === stone) firing = true;
});

// This continues infinitely in the game so that the stone is fired when the firing flag is true.
Events.on(engine, 'afterUpdate', function () {
    if (fallenMangoNames.length >= 6 || chances <= 0) {
        gameDone = true;
    }
    if (firing && !gameDone) {
        var x = stone.position.x;
        var y = stone.position.y;
        createStone(x, y);
        World.add(world, stone);
        sling.bodyB = stone;
        chances -= 1;
        scoreTxt = "|| Score: " + fallenMangoNames.length + " points " + "|||| " + "Chances / Stones Left: " + chances + " ||";
        scoreElt.innerHTML = scoreTxt;
        firing = false;
    }
    if (gameDone) {
        World.remove(world, [stone, sling]);
        chances = 0;
        scoreTxt = "|| Score: " + fallenMangoNames.length + " points " + "|||| " + "Chances / Stones Left: " + chances + " ||";
        scoreElt.innerHTML = scoreTxt;
    }
});

// When there is some collision, we need to see if the collion is between which objects and act accordingly.
// We are activating an event to check this.
Events.on(engine, 'collisionStart', function (event) {
    pairs = event.pairs;
    if (checkMangoShot()) {
        var obj1 = pairs[0].bodyA;
        var obj2 = pairs[0].bodyB;
        Body.setStatic(obj1, false);
        Body.setStatic(obj2, false);
        incrementScore(pairs);
        if (pairs[0].bodyA.name === "myStone") {
            disablecollisionOfFiredStones(pairs[0].bodyA);
        }
        if (pairs[0].bodyB.name === "myStone") {
            disablecollisionOfFiredStones(pairs[0].bodyB);
        }
    }
});

World.add(world, [boy, mouseConstraint, stone, sling]);

Engine.run(engine);
Render.run(render);

function createStone(x, y) {
    // Create a stone object
    var scale = Common.random(0.05 * 2.5, 0.08 * 2.5)
    stone = Bodies.circle(x, y, 18, {
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

function disablecollisionOfFiredStones() {
    for (const eachArgument in arguments) {
        const argument = arguments[eachArgument];
        firedStones.push(argument);
    }
    addCollisionFilterToFiredStones();
}

function addCollisionFilterToFiredStones() {
    // for (const key in firedStones) {
    //     const stone = firedStones[key];

    // }
    firedStones.forEach(firedStone => {
        firedStone.collisionFilter.group = -2;
    });
}

function checkMangoShot() {
    // Check if the object collion is a mango or not. Return the value in boolean form
    return (
        pairs[0].bodyA.name !== "Boy"
        && pairs[0].bodyA.name !== "Ground"
        && pairs[0].bodyA.name !== "Edge"
        && pairs[0].bodyB.name !== "Boy"
        && pairs[0].bodyB.name !== "Ground"
        && pairs[0].bodyB.name !== "Edge"
    )
}

function incrementScore(pairs) {
    // Define the two bodies
    var mangoBodyA;
    var mangoBodyB;
    if (pairs[0].bodyA.name.slice(0, 5) === "mango") {
        mangoBodyA = pairs[0].bodyA;
        mangoBodyA.collisionFilter.group = -2;
    }
    if (pairs[0].bodyB.name.slice(0, 5) === "mango") {
        mangoBodyB = pairs[0].bodyB;
        mangoBodyB.collisionFilter.group = -2;
    }
    // Add the score
    addScoreOnce(mangoBodyA, mangoBodyB);
    updatescoreAndChancesText();
}

// This function is for adding the score the game
// to avoid continuous score incrementing for continuous
// or more than one touch of the stone to any mango.
function addScoreOnce() {
    // Run this as many times and the count of arguments provided
    for (const eachArgument in arguments) {
        const body = arguments[eachArgument];
        if (body != undefined && body != null) {
            var alreadyScored = false;
            for (var j = 0; j < fallenMangoNames.length; j++) {
                if (body.name === fallenMangoNames[j]) {
                    alreadyScored = true;
                }
            }
            if (!alreadyScored) {
                fallenMangoNames.push(body.name);
            }
        }
    }
}

function updatescoreAndChancesText() {
    scoreTxt = "|| Score: " + fallenMangoNames.length + " points " + "|||| " + "Chances / Stones Left: " + chances + " ||";
    scoreElt.innerHTML = scoreTxt;
}