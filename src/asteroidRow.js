export default class AsteroidRow {
    constructor(ctx, x, y, speed, direction, count, astPushX, xToAdd) {
        this.ctx = ctx;
        this.image = new Image();
        this.imageSrc = './images/astSmall.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.count = count;
        this.pushX = astPushX;
        this.xToAdd = xToAdd;
        this.distance = 35;
        this.width = 35;
        this.asteroids = [];
    }

    makeAsteroidsArray() {
        let newX = this.x;
        for (let i = 0; i < this.count; i++) {
            this.addAsteroid(newX);

            newX += this.distance;
        }
    }

    draw() {
        // TODO: separate asteroid class?
        this.image.src = this.imageSrc;

        for (let i = 0; i < this.asteroids.length; i++) {
            this.ctx.drawImage(this.image, this.asteroids[i].x, this.y, this.width, this.width);
            this.move(this.asteroids[i]);
        }
    }

    move(asteroid) {
        if (this.direction === 'right') {
            asteroid.x += this.speed;

            if (asteroid.x === 650) {
                this.removeAsteroid(1);
            }
        }

        if (this.direction === 'left') {
            asteroid.x -= this.speed;

            if (asteroid.x === -90) {
                this.removeAsteroid(0);
            }
        }

        if (asteroid.x === this.pushX) {
            this.addAsteroid(this.xToAdd);
        }
    }

    addAsteroid(x) {
        this.asteroids.push({
            x: x,
            y: this.y
        });
    }

    removeAsteroid(index) {
        this.asteroids.slice(index);
    }

    getAsteroids() {
        return this.asteroids;
    }

    getY() {
        return this.y;
    }
}