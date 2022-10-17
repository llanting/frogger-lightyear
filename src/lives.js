export default class Lives {
    constructor(startAmount) {
        this.lives = startAmount;
    }

    addLife() {
        this.lives += 1;
    }

    removeLife() {
        this.lives -= 1;
        this.removeLifeIcon();
    }

    isZero() {
        return this.lives === 0;
    }

    getScore() {
        return this.lives;
    }

    removeLifeIcon = () => {
        if (document.querySelector('.lives')) {
            document.querySelector('.lives').parentNode.removeChild(document.querySelector('.lives'));
        }
    }
}