export default class Planet {
    constructor(ctx, imageSrc, x, y, radius) {
        this.ctx = ctx;
        this.image = new Image();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.imageSrc = imageSrc;
    }

    draw = () => {
        this.image.src = this.imageSrc;
        this.ctx.drawImage(this.image, this.x, this.y, this.radius, this.radius);
    }
}
