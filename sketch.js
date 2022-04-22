var trex, trex_running, edges;
var groundImage;
var chao;
var chaoInvisivel;
var nuvem,imgNuvens
var obs1, obs2, obs3, obs4, obs5, obs6
var grupoObs,grupoNuvem;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexcollide;
var gamerOver;
var restart;
var score = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollide = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  imgNuvem = loadImage("cloud.png")
  restart1 = loadImage("restart.png")
  gamerOver = loadImage("gameOver.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("bateu", trexcollide);
  trex.debug = true;
  trex.setCollider("circle",0,0,40);
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  edges = createEdgeSprites();

  chaoInvisivel = createSprite(200,190,400,20)
  chaoInvisivel.visible = false;
  chao = createSprite(300,170,700,5);
  chao.velocityX = -2;
  chao.addImage(groundImage);
  
  grupoObs = new Group();
  grupoNuvem = new Group();

  restart = createSprite(300,140);
  restart.scale = 0.6
  restart.addImage(restart1);
  restart.visible = false;

  
  fim = createSprite(300,100);
  fim.scale = 0.6
  fim.addImage(gamerOver);
  fim.visible = false;
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("Pontuação: "+ score, 500,50);
  //registrando a posição y do trex
  console.log(trex.y)
  if (gameState === PLAY){
      //pular quando tecla de espaço for pressionada
    if(keyDown("space")&& trex.y>=152){
      trex.velocityY = -10;
    }
    //gravidade
    trex.velocityY = trex.velocityY + 0.5;
    //PONTUAÇÃO
    score = score + Math.round(getFrameRate()/60);
    if(score > 0 && score%100 === 0){
      //colocar musica aqui
    }
    chao.velocityX = -(2 + 3*score/100);
    //movimentar o chão
    if(chao.x <0){
      chao.x = chao.width/2;
    }

    cactos();
    if (grupoObs.isTouching(trex)){
      gameState = END;
      restart.visible = true;
      fim.visible = true;
    }
  } 
  else if (gameState === END){
    chao.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("bateu",trexcollide);
    grupoObs.setVelocityXEach(0);
    grupoObs.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  //colocar Pontuação 
  
  
 //impedir que o trex caia
  trex.collide(chaoInvisivel)
  nuvens();
  drawSprites();

}

function reset(){
  gameState = PLAY 
  restart.visible = false;
  fim.visible = false;
  trex.changeAnimation("running");
  grupoObs.destroyEach();
  score = 0;
  
}

function nuvens(){
  if (frameCount%60===0){
    nuvem = createSprite(580,5,10,10);
    nuvem.velocityX = -3;
    nuvem.addImage(imgNuvem);
    nuvem.y = Math.round(random(8,80))
    console.log(trex.depth)
    console.log(nuvem.depth)
    nuvem.depth = trex.depth 
    trex.depth = trex.depth+1
    nuvem.lifetime = 220
    grupoNuvem.add(nuvem);
  }
};

function cactos(){
  if (frameCount%60===0){
    obstaculo = createSprite(600,160,20,20);
    obstaculo.velocityX = -(5 + score/100);
    obstaculo.scale = 0.6
    obstaculo.debug = true;
    sort = Math.round(random(1,6));
    switch(sort){
      case 1:obstaculo.addImage(obs1);
       break;
      case 2:obstaculo.addImage(obs2);
       break;
      case 3:obstaculo.addImage(obs3);
       break;
      case 4:obstaculo.addImage(obs4);
       break;
      case 5:obstaculo.addImage(obs5);
       break;
      case 6:obstaculo.addImage(obs6);
       break;
    }
    obstaculo.lifetime = 130
    grupoObs.add(obstaculo);
  }
}