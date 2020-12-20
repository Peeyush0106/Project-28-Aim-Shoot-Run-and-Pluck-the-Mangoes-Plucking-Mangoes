// class Mango {
//     constructor(position, radius) {
//         // this.pos = pos;
//         // // console.log(this.pos);
//         // this.pos = pos;
//         // this.x = this.pos.x;
//         // this.y = this.pos.y;
//         this.radius = radius;
//         this.diameter = this.radius * 2;
//         this.options = {
//             density: 0.0004,
//             friction: 1,
//             restitution: 0.5,
//             isStatic: true
//         };
//         this.body = Bodies.circle(position.x, position.y, this.radius, this.options);
//         World.add(world, this.body);
//     }
//     display(objectImage) {
//         if (objectImage) {
//             image(objectImage, this.body.position.x, this.body.position.y, this.diameter * 1.8, this.diameter * 1.8);
//         }
//     }
// }