import generalRow from "./generalRow.js";

export default class AsteroidRow extends generalRow {
    constructor(ctx, x, y, speed, direction, count, astPushX, xToAdd) {
        super(ctx, './images/astSmall.png', x, y, speed, direction, astPushX, xToAdd);
        this.count = count;
        this.distance = 35;
    }

    makeItemsArray() {
        let newX = this.x;
        for (let i = 0; i < this.count; i++) {
            this.addItem(newX);

            newX += this.distance;
        }
    }
}
