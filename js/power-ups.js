class PowerUp {

    constructor(x, y, shape, color, speed) {
        this.x = x || 0;
        this.y = y || 0;
        this.xDir = 1;
        this.s = 4;
        this.i = 0;
        this.speed = speed != undefined ? speed : 0.020;
        this.frame = 0;
        this.dir = (Math.random() < 0.5 ? -1 : 1);
        this.maxFrame = Math.floor(Math.random() * 32) + 16;
        this.color = color || 'green';
        this.shape = shape || [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.type = Math.floor(Math.random() * 3);
        switch (this.type) {
            case 0:
                //bullet speed
                this.color = "forestgreen";
                break;
            case 1:
                //player speed
                this.color = "cornflowerblue";
                break;
            case 2:
                //increase bullet damage
                this.color = "darkorange";
                break;
        }
        this.isAlive = true;
        this.fit = 0;
        this.powerUpAdded = false;
        this.player = undefined;
        this.powerUp1Sound = new Audio('../Sounds/powerUp1.wav');
        this.powerUp1Sound.volume = 0.2;
        this.powerUp2Sound = new Audio('../Sounds/powerUp2.wav');
        this.powerUp2Sound.volume = 0.2;
    }

    update() {

        if (this.y >= h >> 2 && !this.powerUpAdded) {
            this.isAlive = false;
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

        if (Math.sqrt((playerOne.y - this.y) ** 2 + (playerOne.x - (this.x + 2)) ** 2) < 3.5) {
            this.powerUp1Sound.play();
            this.applyPowerup(playerOne);
            this.isAlive = false;
            return;
        }

        if (Math.sqrt((playerTwo.y - this.y) ** 2 + (playerTwo.x - (this.x + 2)) ** 2) < 2.5) {
            this.powerUp2Sound.play();
            this.applyPowerup(playerTwo);
            this.isAlive = false;
            return;
        }

    }

    show() {
        if (this.isAlive) {
            c.fillStyle = this.color;
            for (let i = 0; i < this.shape.length; i++) {
                if (this.shape[i]) {
                    c.fillRect((this.x + i % 4) * this.s, (this.y + (i >> 2)) * this.s, this.s, this.s);
                }
            }
            this.update();
        }
    }

    applyPowerup(player) {
        switch (this.type) {
            case 0:
                //bullet speed
                player.bulletSpeed += 0.03;
                setTimeout(() => {
                    player.bulletSpeed -= 0.03;
                }, 10000);
                break;
            case 1:
                //player speed
                player.speed += 0.016;
                setTimeout(() => {
                    player.speed -= 0.016;
                }, 10000);
                break;
            case 2:
                //increase bullet damage
                player.instakill = true;
                setTimeout(() => {
                    player.instakill = false;
                }, 10000);
                break;
        }
        this.powerUpAdded = true;
    }
}