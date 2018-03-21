var myGameArea;
var myGamePiece;
var myObstacles = [];
var myscore;

var img = new Image();
img.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

var img0 = new Image();
img0.src = 'http://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2017/02/27/0/0/694940094001_5339799205001_5339792147001-vs.jpg';

$(document).keydown(function(e) {
	switch (e.key) {
	case 'ArrowLeft':
		moveleft();
		break;

	case 'ArrowUp':
		moveup();
		break;

	case 'ArrowRight':
		moveright();
		break;

	case 'ArrowDown':
		movedown();
		break;

	case 'Enter':
	case ' ': // space-character
		restartGame();
		break;

	default:
		return;
	}
	e.preventDefault();
});

$(document).keyup(function(e) {
	clearmove();
});

function restartGame() {
	document.getElementById("myfilter").style.display = "none";
	document.getElementById("myrestartbutton").style.display = "none";
	myGameArea.stop();
	myGameArea.clear();
	myGameArea = {};
	myGamePiece = {};
	myObstacles = [];
	myscore = {};
	document.getElementById("canvascontainer").innerHTML = "";
	startGame()
}

function startGame() {
	myGameArea = new gamearea();
	myGamePiece = new component(30, 30, "#e74c3c", 10, 75, "box");
	myscore = new component("14px", "Consolas", "#2c3e50", 220, 25, "text");
	myGameArea.start();
}

function gamearea() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = 320;
	this.canvas.height = 180;
	// document.getElementById("canvascontainer").appendChild(this.canvas);
	$('#canvascontainer').append(this.canvas);
	this.context = this.canvas.getContext("2d");
	this.pause = false;
	this.frameNo = 0;
	this.start = function() {
		this.interval = setInterval(updateGameArea, 20);
	}
	this.stop = function() {
		clearInterval(this.interval);
		this.pause = true;
	}
	this.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type) {

	this.type = type;
	if (type == "text") {
		this.text = color;
	}
	this.score = 0;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else if (this.type == "box") {
			// ctx.fillStyle = color;
			// ctx.fillRect(this.x, this.y, this.width, this.height);
			if (this.x == this.xold) {
				ctx.drawImage(img, this.x, this.y, this.width, this.height);
			} else {
				ctx.drawImage(img0, this.x, this.y, this.width, this.height);
			}
			this.xold = this.x;
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom)
				|| (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
	this.leftcanvas = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom)
				|| (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}

function updateGameArea() {
	var x, y, min, max, height, gap;
	for (i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece.crashWith(myObstacles[i])) {
			myGameArea.stop();
			document.getElementById("myfilter").style.display = "block";
			document.getElementById("myrestartbutton").style.display = "block";
			return;
		}
	}
	if (myGameArea.pause == false) {
		myGameArea.clear();
		myGameArea.frameNo += 1;
		myscore.score += 1;
		if (myGameArea.frameNo == 1 || everyinterval(150)) {
			x = myGameArea.canvas.width;
			y = myGameArea.canvas.height - 100;
			min = 20;
			max = 100;
			height = Math.floor(Math.random() * (max - min + 1) + min);
			min = 50;
			max = 100;
			gap = Math.floor(Math.random() * (max - min + 1) + min);
			myObstacles.push(new component(10, height, "#d35400", x, 0));
			myObstacles.push(new component(10, x - height - gap, "#d35400", x,
					height + gap));
		}
		for (i = 0; i < myObstacles.length; i += 1) {
			myObstacles[i].x += -1;
			myObstacles[i].update();
		}
		myscore.text = "SCORE: " + myscore.score;
		myscore.update();
		if(myGamePiece.y > myGameArea.canvas.height) {
			myGamePiece.y = 0;
		} else if (myGamePiece.y < 0) {
			myGamePiece.y = myGameArea.canvas.height;
		}
		if(myGamePiece.x > myGameArea.canvas.width) {
			myGamePiece.x = 0;
		} else if (myGamePiece.x < 0) {
			myGamePiece.x = myGameArea.canvas.width;
		}		
		myGamePiece.x += myGamePiece.speedX;
		myGamePiece.y += myGamePiece.speedY;
		myGamePiece.update();
	}
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function moveup(e) {
	myGamePiece.speedY = -1;
}

function movedown() {
	myGamePiece.speedY = 1;
}

function moveleft() {
	myGamePiece.speedX = -1;
}

function moveright() {
	myGamePiece.speedX = 1;
}

function clearmove(e) {
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}
startGame();
