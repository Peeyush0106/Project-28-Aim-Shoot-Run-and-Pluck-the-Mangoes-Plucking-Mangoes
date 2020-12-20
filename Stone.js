class Stone {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.options = {
            density: 0.0004,
            friction: 1,
            restitution: 0.5
        };
        this.body = Bodies.circle(this.x, this.y, this.radius, this.options);
        World.add(world, this.body);
    }
    display(objectImage) {
        if (objectImage) {
            image(objectImage, this.body.position.x, this.body.position.y, this.diameter * 1.8, this.diameter * 1.8);
        }
    }
}