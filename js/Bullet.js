class Bullet {
	constructor(x, y, color, speed) {
		this.x = x || 0;
		this.y = y || 0;
		this.color = color || 'black';
		this.s = 3;
		this.speed = speed || 0.1;
		this.isAlive = true;
		if (this.color == "blue") {
			this.player = playerOne;
		}
		else {
			this.player = playerTwo;
		}
	}
	
	update() {
		if (this.isAlive) {
			this.y -= this.speed * dt;
			if (this.y < 0) {
				this.die();
			}
		}
		
	}
	
	show() {
		if (this.isAlive) {
			c.fillStyle = this.color;
			c.fillRect(this.x * 4, this.y * 4, this.s, this.s);
			this.update();
		}
	}
	
	die() {
		this.isAlive = false;
		this.player.bullets--;
	}
}