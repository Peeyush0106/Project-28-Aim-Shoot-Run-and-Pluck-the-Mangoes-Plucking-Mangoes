class Ground extends Base {
    constructor(x, y) {
        super(x, y, canvasWidth, 60, { density: 20, friction: 8, isStatic: true });
        // World.remove(world, this.body);
    }
    display() {
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }
}