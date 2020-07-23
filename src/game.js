function start() {
    // Draw canvas
    let canvas = document.querySelector('#game-canvas');
    canvas.style.border = '5px solid lightblue';

    let ctx = canvas.getContext('2d');
    
    let intervalId = 0;
    let intervalIdTwo = 0;

    // Load images
    let bgImg = new Image();
    bgImg.src = './images/kai-pilger-Ef6iL87-vOA-unsplash.jpg'

    let baseImg = new Image();
    baseImg.src = './images/startBase.png';

    let homeImg = new Image();
    homeImg.src = './images/home.png';

    let frogger = new Image();
    frogger.src = './images/frogger.png';

    let bluePlanet = new Image();
    bluePlanet.src = './images/bluePlanet.png';

    let yellowPlanet = new Image();
    yellowPlanet.src = './images/yellowPlanet.png';

    //Game rows
    let row9 = 610;
    let row8 = 555;
    let row7= 500;
    let row6 = 445;
    let row5 = 390;
    let row4 = 225;
    let row3 = 170;
    let row2 = 115;
    let row1 = 60;

    // Asteroids
    let astImg = new Image();
    astImg.src = './images/astSmall.png';
   
    // Asteroids rows
    let ast1 = [{x:-30, y: row1}];
    let ast2 = [{x:500, y: row2}, {x:535, y: row2}, {x:570, y: row2}];
    let ast3 = [{x:500, y: row3}];
    let ast4 = [{x:-40, y: row4}, {x:-5, y: row4}];
    let ast5 = [{x:250, y: row5}];
    let ast6 = [{x:330, y: row6}, {x:364, y: row6}];
    let ast7 = [{x:120, y: row7}];
    let ast8 = [{x:330, y: row8}, {x:365, y: row8}];

    //Aliens
    let alienImg = new Image();
    alienImg.src = './images/alien.png';

    let alien2 = [{x:400, y: row2}]
    let alien7 = [{x:-100, y: row7}];

    // Variables imgs
    let frogWidth = 40;
    let halfWidth = canvas.width/2; 
    let frogX = halfWidth - frogWidth/2;
    let frogY = row9;
    let bHX = halfWidth;
    let bHY = canvas.height/2;
    let blackHoleR = 50;

    //Variables score and lives
    let player = playerName;
    let lives = 3;
    let score = 1500;
    let highscores;

    //Variables keys
    let isRightArrow = false;
    let isLeftArrow = false;
    let isUpArrow = false;
    let isDownArrow = false;

    // Music
    let hopMusic = new Audio('./music/hop.wav');
    let squashMusic = new Audio('./music/sound-frogger-squash.wav');
    let chew = new Audio('./music/eat.wav');
    

    function playHop() {
        hopMusic.volume = 0.1;
        hopMusic.play();
    }

    // Press arrowkey eventListener
    document.addEventListener('keydown', (event) => {
        if (event.repeat) {
            event.preventDefault();
        }
        if (event.key === 'ArrowRight') {
            isRightArrow = true;
            moveFrogger();
            playHop();
        } else if (event.key === 'ArrowLeft') {
            isLeftArrow = true;
            moveFrogger();
            playHop();
        } else if (event.key === 'ArrowUp') {
            isUpArrow = true;
            moveFrogger();
            playHop();
        } else if (event.key === 'ArrowDown') {
            isDownArrow = true;
            moveFrogger();
            playHop();
        }
    })
            
    // Release arrowkey eventListener
    document.addEventListener('keyup', () => {
        isUpArrow = false;
        isLeftArrow = false;
        isRightArrow = false;
        isDownArrow = false;
    })

    function moveFrogger() {
        if (isRightArrow && frogX < canvas.width - frogWidth) {
            frogX += 50;
            frogger.src = './images/froggerRight.png';
        } else if (isLeftArrow && frogX > 0) {
            frogX -= 50;
            frogger.src = './images/froggerLeft.png';
        } else if (isUpArrow && frogY + frogWidth > 0) {
            frogger.src = './images/frogger.png';
            frogY -= 55;
        } else if (isDownArrow && frogY + frogWidth < 650) {
            frogY += 55;
            frogger.src = './images/froggerDown.png';
        }
    }

    //Draw black hole
    function drawBlackHole(){
        ctx.beginPath();
        ctx.arc(bHX, bHY, blackHoleR, 0, Math.PI*2);
        let blackHole = new Image();
        blackHole.src = './images/blackHole.png';
        let blackHolepattern = ctx.createPattern(blackHole, "repeat");
        ctx.fillStyle = blackHolepattern;
        ctx.fill();
        
        ctx.stroke();
        ctx.closePath();
    }

    //Check black hole collision
    function checkBlackHoleCollision() {
        //Check closest edge and save in variable
        let closestX = bHX;
        let closestY = bHY;

        if (bHX < frogX) {
            closestX = frogX;
        } else if (bHX > frogX + frogWidth) {
            closestX = frogX + frogWidth;
        }

        if (bHY < frogY) {
            closestY = frogY;
        } else if (bHY > frogY + frogWidth) {
            closestY = frogY + frogWidth;
        }

        //Check distance
        let distX = bHX - closestX;
        let distY = bHY - closestY;
        let calcDistance = (distX*distX) + (distY*distY);
        let distance = Math.sqrt(calcDistance);

        //If distance is smaller than radius, collision is true
        if (distance <= blackHoleR) {
            return true;
        } else {
            return false;
        }
    }

    // let yArr = [555, 500, 445, 390, 225, 170, 115, 60];
    // let randomY = yArr[Math.floor(Math.random() * yArr.length)];
    // function drawRandomLife() {
    //     let liveImg = new Image();
    //     liveImg.src = './images/frogger.png';
    //     let lifeX = 0;
    //     let xSpeed = 1;
        
    //     lifeX += 5;
    //     ctx.drawImage(liveImg, lifeX, randomY, 40, 40);
    // }

    //Alien line 2
    function alienLine2() {
        for (let i=0; i < alien2.length; i++) {
            ctx.drawImage(alienImg, alien2[i].x, row2);
            alien2[i].x -= 1;

            if (alien2[i].x === -90) {
                alien2.shift();
            }
            if (alien2[i].x === 150) {
                alien2.push({
                    x: 500,
                    y: row2
                });
            }
            checkAlienCollision(alien2, row2);
        }
    }

    //Alien line 7
    function alienLine7() {
        for (let i=0; i < alien7.length; i++) {
            ctx.drawImage(alienImg, alien7[i].x, row7);
            alien7[i].x += 2;

            if (alien7[i].x === 630) {
                alien7.slice(-1);
            }
            if (alien7[i].x === 130) {
                alien7.push({
                    x: -30,
                    y: row7
                });
            }
            checkAlienCollision(alien7, row7);
        }
    }

    //Check collision aliens (for points)
    function checkAlienCollision(alienArr, row) {
        for (let i=0; i < alienArr.length; i++) {
            if ((frogX + frogWidth > alienArr[i].x && frogX < alienArr[i].x + 30) && (frogY < row + 30 && frogY + frogWidth > row)) {
                score += 200;
                alienArr.splice(i, 1);
                chew.volume = 0.1;
                chew.play();
            }
        }
    }
    
    // Check asteroids collision
    function checkAsteroidCollision(astArr, row) {
        for (let i=0; i < astArr.length; i++) {
            if ((frogX + frogWidth > astArr[i].x && frogX < astArr[i].x + 35) && (frogY < row + 35 && frogY + frogWidth > row)) {
                checkNumberLives();
                if (frogY > 360) {
                    frogX = halfWidth - frogWidth/2;
                    frogY = row9;
                } else {
                    if (frogX < canvas.width/2) {
                            frogX = 65;
                            frogY = canvas.height /2 - frogWidth;
                    } else {
                            frogX = 370;
                            frogY = canvas.height /2 - frogWidth;
                    }
                }
            }
        }
    } 

    class Asteroid {
        constructor(astX, row, astWidth, astSpeed, astObj, astPushX, xPush) {
            this.astX = astX;
            this.row = row;
            this.astWidth = astWidth;
            this.astSpeed = astSpeed;
            this.astObj = astObj;
            this.astPushX = astPushX;
            this.xPush = xPush;
        }

        drawRightTop () {
            for (let i=0; i < this.astObj.length; i++) {
                ctx.drawImage(astImg, this.astObj[i].x, this.row, this.astWidth, this.astWidth);
                this.astObj[i].x += this.astSpeed;

                if (this.astObj[i].x === 650) {
                    this.astObj.slice(-1);
                }
                if (this.astObj[i].x === this.astPushX) {
                    this.astObj.push({
                        x: this.xPush,
                        y: this.row
                    });
                }
            }
            checkAsteroidCollision(this.astObj, this.row);
        };

        drawRightBottom () {
            for (let i=0; i < this.astObj.length; i++) {
                ctx.drawImage(astImg, this.astObj[i].x, this.row, this.astWidth, this.astWidth);
                this.astObj[i].x += this.astSpeed;

                if (this.astObj[i].x === 650) {
                    this.astObj.slice(-1);
                }
                if (this.astObj[i].x === this.astPushX) {
                    this.astObj.push({
                        x: this.xPush,
                        y: this.row
                    });
                }
            }
            checkAsteroidCollision(this.astObj, this.row);
        };

        drawLeftTop() {
            for (let i=0; i < this.astObj.length; i++) {
                ctx.drawImage(astImg, this.astObj[i].x, this.row, this.astWidth, this.astWidth);
                this.astObj[i].x -= this.astSpeed;
    
                if (this.astObj[i].x === -90) {
                    this.astObj.slice(0);
                }
                if (this.astObj[i].x === this.astPushX) {
                    this.astObj.push({
                        x: this.xPush,
                        y: this.row
                    });
                }
            }
            checkAsteroidCollision(this.astObj, this.row);
        };

        drawLeftBottom() {
            for (let i=0; i < this.astObj.length; i++) {
                ctx.drawImage(astImg, this.astObj[i].x, this.row, this.astWidth, this.astWidth);
                this.astObj[i].x -= this.astSpeed;
    
                if (this.astObj[i].x === -90) {
                    this.astObj.slice(0);
                }
                if (this.astObj[i].x === this.astPushX) {
                    this.astObj.push({
                        x: this.xPush,
                        y: this.row
                    });
                }
            }
            checkAsteroidCollision(this.astObj, this.row);
        };
    }

    let astArr1 = new Asteroid (-30, row1, 35, 3, ast1, 201, -30);
    let astArr4 = new Asteroid (-40, row4, 35, 1, ast4, 151, -35);
    let astArr5 = new Asteroid (250, row5, 35, 2, ast5, 260, -30);
    let astArr7 = new Asteroid (120, row7, 35, 2, ast7, 130, -30);
    let astArr2 = new Asteroid (500, row2, 35, 1, ast2, 150, 500);
    let astArr3 = new Asteroid (500, row3, 35, 2, ast3, 300, 500);
    let astArr6 = new Asteroid (330, row6, 35, 2, ast6, 200, 500);
    let astArr8 = new Asteroid (330, row8, 35, 1, ast8, 300, 500);
    
    function getHighScore(playerName, gameScore) {
        let result = {name: playerName, score: gameScore};
        let savedScores = localStorage.getItem('highscore') || '[]';
        highscores = [...JSON.parse(savedScores), result];
        highscores.sort((a,b) => b.score- a.score);
        highscores.slice(0, 5);

        localStorage.setItem('highscore', JSON.stringify(highscores));
        
        document.querySelector('.scoreLi1').innerText = `${highscores[0].name} : ${highscores[0].score}`;
        document.querySelector('.scoreLi2').innerText = `${highscores[1].name} : ${highscores[1].score}`;
        document.querySelector('.scoreLi3').innerText = `${highscores[2].name} : ${highscores[2].score}`;
        document.querySelector('.scoreLi4').innerText = `${highscores[3].name} : ${highscores[3].score}`;
        document.querySelector('.scoreLi5').innerText = `${highscores[4].name} : ${highscores[4].score}`;
    }

    function gameOver() {
        clearInterval(intervalId);
        clearInterval(intervalIdTwo);
        squashMusic.volume = 0.1;
        squashMusic.play();
        removeGameScreen();
        createGOScreen();
        document.querySelector('.end-score').innerText = `Your score: ${score}`;
        getHighScore(player, score);
    }

    function gameWin() {
        score += lives * 200;
        score += 1000;
        winSound.volume = 0.1;
        winSound.play();
        clearInterval(intervalId);
        clearInterval(intervalIdTwo);
        removeGameScreen();
        createWinScreen();
        document.querySelector('.end-score').innerText = `Your score: ${score}`;
        getHighScore(player, score);
    }

    function checkNumberLives() {
        if (lives < 0) {
            gameOver(); 
        } else {
            lives -= 1;
            let score = document.querySelector('.lives');
            score.parentNode.removeChild(score);  
        }
    }

    function checkFroggerWin() {
        if (frogY < 15 && frogX > 100 & frogX < 400) {
            gameWin();    
        } else {
            !checkBlackHoleCollision() ? null : gameOver();
        };
    }
  
    function drawCanvas() {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, halfWidth - 100, 590, 200, 100);
        ctx.drawImage(homeImg, -25, -40, 550, 100);
        ctx.drawImage(bluePlanet, 40, canvas.height/2 - 45, 90, 90);
        ctx.drawImage(yellowPlanet, 360, canvas.height/2 - 45, 90, 90);
        ctx.drawImage(frogger, frogX, frogY, frogWidth, frogWidth);
        
        drawBlackHole();
       
        astArr1.drawRightTop();
        astArr4.drawRightTop();
        astArr5.drawRightBottom();
        astArr7.drawRightBottom();
        astArr2.drawLeftTop();
        astArr3.drawLeftTop();
        astArr6.drawLeftBottom();
        astArr8.drawLeftBottom();

        alienLine2();
        alienLine7();

        checkFroggerWin(); 
    }

    intervalId = setInterval(() => {
        requestAnimationFrame(drawCanvas); 
    }, 20)

    //Showing score from start
    function showScore() {
        document.querySelector('.score-num').innerText = `Score: ${score}`;
        score -= 10;
        if (score == 0) {
            gameOver();
        }
    };
    
    showScore();
    intervalIdTwo = setInterval(() => {
        showScore();
    }, 1000)
    
    //Play music after 2 seconds 
    setTimeout(() => {
        bgMusic.volume = 0.1;
        bgMusic.play();
    }, 2000);

}


