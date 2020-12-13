class Ground {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = canvasWidth;
        this.height = 40;
        this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, { density: 20 });
        World.add(world, this.body);
    }
    display() {
        rectMode(CENTER);
        noStroke();
        fill(rgb(228, 75, 50));
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }
}