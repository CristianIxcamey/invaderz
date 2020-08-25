class Invader {

	constructor(x, y, shape, color, speed) {
		this.x = x || 0;
		this.y = y || 0;
		this.xDir = 1;
		this.s = 4;
		this.i = 0;
		this.speed = speed != undefined ? speed : 0.008;
		this.frame = 0;
		this.dir = (Math.random() < 0.5 ? -1 : 1);
		this.maxFrame = Math.floor(Math.random() * 32) + 16;
		this.color = color || 'black';
		this.shape = shape || [0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0];
		this.isAlive = true;
		this.fit = 0;
		this.invadedSound = new Audio('../Sounds/burst.wav');
		this.damageTakenSound = new Audio('../Sounds/explosion.wav');
		this.health = 1;
		if (window.location.href.indexOf('normal') == -1)
		{
			this.health = Math.max((Math.floor(Math.random() * 6) - 2), 1);//This sets the health to be 60% 1 hp, 20% 2, 20% 3.
		}
	}

	update() {
		if (this.y >= h >> 2) {
			lives++;
			this.isAlive = false;
			this.invadedSound.play();
			return;
		}

		if (!this.shape[this.i]) {

			let value = this.dir * this.speed * dt
			if (this.x + value > 0 && (this.x + value) * this.s < w - this.s * this.s) {
				this.x += value;
			}

		}

		this.y += this.speed * dt;

		if (this.frame == this.maxFrame) {
			this.dir = -this.dir;
			this.frame = 0;
			this.maxFrame = Math.floor(Math.random() * 32) + 16;
			this.i = ++this.i % this.shape.length;
		}

		this.frame++;
		this.fit = Math.round(this.y);

		if (Math.sqrt((playerOne.bullet.y - this.y) ** 2 + (playerOne.bullet.x - (this.x + 2)) ** 2) < 2.5) {
			let x = playerOne.bullet.x;
			let y = playerOne.bullet.y;
			let area = c.getImageData((x * this.s), y * this.s, playerOne.bullet.s + 1, playerOne.bullet.s);
			for (let i = 0; i < area.data.length; i++) {
				if (area.data[i]) {
					this.damageTakenSound.play();
					this.health--;
					if (this.health <= 0)
					{
						this.isAlive = false;
					}
					playerOne.bullet = {};
					playerOne.isShooting = false;
					break;
				}
			}
		}
		if (Math.sqrt((playerTwo.bullet.y - this.y) ** 2 + (playerTwo.bullet.x - (this.x + 2)) ** 2) < 2.5) {
			let x = playerTwo.bullet.x;
			let y = playerTwo.bullet.y;
			let area = c.getImageData((x * this.s), y * this.s, playerTwo.bullet.s + 1, playerTwo.bullet.s);
			for (let i = 0; i < area.data.length; i++) {
				if (area.data[i]) {
					this.damageTakenSound.play();
					this.health--;
					if (this.health <= 0)
					{
						this.isAlive = false;
					}
					playerTwo.bullet = {};
					playerTwo.isShooting = false;
					break;
				}
			}
		}

	}

	show() {
		if (this.isAlive) {
			switch (this.health)
			{
				case 1:
					this.color = 'black';
					break;
				case 2:
					this.color = 'blue';
					break;
				case 3:
					this.color = 'red';
					break;
			}
			c.fillStyle = this.color;
			for (let i = 0; i < this.shape.length; i++) {
				if (this.shape[i]) {
					c.fillRect((this.x + i % 4) * this.s, (this.y + (i >> 2)) * this.s, this.s, this.s);
				}
			}
			this.update();
		}
	}

}
