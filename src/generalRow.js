export default class generalRow {
    constructor(ctx, x, y, speed, direction, astPushX, xToAdd) {
        this.ctx = ctx;
        this.image = new Image();
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
        this.pushX = astPushX;
        this.xToAdd = xToAdd;
        this.items = [];
        this.width = 35;
    }
}
