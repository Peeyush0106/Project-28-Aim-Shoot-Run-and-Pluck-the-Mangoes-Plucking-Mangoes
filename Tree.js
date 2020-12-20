class Tree {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    display() {
        image(this.image, this.x, this.y, this.width, this.height);
    }
}