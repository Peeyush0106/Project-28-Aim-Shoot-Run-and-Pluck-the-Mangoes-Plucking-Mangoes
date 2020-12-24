class Chain {
    constructor(body1, point2) {
        var options = {
            bodyA: body1,
            pointB: point2,
            stiffness: 0.04,
            length: 10
        }
        // this.image1 = loadImage("sprites/sling1.png");
        // this.image2 = loadImage("sprites/sling2.png");
        // this.image3 = loadImage("sprites/sling3.png");

        this.pointB = point2;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    release() {
        this.sling.bodyA = null;
    }
    display() {
        if (this.sling.bodyA) {
            push();
            strokeWeight(4);
            stroke("white");
            line(this.sling.bodyA.position.x, this.sling.bodyA.position.y, this.sling.pointB.x, this.sling.pointB.y);
            pop();
        }
    }
}

