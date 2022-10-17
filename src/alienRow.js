import generalRow from "./generalRow.js";

export default class AlienRow extends generalRow {
    constructor(ctx, x, y, speed, direction, astPushX, xToAdd) {
        super(ctx, './images/alien.png', x, y, speed, direction, astPushX, xToAdd);
        this.width = 35;
    }

    makeItemsArray() {
        this.addItem(this.x);
    }

    cutAlienRow(index, amount) {
        this.items.splice(index, amount);
    }
}
