class Hand extends Base {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 35;
        // this.options =  { density: 5 };
        // this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, this.options);
        // World.add(world, this.body);
    }
    display(objectImage, giveImageX, giveImageY) {
        image(objectImage, giveImageX, giveImageY, this.width, this.height);
    }
}