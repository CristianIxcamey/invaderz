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
        this.type = "powerUp";
        this.isAlive = true;
        this.fit = 0;
        this.powerUpAdded = false;
    }

    update() {
        if (this.y >= h >> 2 && !this.powerUpAdded) {
            // Sets the speed of the bullet to equal .03 more
            playerOne.bulletSpeed += 0.03;
            playerTwo.bulletSpeed += 0.03;
            //Onces the power-up has been added, it sets boolean so that it isn't added again.
            this.powerUpAdded = true;
            // Creates a timeout to reset the bullet speed after the duration of the power-up
            setTimeout(() => {
                playerOne.bulletSpeed -= 0.03;
                playerTwo.bulletSpeed -= 0.03;
            }, 10000);
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
}