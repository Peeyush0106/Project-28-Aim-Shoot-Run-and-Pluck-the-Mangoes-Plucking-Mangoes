/*                                              
                                        |   |
                                        |---| |--| | |  __
                                        |   | |--| | | |  |
                                        |   | |___ | | |__|
*/

// Add objects to the world
World.add(world, [boy, basket, mouseConstraint, stone, sling]);

// Run Engine and Render
Engine.run(engine);
Render.run(render);

// Disable the collision of fired stones with objects that the stone is expected to pass through.
function disablecollisionOfFiredStones() {
    for (const eachArgument in arguments) {
        const argument = arguments[eachArgument];
        firedStones.push(argument);
    }
}

// Check if the object collion is a mango or not. Return the value in boolean form
function checkMangoShot() {
    return (
        pairs[0].bodyA.name !== "Boy"
        && pairs[0].bodyA.name !== "Ground"
        && pairs[0].bodyA.name !== "Edge"
        && pairs[0].bodyA.name !== "Basket"
        && pairs[0].bodyA.name !== "Feedback"
        && pairs[0].bodyA.name.slice(0, 11) !== "fallenMango"
        && pairs[0].bodyB.name !== "Boy"
        && pairs[0].bodyB.name !== "Ground"
        && pairs[0].bodyB.name !== "Edge"
        && pairs[0].bodyB.name !== "Basket"
        && pairs[0].bodyB.name !== "Feedback"
        && pairs[0].bodyB.name.slice(0, 11) !== "fallenMango"
    )
}

// Increment the score by one
function incrementScore(pairs) {
    // Define the two bodies
    let mangoBodyA;
    let mangoBodyB;
    if (pairs[0].bodyA.name.slice(0, 5) === "mango") {
        mangoBodyA = pairs[0].bodyA;
    }
    if (pairs[0].bodyB.name.slice(0, 5) === "mango") {
        mangoBodyB = pairs[0].bodyB;
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
            let alreadyScored = false;
            for (let j = 0; j < fallenMangoes.length; j++) {
                if (body.name === fallenMangoes[j].name) {
                    alreadyScored = true;
                }
            }
            if (!alreadyScored) {
                let initialBodyName = body.name;
                let bodyNumber = initialBodyName.slice(5, 6);
                body.name = "fallenMango" + bodyNumber
                fallenMangoes.push(body);
            }
        }
    }
}

// Create the feedback for the player so that the player can know their playing level
function createFeedback() {
    if (createFeedbackAllowedStatus === 1) {
        feedback = Bodies.rectangle(canvas.width / 2, canvas.height / 2, 100, 100, {
            isStatic: true,
            render: {
                sprite: {
                    texture: "./images/feedback0.jpg",
                    xScale: 3,
                    yScale: 3
                },
                level: 0,
            }
        });

        feedback.name = "Feedback";
        World.add(world, feedback);
        createFeedbackAllowedStatus = -1;
    }
}