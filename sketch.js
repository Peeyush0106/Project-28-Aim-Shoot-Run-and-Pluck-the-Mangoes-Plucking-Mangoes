const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var canvasWidth, canvasHeight, side_EdgesWidth, topAndBottom_EdgesHeight, rightEdge, leftEdge, topEdge, bottomEdge;

var boy, ground;

var boyImage;

function preload() {
	boyImage = loadImage("images/boy.png");
}

function setup() {
	canvasWidth = 800;
	canvasHeight = 600;
	createCanvas(canvasWidth, canvasHeight);
	engine = Engine.create();
	world = engine.world;

	side_EdgesWidth = 10;
	topAndBottom_EdgesHeight = 10;
	rightEdge = new Edge(canvasWidth + (side_EdgesWidth / 2), canvasHeight / 2, side_EdgesWidth, canvasHeight);
	leftEdge = new Edge(0 - (side_EdgesWidth / 2), canvasHeight / 2, side_EdgesWidth, canvasHeight);
	topEdge = new Edge(canvasWidth / 2, 0 - (topAndBottom_EdgesHeight / 2), canvasWidth, topAndBottom_EdgesHeight);
	bottomEdge = new Edge(canvasWidth / 2, canvasHeight + (topAndBottom_EdgesHeight / 2), canvasWidth, topAndBottom_EdgesHeight);

	boy = new Boy(200, 450);

	ground = new Ground(canvasWidth / 2, canvasHeight - 20);

	Engine.run(engine);
}


function draw() {
	background(200);
	rectMode(CENTER);
	boy.display(boyImage);
	ground.display();
}