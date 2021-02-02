var balloonImg, balloon,bgImg,bg;
var position, database;

function preload(){
  bgImg = loadImage("images/HotAirBallon-01.png");
  balloonImg = loadImage("images/HotAirBallon-02.png");
}

function setup(){
    database = firebase.database();
    createCanvas(1600,1000);
    
    

    bg = createSprite(0,0,1200,600);
    bg.addImage(bgImg);
    

    balloon = createSprite(250,600,10,10);
    balloon.addImage(balloonImg);
    balloon.scale=0.5;

    var ballPosition = database.ref('balloon/position');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("backgroundImg"); 

    if(keyDown(LEFT_ARROW)){
        balloon.x=balloon.x -10;
        }
      
        else if(keyDown(RIGHT_ARROW)){
          balloon.x=balloon.x +10;
                                                                    
        }
      
        else if(keyDown(UP_ARROW) && balloon.y > 0){
            writePosition(0, -5); 
            balloon.scale = balloon.scale +0.01;                                                     
          }
          else if(keyDown(DOWN_ARROW) && balloon.y < 500){
            writePosition(0, 7);
            balloon.scale = balloon.scale-0.01; 
          }
     
    
    drawSprites();

    strokeWeight(4);
    stroke("black");
    fill("yellow");
    textSize(20);
    text("Use the arrow keys to move the Hot Air Balloon", 60, 60);

    strokeWeight(5);
    stroke("black");
    fill("red");
    textSize(30);
    text("HOT AIR BALLON RIDE", 20, 30);

    }


function writePosition(x,y){
    database.ref("balloon/position").set(
        { 
            'x':position.x+x,
            'y':position.y+y
        }
    )
}
function readPosition(data){
    position = data.val();
    console.log(position);
    balloon.x=position.x;
    balloon.y=position.y;
}
function showError(){
    console.log("error");    
}
