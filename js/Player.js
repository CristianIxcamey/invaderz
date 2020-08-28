class Player {

	constructor(x, y, shape, color) {
		this.x = x || 0;
		this.y = y || 0;
		this.xDir = 1;
		this.s = 4;
		this.color = color || 'black';
		this.shape = shape || [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1];
		this.speed = 0.05;
		this.isMovingLeft = false;
		this.isMovingRight = false;
		this.bulletSpeed = 0.1;
		this.shootSound = new Audio('../Sounds/laser1.wav');
		this.shootSound.volume = 0.2;
		this.instakill = false;
		this.maxbullets = 1;
		this.bullets = 0;
	}

	shoot() {
		if (this.bullets < this.maxbullets) {
			invaders.bulletPopulation.push(new Bullet(this.x, this.y, this.color, this.bulletSpeed));
			this.bullets++;
			this.shootSound.play();
		}
	}

	update() {
		if (this.x > 0 && this.isMovingLeft) {
			this.x -= this.speed * dt;
		}
		if (this.x < w / 4 - this.s && this.isMovingRight) {
			this.x += this.speed * dt;
		}
	}

	show() {
		c.fillStyle = this.color;
		for (let i = 0; i < this.shape.length; i++) {
			if (this.shape[i]) {
				c.fillRect((this.x + i % 4) * this.s, (this.y + (i >> 2)) * this.s, this.s, this.s);
			}
		}
		this.update();
	}

}
