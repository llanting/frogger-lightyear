import { removeGameScreen, createFinalScreen, playWinSound, playBGMusic } from './main.js';
import Score from './score.js';
import Lives from './lives.js';
import AlienRow from './alienRow.js';
import AsteroidRow from './asteroidRow.js';
import Planet from './planet.js';
import BlackHole from './blackHole.js';
import Frogger from './frogger.js';
import { playMusic } from '../utils/music/music.js';

export default class Game {
    constructor(playerName) {
        this.canvas = null;
        this.ctx = null;
        this.intervalId = 0;
        this.intervalIdTwo = 0;
        this.row9 = 610;
        this.row8 = 555;
        this.row7= 500;
        this.row6 = 445;
        this.row5 = 390;
        this.row4 = 225;
        this.row3 = 170;
        this.row2 = 115;
        this.row1 = 60;
        this.halfWidth = 0;
        this.halfHeight = 0;
        this.player = playerName;
        this.lives = null;
        this.score = null;
        this.bluePlanet = null;
        this.yellowPlanet = null;
        this.blackHole = null;
        this.frogger = null;
        this.asteroids = [];
        this.aliens = [];
    }

    drawCanvas = () => {
        this.canvas = document.getElementById('game-canvas');
        this.halfWidth = this.canvas.width / 2;
        this.halfHeight = this.canvas.height / 2;
        this.canvas.style.border = '5px solid lightblue';
        this.ctx = this.canvas.getContext('2d');

        this.score = new Score(1500);
        this.lives = new Lives(3);

        this.bluePlanet = new Planet(this.ctx, './images/bluePlanet.png', 40, this.halfHeight - 45, 90);
        this.yellowPlanet = new Planet(this.ctx, './images/yellowPlanet.png', 360, this.halfHeight - 45, 90);
        this.blackHole = new BlackHole(this.canvas, './images/blackHole.png', this.halfWidth, this.halfHeight);
        this.frogger = new Frogger(this.canvas);

        this.asteroids.push(new AsteroidRow(this.ctx, -30, this.row1, 3, 'right', 1, 201, -30));
        this.asteroids.push(new AsteroidRow(this.ctx, 500, this.row2, 1, 'left', 3, 150, 500));
        this.asteroids.push(new AsteroidRow(this.ctx, 500, this.row3, 2, 'left', 1, 300, 500));
        this.asteroids.push(new AsteroidRow(this.ctx, -40, this.row4, 1, 'right', 2, 151, -35));
        this.asteroids.push(new AsteroidRow(this.ctx, 250, this.row5, 2, 'right', 1, 260, -30));
        this.asteroids.push(new AsteroidRow(this.ctx, 330, this.row6, 2, 'left', 2, 200, 500));
        this.asteroids.push(new AsteroidRow(this.ctx, 120, this.row7, 2, 'right', 1, 130, -30));
        this.asteroids.push(new AsteroidRow(this.ctx, 330, this.row8, 1, 'right', 2, 300, 500));

        this.asteroids.forEach((asteroidRow) => {
            asteroidRow.makeItemsArray();
        });

        this.aliens.push(new AlienRow(this.ctx, 400, this.row2, 1, 'left', 150, 500));
        this.aliens.push(new AlienRow(this.ctx, -100, this.row7, 2, 'right', 130, -30));

        this.aliens.forEach((alienRow) => {
            alienRow.makeItemsArray();
        });

        this.frogger.listenToKeys();

        this.startLoop(this.updateCanvas);
        this.startScoreLoop(this.updateScore);

        playBGMusic();
    }

    startLoop = (callBack) => {
        this.intervalId = setInterval(() => {
            callBack();
        }, 20);
    }

    startScoreLoop = (callBack) => {
        this.intervalIdTwo = setInterval(() => {
            callBack();
        }, 1000);
    }

    updateScore = () => {
        this.score.removeScore(10);
        this.score.showScoreDuringPlay();
    }

    updateCanvas = () => {
        // The order of these items does matter!
        this.drawBackgrounds();
        this.drawPlanets();
        this.drawAsteroids();
        this.drawAliens();
        this.blackHole.draw();
        this.frogger.draw();

        if (this.lives.isZero() || this.checkBlackHoleCollision() || this.score.isZero()) {
            this.gameOver();
            return;
        }

        if (this.frogger.hasFroggerWon()) {
            this.gameWon();
            return;
        }
    }

    drawBackgrounds = () => {
        let bgImg = new Image();
        bgImg.src = './images/kai-pilger-Ef6iL87-vOA-unsplash.jpg';
        this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);

        let baseImg = new Image();
        baseImg.src = './images/startBase.png';
        this.ctx.drawImage(baseImg, this.halfWidth - 100, 590, 200, 100);

        let homeImg = new Image();
        homeImg.src = './images/home.png';
        this.ctx.drawImage(homeImg, -25, -40, 550, 100);
    }

    drawPlanets = () => {
        this.bluePlanet.draw();
        this.yellowPlanet.draw();
    }

    drawAsteroids = () => {
        this.asteroids.forEach((asteroid) => {
            asteroid.draw();
            this.checkAsteroidCollision(asteroid);
        });
    }

    drawAliens = () => {
        this.aliens.forEach((alien) => {
            alien.draw();
            this.checkAlienCollision(alien);
        })
    }

    checkAsteroidCollision(asteroidRow) {
        // TODO: we can also do this without getters. What is best practice?
        // TODO: we can do the check for asteroids and aliens in 1 function? Only have to give the width (35/30)
        const asteroids = asteroidRow.getItems();
        const asteroidsY = asteroidRow.getY();
        const froggerX = this.frogger.getFroggerX();
        const froggerY = this.frogger.getFroggerY();
        const froggerWidth = this.frogger.getFroggerWidth();

        for (let i = 0; i < asteroids.length; i++) {

            const isFroggerOnAsteroid = ((froggerX + froggerWidth > asteroids[i].x && froggerX < asteroids[i].x + 35) && (froggerY < asteroidsY + 35 && froggerY + froggerWidth > asteroidsY)) ? true : false;
            if (isFroggerOnAsteroid) {
                this.lives.removeLife();

                // TODO: refactor?
                // If frogger is below half of the playing field, place down again
                if (froggerY > 360) {
                    this.frogger.setX(this.halfWidth - froggerWidth / 2);
                    this.frogger.setY(this.row9);

                // Else place on planets, depending on which side of the field you are on
                } else {
                    if (froggerX < this.canvas.width / 2) {
                        this.frogger.setX(65);
                        this.frogger.setY(this.halfHeight - froggerWidth);
                    } else {
                        this.frogger.setX(385);
                        this.frogger.setY(this.halfHeight - froggerWidth);
                    }
                }
            }
        }
    }

    checkAlienCollision(alienRow) {
        const aliens = alienRow.getItems();
        const alienY = alienRow.getY();
        const froggerX = this.frogger.getFroggerX();
        const froggerY = this.frogger.getFroggerY();
        const froggerWidth = this.frogger.getFroggerWidth();

        for (let i = 0; i < aliens.length; i++) {
            if ((froggerX + froggerWidth > aliens[i].x && froggerX < aliens[i].x + 30) && (froggerY < alienY + 30 && froggerY + froggerWidth > alienY)) {
                this.score.addScore(200);
                alienRow.cutAlienRow(i, 1);

                const chew = new Audio('./music/eat.wav');
                playMusic(chew);
            }

        }
    }

    checkBlackHoleCollision() {
        // Check closest edge and save in variable
        let blackHoleX = this.blackHole.x;
        let blackHoleY = this.blackHole.y;
        let froggerX = this.frogger.getFroggerX();
        let froggerY = this.frogger.getFroggerY();
        let froggerWidth = this.frogger.getFroggerWidth();
        let closestX = this.blackHole.x;
        let closestY = this.blackHole.y;

        if (blackHoleX < froggerX) {
            closestX = froggerX;
        } else if (blackHoleX > froggerX + froggerWidth) {
            closestX = froggerX + froggerWidth;
        }

        if (blackHoleY < froggerY) {
            closestY = froggerY;
        } else if (blackHoleY > froggerY + froggerWidth) {
            closestY = froggerY + froggerWidth;
        }

        // //Check distance
        const distX = blackHoleX - closestX;
        const distY = blackHoleY - closestY;
        const calcDistance = (distX * distX) + (distY * distY);
        const distance = Math.sqrt(calcDistance);

        // If distance is smaller than radius, collision is true
        return distance <= this.blackHole.radius;
    }

    gameWon = () => {
        this.score.addScore(this.lives * 200 + 1000);

        playWinSound();

        this.gameEnd('win');
    }

    gameOver = () => {
        const squash = new Audio('./music/sound-frogger-squash.wav');
        playMusic(squash);

        this.gameEnd('lose');
    }

    gameEnd = (result) => {
        clearInterval(this.intervalId);
        clearInterval(this.intervalIdTwo);

        removeGameScreen();

        createFinalScreen(result);

        this.score.getHighScore(this.playerName);

        this.score.setFinalScore();
    }
}
