//
window.onload = function() {
    var Canvas = document.getElementById("main-canvas");
    var ctx = Canvas.getContext("2d");

    function interval(){
        //                   milliseconds
        //                        |
        setInterval(updateCanvas, 50);
      }
    
      var introPage= document.getElementById("game-start")
      //console.log(introPage)


      document.getElementById("start-game").onclick = function() {
        interval(); 
        startGame();
        introPage.style.display="none";
      };
    
      function startGame() {
        // console.log("starting the game");
        drawPoop();
      }
      
// Defining Player     
let poopPlayer = new Image();
poopPlayer.src='images/poop.png';

var poop = {
    width: 50,
    height: 50,
    x: 0,
    y: 650,

    left: function(){
      return this.x
    },
    right: function(){
      return this.x + this.width
    },
    top: function(){
      return this.y
    },
    bottom: function(){
      return this.y + this.height
    },
    
    moveRight: function(){
        if(this.x < 900){
          this.x +=10;
        }
    },
    moveLeft: function(){
        if(this.x > 0){
        this.x -=10;
    }
    },
    jump: function(){
        if(this.y >550){
            this.y -=100;
            
        }
    }
    }

function drawPoop(){
    //console.log("DRAW POOP");
    //ctx.drawImage(poopPlayer, 20, 20, 80, 50);
    
    ctx.drawImage(poopPlayer, poop.x, poop.y, poop.width, poop.height);

    };

      var myObstacles = [];
      var board = {
        score: 0,
        // we add a frames variable on board object because this will help us to count 
        // how many times we call the updateCanvas() function. This way, we can push new 
        // obstacles every certain amount of updates.
        frames: 0
      }
    
      document.onkeydown = function(e){
        if(e.keyCode === 37){
          poop.moveLeft();
        } else if(e.keyCode === 39){
          poop.moveRight();
          }
          else if(e.keyCode === 32){
            poop.jump();  
            setTimeout(function () {
                poop.y= 650;
                // console.log(poop);
            }, 500);
          } 
          else {
          //console.log("blah?")
        }
    
        drawPoop();
        for(var i = 0; i < myObstacles.length; i++){
          // myObstacles[i].y +=10;
          myObstacles[i].createObstacle();
        }
      }

      let poopMonster = new Image();
      poopMonster.src='images/poopmonster.png';



      function Obstacle(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.createObstacle = function(){
          ctx.drawImage(poopMonster, this.x, this.y, this.width, this.height);

        }
        this.left = function(){
          return this.x
        }
        this.right = function(){
          return this.x + this.width
        }
        this.top = function(){
          return this.y
        }
        this.bottom = function(){
          return this.y + this.height
        }
        this.checkCollision = function(obstacle){
            console.log("Player: "+poop.x+"Obstacle: "+obstacle.x);
            return !((this.bottom() < obstacle.top())    ||
             (this.top()    > obstacle.bottom()) ||
             (this.right()  < obstacle.left())   ||
             (this.left()   > obstacle.right())) 
        }
    
      }
    
      function updateCanvas(){
        ctx.clearRect(0, 0, 900, 700);
        drawPoop();
        board.frames ++;
        // give me a new obstacle every 60 frames and start now
        // if this was equal to 0, we would have to wait 60 frames to see
        // our first obstacle
        if (board.frames % 60 === 1){
          obstacleX = 900;
          obstacleY = 650;
          obstacleWidth = 50;
          obstacleHeight = 50;
          myObstacles.push(new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight));  
        }
       
        for(var i = 0; i < myObstacles.length; i++){
          // console.log(myObstacles)
          myObstacles[i].x -= 15;
          myObstacles[i].createObstacle();
    
          if(myObstacles[i].checkCollision(poop) === true){
            // console.log("collision detected");
            setTimeout(function(){
            alert("Crashed!");
            }, 30)
            board.score = 0;
            board.frames = 0;
            myObstacles = [];
            startGame();
          }
        }
    
      }
    
    }
    


// Defining players
/*let poopMonster = new Image();
poopMonster.src='images/poopmonster.png';
let toilerPaper = new Image();
toiletPaper.src='images/toiletpaper.png';
let poopLocation = []; //Initial player position
//*/



