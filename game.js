var player;
var playerHeight = 30;
var playerWidth = 30;
var playerX = (600 - playerWidth) / 2; // player LOCATION X
var playerY = (600 - playerHeight) / 2; // player LOCATION Y
var obstacles = [];
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var obstacleSpeed = -1;
var obstacleInterval = 60; //60 is nice speed :)
var gameScore;

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNum = 0;
        this.interval = setInterval(updategameArea, 10);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function startGame() {
    gameScore = new component("200px", "Impact", "rgba(102, 127, 122, 0.20)", 50 , 750, "text");
    gameArea.start();
}

/* function mouseMoveHandler(e) {
    var relativeX = e.clientX - gameArea.canvas.offsetLeft;
    var relativeY = e.clientY - gameArea.canvas.offsetTop;

    if(relativeX > 0 && relativeX < gameArea.canvas.width && relativeY > 0 && relativeY < gameArea.canvas.height) {
        playerX = relativeX - playerWidth / 2;
        playerY = relativeY - playerHeight / 2;
    }
} */

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

// document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawPlayer() {
    ctx = gameArea.context;
    ctx.fillStyle = "black";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.gameScore = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = gameArea.context;
    this.update = function() {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.updateScore = function() {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

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

    if ((playerBottom < otherTop) || (playerTop > otherBottom) || (playerRight < otherLeft) || (playerLeft > otherRight)) {
        crash = false;
    }
    return crash;
}

function updategameArea() {
    var x, y;   

    gameArea.clear();
    gameArea.frameNum += 1;0

    if (gameArea.frameNum == 1 || everyinterval(100)) {
        obstacleSpeed += -0.1
    }

    if (gameArea.frameNum == 1 || everyinterval(500) && obstacleInterval > 5) {
        obstacleInterval -= 5
    }

    if (gameArea.frameNum == 1 || everyinterval(obstacleInterval)) {
        var newObstacleWidth = 50
        var newObstacleHeight = 50

        // random value between canvas width
        var randX = Math.floor(Math.random() * (gameArea.canvas.width - newObstacleWidth)) + newObstacleWidth /* - newObstacleWidth */;
        obstacles.push(new component(newObstacleWidth, newObstacleHeight, randomColor(), randX, gameArea.canvas.height));
    }

    gameScore.text= (gameArea.frameNum / 10).toFixed(0);
    gameScore.updateScore();


    for (i = 0; i < obstacles.length; i+= 1) {
        obstacles[i].y += obstacleSpeed;
        obstacles[i].update();
    }

    drawPlayer();

    if (rightPressed && playerX < gameArea.canvas.width - playerWidth) {
        playerX += 3;
    }
    else if (leftPressed && playerX > 0) {
        playerX -= 3;
    }
    else if (downPressed && playerY < gameArea.canvas.height - playerHeight) {
        playerY += 3;
    }
    else if (upPressed && playerY > 0) {
        playerY -= 3;
    }

    for(i = 0; i < obstacles.length; i+= 1) {
        if (hitObject(obstacles[i])) {
            gameArea.stop();
            return;
        }
    }

}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) {
        return true;
    }
    return false;
}