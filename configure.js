var detect = new MobileDetect(window.navigator.userAgent);

function config() {
	//console.log(detect.isPhoneSized())
	if (detect.isPhoneSized()) {
		console.log("Mobile");
		canvasWidth = window.outerWidth;
		canvasHeight = window.outerHeight;
		obstacleInterval = 70;

	} else if (detect.tablet()) {
		console.log("Tablet");
		canvasWidth = window.outerWidth;
		canvasHeight = window.outerHeight;
		obstacleInterval = 60;

	} else {
		console.log("Computer?")
		canvasWidth = window.outerWidth;
		canvasHeight = window.outerHeight - 70;
		obstacleInterval = 50;
	}
	return canvasHeight, canvasWidth, obstacleInterval
}
