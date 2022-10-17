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
        const LIVES = document.querySelector('.lives');

        if (LIVES) {
            LIVES.parentNode.removeChild(LIVES);
        }
    }
}