export default class BlackHole {
    constructor(canvas, imageSrc, x, y) {
       this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = new Image();
        this.imageSrc = imageSrc;
        this.x = x;
        this.y = y;
        this.radius = 50;
    }

    draw = () => {
        this.image.src = this.imageSrc;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const blackHolepattern = this.ctx.createPattern(this.image, "repeat");

        this.ctx.fillStyle = blackHolepattern;

        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
