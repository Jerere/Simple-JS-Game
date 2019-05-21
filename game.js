var playerHeight = 30;
var playerWidth = 30;
var playerX = (600 - playerWidth) / 2; // player starting location on X-axis
var playerY = (600 - playerHeight) / 2; // player starting location on Y-axis
var playerSpeed = 3; // player speed (3 = 3 pixels per update)
var obstacles = []; // obstacles array
var rightPressed = false; // keyboard booleans 
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var obstacleSpeed = -1; // obastacles starting speed (minus speed because canvas draws from top)
var obstacleInterval = 60; // time before pushing new obstacle (60 = every 0.6 second)
var gameScore;

// gameArea contains start, clear and stop functions
var gameArea = {
    canvas : document.createElement("canvas"), // creates canvas
    start : function() { // starts game
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d"); // container for graphics
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNum = 0; // number of current frame
        this.interval = setInterval(updategameArea, 10); // updates game every 10ms second
    },
    clear : function() { // clears canvas (creates illusion that objects move)
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() { // stops game
        clearInterval(this.interval);

        setTimeout(function(){ // 0.3 sec pause between game over and popup page
            document.getElementById("p1").innerHTML = "You got " + gameScore.text +" points";
            var scoreint = Number(gameScore.text); // score to int for database
            document.getElementById("score").value = scoreint;
            var button = document.getElementById("buttonTry");
            button.onclick = function() { // play again function
                location.reload(); // reloads page
            }
            popUp();
        }, 300);

    }
}

function startGame() { // function called when index.php is loaded
    // component that draws score to bottom left corner
    gameScore = new component("200px", "Impact", "rgba(102, 127, 122, 0.20)", 50 , 750, "text");
    gameArea.start();
}

// mouse move ability (too fast and makes game buggy)
/* function mouseMoveHandler(e) {
    var relativeX = e.clientX - gameArea.canvas.offsetLeft;
    var relativeY = e.clientY - gameArea.canvas.offsetTop;

    if(relativeX > 0 && relativeX < gameArea.canvas.width && relativeY > 0 && relativeY < gameArea.canvas.height) {
        playerX = relativeX - playerWidth / 2;
        playerY = relativeY - playerHeight / 2;
    }
} */

// checks which key is pressed
function keyDownHandler(e) {
    if (e.keyCode == '39') {
        rightPressed = true;
    }
    else if (e.keyCode == '37') {
        leftPressed = true;
    }
    else if (e.keyCode == '40') {
        downPressed = true;
    }
    else if (e.keyCode == '38') {
        upPressed = true;
    }

}

// checks which key is not pressed any more
function keyUpHandler(e) {
    if (e.keyCode == '39') {
        rightPressed = false;
    }
    else if (e.keyCode == '37') {
        leftPressed = false;
    }
    else if (e.keyCode == '40') {
        downPressed = false;
    }
    else if (e.keyCode == '38') {
        upPressed = false;
    }
}

// events that check if key pressed or not
// document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// draws player
function drawPlayer() {
    ctx = gameArea.context;
    ctx.fillStyle = "black"; // fills player with color
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // draws player
    
}
// component constructor 
function component(width, height, color, x, y, type) {
    this.type = type; // for text components
    this.gameScore = 0; 
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = gameArea.context;
    this.update = function() { // updates component to new position
        ctx.fillStyle = color; // component color 
        ctx.fillRect(this.x, this.y, this.width, this.height); // draws component
    }
    this.updateScore = function() { // updates score text
        ctx.font = this.width + " " + this.height; // font attributes
        ctx.fillStyle = color; // text color 
        ctx.fillText(this.text, this.x, this.y); // draws the score text
    }
}

// collision detection
function hitObject(other) {
    var playerLeft = playerX;
    var playerRight = playerX + (playerWidth);
    var playerTop = playerY;
    var playerBottom = playerY + (playerHeight);
    var otherLeft = other.x;
    var otherRight = other.x + (other.width);
    var otherTop = other.y;
    var otherBottom = other.y+ (other.height);
    var crash = true;
    
    // checks if player and obstacle do not overlap
    if ((playerBottom < otherTop) || (playerTop > otherBottom) || (playerRight < otherLeft) || (playerLeft > otherRight)) {
        crash = false;
    }
    return crash;
}

// update cycle order
function updategameArea() {

    gameArea.clear(); // clears canvas
    gameArea.frameNum += 1; // counts frames

    if (gameArea.frameNum == 1 || everyinterval(100)) { // increases obstalce speed every 100 interval
        obstacleSpeed += -0.1  
    }
    
    // adds more obstacles every 500 interval until spawnrate is one obstacle every 0.1 sec
    if (gameArea.frameNum == 1 || everyinterval(500) && obstacleInterval > 10) {
        obstacleInterval -= 5
    }
    
    // pushes new obstalces from bottom of the canvas
    if (gameArea.frameNum == 1 || everyinterval(obstacleInterval)) {
        var newObstacleWidth = 50
        var newObstacleHeight = 50

        // random value between canvas width
        var randX = Math.floor(Math.random() * (gameArea.canvas.width - newObstacleWidth)) + newObstacleWidth - newObstacleWidth;
        obstacles.push(new component(newObstacleWidth, newObstacleHeight, randomColor(), randX, gameArea.canvas.height));
    }

    gameScore.text = (gameArea.frameNum / 10).toFixed(0); // adds 1 point to score
    gameScore.updateScore(); // updates score text

    for (i = 0; i < obstacles.length; i+= 1) { // updates obstacles to new positons
        obstacles[i].y += obstacleSpeed;
        obstacles[i].update();
    }
    
    // moves player to given direction while player in the canvas area
    if (rightPressed && playerX < gameArea.canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
    else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
    else if (downPressed && playerY < gameArea.canvas.height - playerHeight) {
        playerY += playerSpeed;
    }
    else if (upPressed && playerY > 0) {
        playerY -= playerSpeed;
    }

    drawPlayer(); // updates player postion

    for(i = 0; i < obstacles.length; i+= 1) { // puts every obstalce through collison detection
        if (hitObject(obstacles[i])) {
            gameArea.stop(); // stops game if crash detected
            return;
        }
    } 
}

function everyinterval(n) { // returns true if the current framenumber corresponds with the given interval (w3schools)
    if ((gameArea.frameNum / n) % 1 == 0) {
        return true;
    }
    return false;
}
