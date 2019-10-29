var playerHeight = 50;
var playerWidth = 50;
var obstacleHeight = 80;
var obstacleWidth = 80;
var playerX = (window.outerWidth / 2) - playerWidth; // player starting location on X-axis
var playerY = (window.outerHeight / 3) - playerHeight; // player starting location on Y-axis
var playerSpeed = 3; // player speed (3 = 3 pixels per update)
var obstacles = []; // obstacles array
var rightPressed = false; // keyboard booleans 
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var useristoucginh = false;
var obstacleSpeed = -2; // obastacles starting speed (minus speed because canvas draws from top)
var obstacleInterval; // time before pushing new obstacle (60 = every 0.6 second)
var gameScore;
var gameTitle = "Väistelypeli Christmas edition";
var canvasWidth;
var canvasHeight;
var presentID = ["present_1", "present_2", "present_3"];

// gameArea contains start, clear and stop functions
var gameArea = {
	canvas: document.createElement("canvas"), // creates canvas
	start: function () { // starts game
		this.canvas.width = canvasWidth;
		this.canvas.height = canvasHeight;
		this.context = this.canvas.getContext("2d"); // container for graphics
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNum = 0; // number of current frame
		this.interval = setInterval(updategameArea, 10); // updates game every Xms second
	},
	clear: function () { // clears canvas (creates illusion that objects move)
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function () { // stops game
		clearInterval(this.interval);

		setTimeout(function () { // 0.3 sec pause between game over and popup page
			document.getElementById("p1").innerHTML = "You got " + gameScore.text + " points";
			var scoreint = Number(gameScore.text); // score to int for database
			document.getElementById("score").value = scoreint;
			var button = document.getElementById("buttonTry");
			button.onclick = function () { // play again function
				location.reload(); // reloads page
			}
			popUp();
		}, 300);

	}
}

function startGame() { // function called when index.php is loaded
	config();
	// component that draws score to bottom left corner
	gameScore = new component("900 200px", "Titillium Web", "rgba(102, 127, 122, 0.3)", (canvasWidth * 0.03), (canvasHeight * 0.95), "text");
	gameName = new component("900 50px", "Titillium Web", "rgba(102, 127, 122, 0.3)", (canvasWidth * 0.03), (canvasHeight * 0.1), "text");
	gameArea.start();
}

// checks which key is pressed
function keyDownHandler(e) {
	if (e.keyCode == '39') {
		rightPressed = true;
	} else if (e.keyCode == '37') {
		leftPressed = true;
	} else if (e.keyCode == '40') {
		downPressed = true;
	} else if (e.keyCode == '38') {
		upPressed = true;
	}
}

// checks which key is not pressed any more
function keyUpHandler(e) {
	if (e.keyCode == '39') {
		rightPressed = false;
	} else if (e.keyCode == '37') {
		leftPressed = false;
	} else if (e.keyCode == '40') {
		downPressed = false;
	} else if (e.keyCode == '38') {
		upPressed = false;
	}
}

// eventListeners that check if key pressed or not
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// eventListeners that check wich side the display is pressed or not
document.addEventListener('touchstart', function (e) {
	var clientX = e.touches[0].clientX;
	if (clientX < (canvasWidth / 2)) {
		leftPressed = true;
	} else {
		rightPressed = true;
	}
}, false);

document.addEventListener('touchend', function (e) {
	leftPressed = false;
	rightPressed = false;
}, false);

// draws player
function drawPlayer() {
	ctx = gameArea.context;
	const image = document.getElementById("present_1");
	ctx.drawImage(image, playerX, playerY, playerWidth, playerHeight);
	// ctx.fillStyle = "black"; // fills player with color
	// ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // draws player

}
// component constructor 
function component(width, height, color, x, y, type) {
	this.type = type; // for text components
	this.gameScore = 0;
	this.gameName = "";
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	ctx = gameArea.context;
	this.update = function () { // updates component to new position
        // ctx.fillStyle = color; // component color
        const image = document.getElementById(color);
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
		// ctx.fillRect(this.x, this.y, this.width, this.height); // draws component
	}
	this.updateText = function () { // updates score text
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
	var otherBottom = other.y + (other.height);
	var crash = true;

	// checks if player and obstacle do not overlap
	if ((playerBottom < otherTop) || (playerTop > otherBottom) || (playerRight < otherLeft) || (playerLeft > otherRight)) {
		crash = false;
	}
	return crash;
}

function decreaseInterval() {
	// decreases obstacleInterval until it hit 1
	if (gameArea.frameNum == 1 || everyinterval(500) && obstacleInterval > 10) {
		obstacleInterval -= 5
		console.log(obstacleInterval)
	} else if (everyinterval(500) && obstacleInterval <= 10 && obstacleInterval > 0) {
		obstacleInterval -= 1
		console.log(obstacleInterval)
	}
}

// update cycle order
function updategameArea() {

	gameArea.clear(); // clears canvas
	gameArea.frameNum += 1; // counts frames
	decreaseInterval();

	if (gameArea.frameNum == 1 || everyinterval(100)) { // increases obstalce speed every 100 interval
		obstacleSpeed += -0.1
	}

	// pushes new obstalces from bottom of the canvas
	if (gameArea.frameNum == 1 || everyinterval(obstacleInterval)) {
		var newObstacleWidth = 80;
		var newObstacleHeight = 80;

		// random value between canvas width
		var randX = Math.floor(Math.random() * (gameArea.canvas.width - newObstacleWidth)) + newObstacleWidth - newObstacleWidth;
        var randID = Math.floor(Math.random() * 3);
        const image =(presentID[randID])
		obstacles.push(new component(newObstacleWidth, newObstacleHeight, image, randX, gameArea.canvas.height));
	}

	gameScore.text = (gameArea.frameNum / 10).toFixed(0); // adds 1 point to score
	gameScore.updateText(); // updates score text

	gameName.text = gameTitle;
	gameName.updateText();

	for (i = 0; i < obstacles.length; i += 1) { // updates obstacles to new positons
		obstacles[i].y += obstacleSpeed;
		obstacles[i].update();
	}

	// moves player to given direction while player in the canvas area
	if (rightPressed && playerX < gameArea.canvas.width - playerWidth) {
		playerX += playerSpeed;
	} else if (leftPressed && playerX > 0) {
		playerX -= playerSpeed;
	} else if (downPressed && playerY < gameArea.canvas.height - playerHeight) {
		playerY += playerSpeed;
	} else if (upPressed && playerY > 0) {
		playerY -= playerSpeed;
	}

	drawPlayer(); // updates player postion

	for (i = 0; i < obstacles.length; i += 1) { // puts every obstalce through collison detection
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
