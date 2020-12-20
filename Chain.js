class Chain {
    constructor(body1, point2) {
        var chain_options = {
            bodyA: body1,
            pointB: point2,
            length: 5,
            stiffness: 0.004
        }
        this.chain = Matter.Constraint.create(chain_options);
        World.add(world, this.chain);
        this.bodyA = body1;
        this.pointB = point2;
    }
    release() {
        this.chain.bodyA = null;
    }
    attach() {
    }
    display() {
        if (this.chain.bodyA) {
            push();
            strokeWeight(4);
            stroke("white");
            line(this.bodyA.position.x, this.bodyA.position.y, this.pointB.x, this.pointB.y);
            pop();
        }
    }
}