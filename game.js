function start() {
    // Draw canvas
    let canvas = document.querySelector('#game-canvas');
    canvas.style.border = '5px solid lightblue';

    let ctx = canvas.getContext('2d');
    
    let intervalId = 0;
    let intervalIdTwo = 0;

    // Load images
    let bgImg = new Image();
    bgImg.src = '/images/kai-pilger-Ef6iL87-vOA-unsplash.jpg'

    let baseImg = new Image();
    baseImg.src = '/images/startBase.png';

    let homeImg = new Image();
    homeImg.src = '/images/home.png';

    let frogger = new Image();
    frogger.src = '/images/frogger.png';

    let bluePlanet = new Image();
    bluePlanet.src = '/images/bluePlanet.png';

    let yellowPlanet = new Image();
    yellowPlanet.src = '/images/yellowPlanet.png';

    // Asteroids
    let astImg = new Image();
    astImg.src = '/images/astSmall.png';

    // Asteroids rows
    let ast1 = [{x:-30, y: 70}];
    let ast2 = [{x:500, y: 110}, {x:530, y: 110}, {x:560, y: 110}];
    let ast3 = [{x:500, y: 160}];
    let ast4 = [{x:-30, y: 210}, {x:0, y: 210}];
    let ast5 = [{x:-30, y: 360}];
    let ast6 = [{x:500, y: 410}, {x:530, y: 410}];
    let ast7 = [{x:-30, y: 460}];
    let ast8 = [{x:330, y: 510}, {x:360, y: 510}];

    //Aliens
    let alienImg = new Image();
    alienImg.src = '/images/alien.png';

    let alien2 = [{x:400, y: 110}]
    let alien7 = [{x:-130, y: 460}];

    // Variables imgs
    let frogX = 208;
    let frogY = 560;
    let frogWidth = 35;
    let halfWidth = canvas.width/2; 
    let bHX = 225;
    let bHY = 300;
    let blackHoleR = 50;

    //Variables score and lives
    let lives = 3;
    let score = 3000;
    let highscore = 0;
    highscore = window.localStorage.getItem("highscore");


    function getHighScore() {
        if (score > highscore) {
            window.localStorage.setItem('highscore', JSON.stringify(score));
        }
    }

    //Variables keys
    let isRightArrow = false;
    let isLeftArrow = false;
    let isUpArrow = false;
    let isDownArrow = false;

    // Music
    let bgMusic = new Audio('/music/backgroundmusic.mp3');
    let hopMusic = new Audio('/music/hop.wav');
    let squashMusic = new Audio('/music/sound-frogger-squash.wav');
    let chew = new Audio('/music/eat.wav');

    function playHop() {
        hopMusic.volume = 0.1;
        hopMusic.play();
    }

    // Press arrowkey eventListener
    document.addEventListener('keydown', (event) => {
        console.log('Key pressed', event);
            if (event.key === 'ArrowRight') {
                isRightArrow = true;
                isLeftArrow = false;
                isUpArrow = false;
                isDownArrow = false;
                playHop();
            }
            else if (event.key === 'ArrowLeft') {
                isLeftArrow = true;
                isRightArrow = false;
                isUpArrow = false;
                isDownArrow = false;
                playHop();
            }
            else if (event.key === 'ArrowUp') {
                isUpArrow = true;
                isLeftArrow = false;
                isRightArrow = false;
                isDownArrow = false;
                playHop();
            }
            else if (event.key === 'ArrowDown') {
                isUpArrow = false;
                isLeftArrow = false;
                isRightArrow = false;
                isDownArrow = true;
                playHop();
            }
    })
            
    // Release arrowkey eventListener
    document.addEventListener('keyup', (event) => {
        isUpArrow = false;
        isLeftArrow = false;
        isRightArrow = false;
        isDownArrow = false;
                
    })

    //Draw black hole
    function drawBlackHole(){
        ctx.beginPath();
        ctx.arc(bHX, bHY, blackHoleR, 0, Math.PI*2);
        let blackHole = new Image();
        blackHole.src = '/images/blackHoleDef.png';
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
        }
        else if (bHX > frogX + frogWidth) {
            closestX = frogX + frogWidth;
        }

        if (bHY < frogY) {
            closestY = frogY;
        }
        else if (bHY > frogY + frogWidth) {
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
        }
        else {
            return false;
        }
    }

    //Alien line 2
    function alienLine2() {
        for (let i=0; i < alien2.length; i++) {
            ctx.drawImage(alienImg, alien2[i].x, alien2[i].y);
            alien2[i].x -= 1;

            if (alien2[i].x === -90) {
                alien2.shift();
            }
            if (alien2[i].x === 150) {
                alien2.push({
                    x: 500,
                    y: 110
                });
            }
            checkAlienCollision(alien2);
        }
    }

    //Alien line 7
    function alienLine7() {
        for (let i=0; i < alien7.length; i++) {
            ctx.drawImage(alienImg, alien7[i].x, alien7[i].y);
            alien7[i].x += 2;

            if (alien7[i].x === 630) {
                alien7.slice(-1);
            }
            if (alien7[i].x === 150) {
                alien7.push({
                    x: -30,
                    y: 460
                });
            }
            checkAlienCollision(alien7);
        }
    }

    //Check collision aliens (for points)
    function checkAlienCollision(alienArr) {
        for (let i=0; i < alienArr.length; i++) {
            if ((frogX + frogWidth > alienArr[i].x && frogX < alienArr[i].x + 30) && (frogY < alienArr[i].y + 30 && frogY + frogWidth > alienArr[i].y)) {
                score += 100;
                alienArr.splice(i, 1);
                chew.volume = 0.1;
                chew.play();
            }
        }
    }

    // Check asteroids four top lines
    function checkAsteroidCollisionTop(astArr) {
        for (let i=0; i < astArr.length; i++) {
            if ((frogX + frogWidth > astArr[i].x && frogX < astArr[i].x + 30) && (frogY < astArr[i].y + 30 && frogY + frogWidth > astArr[i].y)) {
                checkNumberLives();

                if (frogX < canvas.width/2) {
                    frogX = 65;
                    frogY = canvas.height /2 - frogWidth;
                }
                else {
                    frogX = 350;
                    frogY = canvas.height /2 - frogWidth;
                }
            }
        }
    } 

    // Check asteroids four bottom lines
    function checkAsteroidCollisionBottom(astArr) {
        for (let i=0; i < astArr.length; i++) {
            if ((frogX + frogWidth > astArr[i].x && frogX < astArr[i].x + 30) && (frogY < astArr[i].y + 30 && frogY + frogWidth > astArr[i].y)) {
                checkNumberLives();
                frogX = 208;
                frogY = 560;
            }
        }
    }

    //Asteroid functions, 8 times for 8 lines
    // Line 1
    function drawAsteroid1() {
        for (let i=0; i < ast1.length; i++) {
            ctx.drawImage(astImg, ast1[i].x, ast1[i].y);
            ast1[i].x += 2;

            if (ast1[i].x === 630) {
                ast1.slice(-1);
            }
            if (ast1[i].x === 200) {
                ast1.push({
                    x: -30,
                    y: 70
                });
            }

            checkAsteroidCollisionTop(ast1);
        }
    }

    // Line 2
    function drawAsteroid2() {
        for (let i=0; i < ast2.length; i++) {
            ctx.drawImage(astImg, ast2[i].x, ast2[i].y);
            ast2[i].x -= 1;

            if (ast2[i].x === -90) {
                ast2.slice(0);
            }
            if (ast2[i].x === 150) {
                ast2.push({
                    x: 500,
                    y: 110
                });
            }

            checkAsteroidCollisionTop(ast2);
        }
    }

    // Line 3
    function drawAsteroid3() {
        for (let i=0; i < ast3.length; i++) {
            ctx.drawImage(astImg, ast3[i].x, ast3[i].y);
            ast3[i].x -= 2;

            if (ast3[i].x === -30) {
                ast3.shift();
            }
            if (ast3[i].x === 300) {
                ast3.push({
                    x: 500,
                    y: 160
                });
            }

            checkAsteroidCollisionTop(ast3);
        }
    }

    // Line 4
    function drawAsteroid4() {
        for (let i=0; i < ast4.length; i++) {
            ctx.drawImage(astImg, ast4[i].x, ast4[i].y);
            ast4[i].x += 1;

            if (ast4[i].x === 630) {
                ast4.slice(-1);
            }
            if (ast4[i].x === 150) {
                ast4.push({
                    x: -30,
                    y: 210
                });
            }

            checkAsteroidCollisionTop(ast4);
        }
    }

    // Line 5
    function drawAsteroid5() {
        for (let i=0; i < ast5.length; i++) {
            ctx.drawImage(astImg, ast5[i].x, ast5[i].y);
            ast5[i].x += 1;

            if (ast5[i].x === 630) {
                ast5.slice(-1);
            }
            if (ast5[i].x === 100) {
                ast5.push({
                    x: -30,
                    y: 360
                });
            }

            checkAsteroidCollisionBottom(ast5);
        }
    }

    // Line 6
    function drawAsteroid6() {
        for (let i=0; i < ast6.length; i++) {
            ctx.drawImage(astImg, ast6[i].x, ast6[i].y);
            ast6[i].x -= 2;

            if (ast6[i].x === -60) {
                ast6.slice(0);
            }
            if (ast6[i].x === 200) {
                ast6.push({
                    x: 500,
                    y: 410
                });
            }

            checkAsteroidCollisionBottom(ast6);
        }
    }

    // Line 7
    function drawAsteroid7() {
        for (let i=0; i < ast7.length; i++) {
            ctx.drawImage(astImg, ast7[i].x, ast7[i].y);
            ast7[i].x += 2;

            if (ast7[i].x === 630) {
                ast7.slice(-1);
            }
            if (ast7[i].x === 150) {
                ast7.push({
                    x: -30,
                    y: 460
                });
            }

            checkAsteroidCollisionBottom(ast7);
        }
    }

    // Line 8
    function drawAsteroid8() {
        for (let i=0; i < ast8.length; i++) {
            ctx.drawImage(astImg, ast8[i].x, ast8[i].y);
            ast8[i].x--;

            if (ast8[i].x === -30) {
                ast8.slice(0);
            }
            if (ast8[i].x === 300) {
                ast8.push({
                    x: 500,
                    y: 510
                });
            }

            checkAsteroidCollisionBottom(ast8);
        }
    }

    function moveFrogger() {
        if (isRightArrow && frogX < canvas.width - frogWidth) {
            frogX += 5;
            frogger.src = '/images/froggerRight.png';
        }
        else if (isLeftArrow && frogX > 0) {
            frogX -= 5;
            frogger.src = '/images/froggerLeft.png';
        }
        else if (isUpArrow && frogY + frogWidth > 0) {
            frogger.src = '/images/frogger.png';
            frogY -= 5;
        }
        else if (isDownArrow && frogY + frogWidth < canvas.height) {
            frogY += 5;
            frogger.src = '/images/froggerDown.png';
        }
    }

    function gameOver() {
        clearInterval(intervalId);
        clearInterval(intervalIdTwo);
        squashMusic.volume = 0.1;
        squashMusic.play();
        removeGameScreen();
        createGOScreen();
        document.querySelector('.end-score').innerText = `Your score: ${score}`;
        getHighScore();
        console.log(`${localStorage.getItem('name')}`)
        document.querySelector('.highscore').innerText = `Highscore: ${localStorage.getItem('highscore')}`;
    }

    function gameWin() {
        score += lives * 100;
        score += 500;
        clearInterval(intervalId);
        clearInterval(intervalIdTwo);
        removeGameScreen();
        createWinScreen();
        document.querySelector('.end-score').innerText = `Your score: ${score}`;
        getHighScore();
        document.querySelector('.highscore').innerText = `Highscore: ${localStorage.getItem('highscore')}`;
    }

    function checkNumberLives() {
        if (lives < 0) {
            gameOver();
        }
        else {
            lives -= 1;
            let score = document.querySelector('.lives');
            score.parentNode.removeChild(score);  
        }
    }

    function checkFroggerWin() {
        if (frogY < 15 && frogX > 100 & frogX < 500) {
            gameWin();
        }
        else {
            if (!checkBlackHoleCollision()) {
                moveFrogger();
            }
            else {
                gameOver();
            }
        }
    }

    function drawCanvas() {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, halfWidth - 100, 550, 200, 100);
        ctx.drawImage(homeImg, -20, -40, 500, 100);
        ctx.drawImage(bluePlanet, 40, 300 - 40, 80, 80);
        ctx.drawImage(yellowPlanet, 330, 300 - 40, 80, 80);
        ctx.drawImage(frogger, frogX, frogY, frogWidth, frogWidth);
        
        drawBlackHole();

        drawAsteroid8();
        drawAsteroid7();
        drawAsteroid6();
        drawAsteroid5();
        drawAsteroid4();
        drawAsteroid3();
        drawAsteroid2();
        drawAsteroid1();

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
        console.log(Math.floor(score));
        if (score < 0) {
            gameOver();
        }
    };
    
    showScore();
    intervalIdTwo = setInterval(() => {
        showScore();
    }, 1000)
    
    // //Play music after 3 seconds 
    // setTimeout(() => {
    //     bgMusic.volume = 0.1;
    //     bgMusic.play();
    // }, 3000);

}

//window.addEventListener("load", start)

