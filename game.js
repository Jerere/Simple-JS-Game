var player;
var playerHeight = 30;
var playerWidth = 30;
var playerX = (600-playerWidth)/2; // player LOCATION X
var playerY = (600-playerHeight)/2; // player LOCATION Y
var obstacles = [];

document.addEventListener("mousemove", mouseMoveHandler, false);


function mouseMoveHandler(e) {
    var relativeX = e.clientX - gameArea.canvas.offsetLeft;
    var relativeY = e.clientY - gameArea.canvas.offsetTop;

    if(relativeX > 0 && relativeX < gameArea.canvas.width && relativeY > 0 && relativeY < gameArea.canvas.height) {
        playerX = relativeX - playerWidth / 2;
        playerY = relativeY - playerHeight / 2;
    }
}

function startGame() {
    gameArea.start();
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNum = 0;
        this.interval = setInterval(updategameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function drawPlayer() {
    ctx = gameArea.context;
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    for(i = 0; i < obstacles.length; i+= 1) {
        if (hitObject(obstacles[i])) {
            gameArea.stop();
            return;
        }
    }

    gameArea.clear();
    gameArea.frameNum += 1; // points?

    if (gameArea.frameNum == 1 || everyinterval(120)) {
        x = gameArea.canvas.width;
        y = gameArea.canvas.height;
        obstacles.push(new component(50, 50, "green", Math.floor(Math.random() * gameArea.canvas.width), gameArea.canvas.height));
    }

    for (i = 0; i < obstacles.length; i+= 1) {
        obstacles[i].y += -1;
        obstacles[i].update();
    }

    drawPlayer();

}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) {return true;}
    return false;
}
