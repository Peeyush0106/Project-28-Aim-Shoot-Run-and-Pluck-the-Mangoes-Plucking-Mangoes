class Boy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 140;
        this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, { density: 20 });
        World.add(world, this.body);
    }
    display(image) {
        if (image) {
            image(this.body.position.x, this.body.position.y, this.width, this.height);
        }
        else {
            rectMode(CENTER);
            rect(this.body.position.x, this.body.position.y, this.width, this.height);
        }
    }
}