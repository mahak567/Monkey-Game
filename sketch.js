
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var bananaScore = 0;
var monkey_collided;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime=0;    
var ground,groundImg;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkey_collided= loadImage("sprite_1.png");
  groundImg = loadImage("ground.png");
  monkey_collided= loadAnimation("sprite_1.png");
}



function setup() {
  fill("black");
createCanvas(600,400);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  
  ground = createSprite(600,400,1200,600);
  ground.scale = 1;

 
   ground.addImage("ground",groundImg);
 
  console.log(ground.x);
  ground.setCollider("rectangle",0,0,1210,168);
    ground.debug=true;
  console.log(groundImg)
   monkey = createSprite(80,200,10,10);  
  monkey.scale=0.12;
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collide", monkey_collided);
  
 
}


function draw() {
  background("lightblue");
   
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
   if(gameState === PLAY){
   obstacles();
       bananas();
      score = score + Math.round(getFrameRate()/60);
      ground.velocityX=-4;
    if(keyDown("space") && monkey.y >= 270) {
      monkey.velocityY = -13;
      
      console.log(monkey.y);
     
    }
      monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground); 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
     if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
   }
 
   if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 290;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkey_collided);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("moving", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  drawSprites();
  
}
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,170, 50, 50 )
    banana.y=Math.round(random(120,200));
   
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;         
    banana.lifetime = 220;
    bananaGroup.add(banana);
    

    
  }
  

  
}
function obstacles(){
  if(frameCount%200===0){
     obstacle = createSprite(500,300,50,50);
    obstacle.addImage(obstacleImage);
     obstacle.scale = 0.13 ;
        obstacle.velocityX = -5;
     obstacle.lifetime = 200;            
    obstacleGroup.add(obstacle);
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,20);
    console.log(obstacle.y);
  }
  



}