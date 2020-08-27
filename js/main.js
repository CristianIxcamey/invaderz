class MainGame {
	constructor(gameMode) {
		this.gameMode = gameMode;
		addEvents();
		init();
	}
	destroy = () => {
		destroyGame();
	}


}

let canvas,
	c,
	invaders,
	w,
	h,
	dt,
	playerOne,
	playerTwo,
	lives,
	lastUpdate,
	leftBtn,
	rightBtn,
	fireBtn,
	div,
	gameMode,
	multiplayer,
	generation;

const newWaveSound = new Audio('../Sounds/newWave.wav');
newWaveSound.volume = 0.2;
const gameOverSound = new Audio('../Sounds/GameOver.wav');
gameOverSound.volume = 0.2;

canvas = document.createElement('canvas');
canvas.width = w = 240;
canvas.height = h = 480;
c = canvas.getContext('2d', {
	alpha: false
});
if (window.devicePixelRatio > 1) {
	c.canvas.width = c.canvas.width * window.devicePixelRatio;
	c.canvas.height = c.canvas.height * window.devicePixelRatio;
	c.canvas.style.width = w + 'px';
	c.canvas.style.height = h + 'px';
	c.scale(window.devicePixelRatio, window.devicePixelRatio);
}
leftBtn = document.createElement('button');
leftBtn.innerText = "<";
rightBtn = document.createElement('button');
rightBtn.innerText = ">";
fireBtn = document.createElement('button');
fireBtn.innerText = "*";
div = document.createElement('div');
div.appendChild(leftBtn);
div.appendChild(fireBtn)
div.appendChild(rightBtn);

function init() {
	if (window.location.href.indexOf("normal") == -1) {
		gameMode = "new"
	}
	multiplayer = false;
	lives = 0;
	generation = 1;
	dt = 0;
	lastUpdate = Date.now();
	canvas.style.border = "solid";
	let gameArea = document.getElementById("gameSection");
	gameArea.appendChild(canvas);
	gameArea.appendChild(div);
	invaders = new Genetics();
	invaders.createPopulation();
	playerOne = new Player(w / 4 / 2, h / 4 - 4, null, "blue");
	playerTwo = new Player(w / 4 / 2, h / 4 - 4, null, "orange");
	update();
}

function deltaTime() {
	let now = Date.now();
	dt = now - lastUpdate;
	lastUpdate = now;
}

function getBestOfGeneration() {
	let index = 0,
		best = 0;
	for (let i = 0; i < invaders.population.length; i++) {
		if (invaders.population[i].fit > best) {
			best = invaders.population[i].fit;
			index = i;
		}
	}
	if (!invaders.bestOfGeneration || invaders.population[index].fit > invaders.bestOfGeneration.fit) {
		invaders.bestOfGeneration = invaders.population[index];
	}
}

function gameOver() {
	gameOverSound.play();
	c.fillStyle = "white";
	c.fillRect(0, 0, w, h);
	c.fillStyle = "black";
	c.font = "10px Arial";
	c.fillText("Generation: " + generation, 5, 10);
	c.fillText("Invaders: " + lives, 5, 20);
	let txt = "Game Over!";
	c.font = "30px Arial";
	c.fillText(txt, (w - c.measureText(txt).width) / 2, h / 2);
}

function update() {
	c.fillStyle = "white";
	c.fillRect(0, 0, w, h);
	c.fillStyle = "black";
	c.font = "10px Arial";
	c.fillText("Generation: " + generation, 5, 10);
	c.fillText("Invaders: " + lives, 5, 20);
	for (let i = 0; i < invaders.population.length; i++) {
		invaders.population[i].show();
	}
	playerOne.show();
	if (multiplayer) {
		playerTwo.show();
	}
	// Iterates through all the power-ups inside the invaders power-ups collection
	invaders.powerUpPopulation.forEach(powerUp => {
		// shows the power-up
		powerUp.show();
	});
	let allDead = true;
	for (let i = 0; i < invaders.population.length; i++) {
		if (invaders.population[i].isAlive) {
			allDead = false;
			break;
		}
	}
	if (allDead) {
		getBestOfGeneration();
		if (generation % 7) {
			invaders.evolve();
		} else {
			invaders.elitism();
		}
		generation++;
		newWaveSound.play();
	}
	if (lives > 4) {
		gameOver();
		return;
	}
	deltaTime();
	requestAnimationFrame(update);
}

function addEvents() {
	document.addEventListener("keydown", function (e) {
		switch (e.keyCode) {
			case 13:
				init();
				break;
			case 38:
				playerOne.shoot();
				break;
			case 37:
				playerOne.isMovingLeft = true;
				break;
			case 39:
				playerOne.isMovingRight = true;
				break;
			case 87:
				if (!multiplayer && gameMode == "new") {
					multiplayer = true;
				}
				playerTwo.shoot();
				break;
			case 65:
				if (!multiplayer && gameMode == "new") {
					multiplayer = true;
				}
				playerTwo.isMovingLeft = true;
				break;
			case 68:
				if (!multiplayer && gameMode == "new") {
					multiplayer = true;
				}
				playerTwo.isMovingRight = true;
				break;
		}
	});

	document.addEventListener("keyup", function (e) {
		switch (e.keyCode) {
			case 37:
				playerOne.isMovingLeft = false;
				break;
			case 39:
				playerOne.isMovingRight = false;
				break;
			case 65:
				playerTwo.isMovingLeft = false;
				break;
			case 68:
				playerTwo.isMovingRight = false;
				break;
		}
	});

	window.addEventListener("focus", function () {
		lastUpdate = Date.now();
	});

	fireBtn.addEventListener('touchstart', function () {
		if (lives > 4) {
			init();
		} else {
			playerOne.shoot();
		}
	});

	fireBtn.addEventListener('mousedown', function () {
		if (lives > 4) {
			init();
		} else {
			playerOne.shoot();
		}
	});

	leftBtn.addEventListener('touchstart', function () {
		playerOne.isMovingLeft = true;
	});

	leftBtn.addEventListener('touchend', function () {
		playerOne.isMovingLeft = false;
	});

	leftBtn.addEventListener('mousedown', function () {
		playerOne.isMovingLeft = true;
	});

	leftBtn.addEventListener('mouseup', function () {
		playerOne.isMovingLeft = false;
	});

	rightBtn.addEventListener('touchstart', function () {
		playerOne.isMovingRight = true;
	});

	rightBtn.addEventListener('touchend', function () {
		playerOne.isMovingRight = false;
	});

	rightBtn.addEventListener('mousedown', function () {
		playerOne.isMovingRight = true;
	});

	rightBtn.addEventListener('mouseup', function () {
		playerOne.isMovingRight = false;
	});

	window.addEventListener('load', function (e) {

		window.applicationCache.addEventListener('updateready', function (e) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				window.applicationCache.swapCache();
				window.location.reload();
			}
		}, false);

	}, false);


	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('../sw.js')
			.then(function () { });
	}

	let deferredPrompt;
	const addBtn = document.createElement('button');

	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt = e;
		addBtn.addEventListener('click', (e) => {
			addBtn.style.display = 'none';
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				deferredPrompt = null;
			});
		});
	});

}

let destroyGame = () => {
	document.body.removeChild(canvas);
	document.body.removeChild(div);
}