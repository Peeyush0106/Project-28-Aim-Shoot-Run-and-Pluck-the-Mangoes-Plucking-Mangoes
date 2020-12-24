const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var canvasWidth, canvasHeight, side_EdgesWidth, topAndBottom_EdgesHeight, rightEdge, leftEdge, topEdge, bottomEdge;

var boy, boyHand, ground, stone, tree;

var boyImage, boyHandImage, bg, treeImage;

var mango1, mango2, mango3, mango4, mango5, mango6;

var pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10;

var availableMangoPlaces;

var groundAddedToWorld;

var mango1Pos;

function preload() {
	bg = loadImage("images/area.jpg");
	boyImage = loadImage("images/boy.png");
	stoneImage = loadImage("images/stone.png");
	treeImage = loadImage("images/tree.png");
}

function setup() {
	canvasWidth = 800;
	canvasHeight = 400;
	createCanvas(canvasWidth, canvasHeight);
	engine = Engine.create();
	world = engine.world;

	side_EdgesWidth = 10;
	topAndBottom_EdgesHeight = 10;
	rightEdge = new Edge(canvasWidth + (side_EdgesWidth / 2), canvasHeight / 2, side_EdgesWidth, canvasHeight);
	leftEdge = new Edge(0 - (side_EdgesWidth / 2), canvasHeight / 2, side_EdgesWidth, canvasHeight);
	topEdge = new Edge(canvasWidth / 2, 0 - (topAndBottom_EdgesHeight / 2), canvasWidth, topAndBottom_EdgesHeight);
	bottomEdge = new Edge(canvasWidth / 2, canvasHeight + (topAndBottom_EdgesHeight / 2), canvasWidth, topAndBottom_EdgesHeight);

	// var test = Bodies.polygon(400, 200, 4, 30, { isStatic: true });

	boy = new Boy(195, 285);

	// pos1 = { x: 612, y: 92 };
	// pos2 = { x: 560, y: 150 };
	// pos3 = { x: 600, y: 180 };
	// pos4 = { x: 677, y: 166 };
	// pos5 = { x: 750, y: 170 };
	// pos6 = { x: 720, y: 130 };
	// pos7 = { x: 690, y: 110 };
	// pos8 = { x: 650, y: 130 };
	// pos9 = { x: 700, y: 113 };
	// pos10 = { x: 645, y: 115 };

	// availableMangoPlaces = [pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10];

	// mongo1PosRandomNo = random(0, 9);
	// mongo1Pos = availableMangoPlaces[mongo1PosRandomNo];
	// mango1 = new Mango(mongo1Pos, 20);

	// console.log(mango1.x);
	console.log(mango1Pos);

	stone = new Stone(150, 320, 14.5);

	shooter = new Chain(stone.body, { x: boy.x - 30, y: boy.y - 30 });

	ground = new Ground(canvasWidth / 2, canvasHeight - 30);

	tree = new Tree(treeImage, 650, 200, 401 / 1.45, 427 / 1.45);

	groundAddedToWorld = false;

	Engine.run(engine);
}


function draw() {
	background(bg);
	rectMode(CENTER);
	ellipseMode(RADIUS);
	imageMode(CENTER);
	// if (shooter.chain.bodyA != null) {
	// 	World.remove(world, shooter.chain);
	// }
	// rect();
	// if (shooter.chain.bodyA === null) {
	// 	World.add(world, ground);
	// 	groundAddedToWorld = true;
	// }
	
	// if (groundAddedToWorld) {
	// 	console.log("Ground has been added to the World");
	// }

	push();
	fill("white");
	text("MouseX: " + mouseX, 500, 250);
	text("MouseY: " + mouseY, 500, 350);
	pop();

	boy.display(boyImage, null, boy.body.position.x, boy.body.position.y);
	ground.display();
	tree.display();
	shooter.display();
	stone.display(stoneImage);
}

function mouseDragged() {
	stone.body.position.x = mouseX;
	stone.body.position.y = mouseY;
}

function mouseReleased() {
	shooter.release();
}