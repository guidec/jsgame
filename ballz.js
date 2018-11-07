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
var brickRowCount = 6;
var brickColumnCount = 16;
var brickWidth = 16;
var brickHeight =  10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 40;
//Review what the hell these mean
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
//------------------------------------------------------  
var bricks = []; //create array to store bricks based on column and row count. 
    for (var c= 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r< brickRowCount; r++) {
            bricks[c][r] = {x:0, y:0} // initialize new bricks (this will be changed when bricks are drawn)
        }
    }
function drawBricks() {
    //initialize variables to zero at every pass for clearRect
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var xBrick = (c*(brickWidth+brickPadding)+brickOffsetLeft);
            var yBrick = (r*(brickHeight+brickPadding)+brickOffsetTop);

            bricks[c][r].x = xBrick;
            bricks[c][r].y = yBrick;
            //draw one brick per pass through loop. x and y will get updated every time.
            ctx.beginPath();
            ctx.rect(xBrick, yBrick, brickWidth, brickHeight);
            ctx.fillStyle = "darkblue";
            ctx.fill();
            ctx.closePath();
        }
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
    drawBricks();
    
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