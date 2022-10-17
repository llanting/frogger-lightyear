export default class generalRow {
    constructor(ctx, imageSrc, x, y, speed, direction, astPushX, xToAdd) {
        this.ctx = ctx;
        this.image = new Image();
        this.imageSrc = imageSrc;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.pushX = astPushX;
        this.xToAdd = xToAdd;
        this.items = [];
        this.width = 35;
    }

    draw() {
        this.image.src = this.imageSrc;

        for (let i = 0; i < this.items.length; i++) {
            this.ctx.drawImage(this.image, this.items[i].x, this.y, this.width, this.width);
            this.move(this.items[i]);
        }
    }

    move(item) {
        if (this.direction === 'right') {
            item.x += this.speed;

            if (item.x === 650) {
                this.removeItem(1);
            }
        }

        if (this.direction === 'left') {
            item.x -= this.speed;

            if (item.x === -90) {
                this.removeItem(0);
            }
        }

        if (item.x === this.pushX) {
            this.addItem(this.xToAdd);
        }
    }

    addItem(x) {
        this.items.push({
            x: x,
            y: this.y
        });
    }

    removeItem(index) {
        this.items.slice(index);
    }

    getItems() {
        return this.items;
    }

    getY() {
        return this.y;
    }
}
