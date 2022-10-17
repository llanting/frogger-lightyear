export default class AlienRow {
    constructor(ctx, x, y, speed, direction, astPushX, xToAdd) {
        this.ctx = ctx;
        this.image = new Image();
        this.imageSrc = './images/alien.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.pushX = astPushX;
        this.xToAdd = xToAdd;
        this.width = 35;
        this.aliens = [];
    }

    makeAliensArray() {
        this.addAlien(this.x);
    }

    draw() {
        // TODO: separate alien class?
        this.image.src = this.imageSrc;

        for (let i = 0; i < this.aliens.length; i++) {
            this.ctx.drawImage(this.image, this.aliens[i].x, this.y, this.width, this.width);
            this.move(this.aliens[i]);
        }
    }

    move(alien) {
        if (this.direction === 'right') {
            alien.x += this.speed;

            if (alien.x === 630) {
                this.removeAlien(1);
            }
        }

        if (this.direction === 'left') {
            alien.x -= this.speed;

            if (alien.x === -90) {
                this.removeAlien(0);
            }
        }

        if (alien.x === this.pushX) {
            this.addAlien(this.xToAdd);
        }
    }

    addAlien(x) {
        this.aliens.push({
            x: x,
            y: this.y
        });
    }

    removeAlien(index) {
        this.aliens.slice(index);
    }

    cutAlienRow(index, amount) {
        this.aliens.splice(index, amount);
    }

    getAliens() {
        return this.aliens;
    }

    getY() {
        return this.y;
    }
}