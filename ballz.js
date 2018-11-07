//javascript code goes ere

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var color = "black";
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickWidth = 30;
var brickHeight = 20;
var xBrick = 0;
var yBrick = 0;

//Review what the hell these mean
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
//------------------------------------------------------  

function drawBrick(){
    ctx.beginPath();
    ctx.rect(xBrick, yBrick, brickWidth, brickHeight)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function layBricks(){
    while (xBrick < canvas.width){
        drawBrick();
        xBrick += brickWidth + 10;
    }
}


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
    }  
function keyDownHandler(e){
    if (e.keyCode ==39){
        rightPressed = true;
    }
    else if(e.keyCode ==37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if (e.keyCode == 39){
        rightPressed = false;
    }
    else if (e.keyCode == 37){
        leftPressed = false;
    }
}
    

function getRandomColor() {
  var letters = '0123456789ABCDEF';
    var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
} 
    
function drawBall() {
    //code to draw

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle =  color;
    ctx.fill();
    ctx.closePath();   
}
    

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    layBricks();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        color = getRandomColor();
    
    }
    if(y + dy < ballRadius) {
        dy = -dy;
        color = getRandomColor();
    
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dx +=0.5;
            dy -=0.5;
            color = getRandomColor();
    
        }
        else {
            alert("GAME OVER, you're DEAD");
            document.location.reload();
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);