const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var backgroundImg, melonImg, rabbitImg;
var bunny;
var button;

function preload(){
  backgroundImg = loadImage("./Imgs/background.png");
  melonImg = loadImage("./Imgs/melon.png");
  rabbitImg = loadImage("./Imgs/Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(7, {x: 250, y:30});
  var fruit_options = {
    isStatic: false,
    density:0.001,
  }
  fruit = Bodies.circle(300, 300, 15, fruit_options);

  Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  bunny = createSprite(width/2, height-50, 100, 100);
  bunny.addImage(rabbitImg);
  bunny.scale = 0.2;

  button = createImg("./Imgs/download.jpg");
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(backgroundImg, width/2, height/2, width, height);
  image(melonImg, fruit.position.x, fruit.position.y, 70, 70);
  
  
  ground.show();
  rope.show();

  

  
  Engine.update(engine);
  

 
   drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;

}
