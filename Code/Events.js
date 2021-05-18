/*                                              
                                        |   |
                                        |---| |--| | |  __
                                        |   | |--| | | |  |
                                        |   | |___ | | |__|
*/

// Turning on an event to check the end of a mouse drag so that we can shoot the stone
Events.on(mouseConstraint, 'enddrag', function (e) {
    if (e.body === stone) firing = true;
});

// This continues infinitely in the game so that the stone is fired when the firing flag is true.
Events.on(engine, 'afterUpdate', function () {
    // Reset the previous stone if it went out of screen
    if (prevStone !== undefined) {
        if (prevStone.position.x > canvas.width) {
            Body.setPosition(prevStone, {
                x: canvas.width / 2 + 50,
                y: -100
            });
        }
    }
    // Increment the no. of mangoes fallen to ground
    if (fallenMangoes.length >= 6 || chances <= 0) {
        let mangoesFallenToGround = 0;
        for (let key = fallenMangoes.length; key > 0; key--) {
            const mango = fallenMangoes[key - 1];
            if (mango.position.y > 315 * 2.5) {
                mangoesFallenToGround++;
            }
        }
        if (SAT.collides(prevStone, ground).collided && fallenMangoes.length === mangoesFallenToGround) {
            gameDone = true;
        }
    }
    // Set the feedback to static if it's not
    if (feedback && !feedback.isStatic) feedback.isStatic = true;
    // Reset any mango if it went out of screen
    for (const key in mangoes) {
        const mango = mangoes[key];
        if (mango.position.y < -30) Body.setPosition(mango, { x: 450 * 2.5, y: mango.position.y });
    }
    // Fire the stone if the chances and mangoes on the tree are remaning
    if (firing && chances > 0 && fallenMangoes.length <= 5 && !gameDone) {
        let x = stone.position.x;
        let y = stone.position.y;
        prevStone = stone;
        createStone(x, y);
        World.add(world, stone);
        sling.bodyB = stone;
        chances -= 1;
        updatescoreAndChancesText();
        firing = false;
    }
    // Else if the chances or mangoes aren't remaing
    else if (chances <= 0 || fallenMangoes.length >= 6) {
        World.remove(world, [stone, sling]);
    }
    // When the game is over
    if (gameDone) {
        chances = 0;
        if (createFeedbackAllowedStatus === 0) createFeedbackAllowedStatus = 1;
        createFeedback();
        firedStones.push(stone);
        firedStones = [];
        World.remove(world, sling);
        World.remove(world, rightEdge);

        updatescoreAndChancesText();
        Body.setStatic(boy, false);
        Body.setStatic(basket, false);
        Body.setVelocity(boy, { x: 4, y: -0.3 });
        Body.setVelocity(basket, { x: 4, y: -0.3 });

        for (let key in mangoes) {
            let mango = mangoes[key];
            if (SAT.collides(mango, basket).collided) {
                World.remove(world, mango);
                mango.collisionFilter.group = -3;
            }
        };

        let playQualityLevel;
        if (fallenMangoes.length === 0) playQualityLevel = 0;
        if (fallenMangoes.length >= 1 && fallenMangoes.length <= 2) playQualityLevel = 1;
        if (fallenMangoes.length >= 3 && fallenMangoes.length <= 4) playQualityLevel = 2;
        if (fallenMangoes.length >= 5 && fallenMangoes.length <= 6) playQualityLevel = 3;
        stone.collisionFilter.group = -3;
        basket.collisionFilter.group = -3;
        feedback.render.sprite.texture = "./images/feedback" + playQualityLevel + ".jpg"
    }
});

// When there is some collision, we need to see if the collion is between which objects and act accordingly.
// We are activating an event to check this.
Events.on(engine, 'collisionStart', function (event) {
    pairs = event.pairs;
    if (checkMangoShot()) {
        if (pairs[0].bodyA.name === "myStone" || pairs[0].bodyA.name.slice(0, 5) === "mango") {
            disablecollisionOfFiredStones(pairs[0].bodyA);
            let obj1 = pairs[0].bodyA;
            let obj2 = pairs[0].bodyB;
            Body.setStatic(obj1, false);
            Body.setStatic(obj2, false);
            incrementScore(pairs);
        }
        if (pairs[0].bodyB.name === "myStone" || pairs[0].bodyB.name.slice(0, 5) === "mango") {
            disablecollisionOfFiredStones(pairs[0].bodyB);
            let obj1 = pairs[0].bodyA;
            let obj2 = pairs[0].bodyB;
            Body.setStatic(obj1, false);
            Body.setStatic(obj2, false);
            incrementScore(pairs);
        }
    }
});