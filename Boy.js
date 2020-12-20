class Boy extends Base {
    constructor(x, y) {
        super(x, y, 80, 140, { density: 100 });
        World.remove(world, this.body);
    }
    display(image, color, imageX, imageY) {
        super.display(image, color, imageX, imageY);
    }
    
}