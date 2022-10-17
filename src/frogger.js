import { playMusic } from "../utils/music/music.js";

export default class Frogger {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = new Image();
        this.imageSrc = './images/frogger.png';
        this.frogWidth = 40;
        this.frogX = canvas.width / 2 - 20;
        this.frogY = 610;
        this.isRightArrow = false;
        this.isLeftArrow = false;
        this.isUpArrow = false;
        this.isDownArrow = false;
        this.hopMusic = new Audio('./music/hop.wav');
        this.hopDistance = 50;
        this.hopVerticalDistance = 55;
    }

    draw = () => {
        this.image.src = this.imageSrc;
        this.ctx.drawImage(this.image, this.frogX, this.frogY, this.frogWidth, this.frogWidth);
    }

    listenToKeys = () => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.isRightArrow = true;
            }

            if (event.key === 'ArrowLeft') {
                this.isLeftArrow = true;
            }

            if (event.key === 'ArrowUp') {
                this.isUpArrow = true;
            }

            if (event.key === 'ArrowDown') {
                this.isDownArrow = true;
            }

            this.moveFrogger(event.key);
        })

        document.addEventListener('keyup', () => {
            this.isUpArrow = false;
            this.isLeftArrow = false;
            this.isRightArrow = false;
            this.isDownArrow = false;
        })
    }

    moveFrogger = (direction) => {
        let { frogX, frogY, frogWidth, canvas, hopDistance, hopVerticalDistance } = this;

        if (direction === 'ArrowRight' && frogX < canvas.width - frogWidth) {
            this.setX(frogX + hopDistance);
            this.imageSrc = './images/froggerRight.png';
        }
        if (direction === 'ArrowLeft' && frogX > 0) {
            this.setX(frogX - hopDistance);
            this.imageSrc = './images/froggerLeft.png';
        }
        if (direction === 'ArrowUp' && frogY + frogWidth > 0) {
            this.setY(frogY - hopVerticalDistance);
            this.imageSrc = './images/frogger.png';
        }
        if (direction === 'ArrowDown' && frogY + frogWidth < 650) {
            this.setY(frogY + hopVerticalDistance);
            this.imageSrc = './images/froggerDown.png';
        }

        playMusic(this.hopMusic);
    }

    hasFroggerWon() {
        return this.frogY < 15 && this.frogX > 100 & this.frogX < 400;
    }

    getFroggerX() {
        return this.frogX;
    }

    getFroggerY() {
        return this.frogY;
    }

    getFroggerWidth() {
        return this.frogWidth;
    }

    setX(newX) {
        this.frogX = newX;
    }

    setY(newY) {
        this.frogY = newY;
    }
}