function start() {
    // Draw canvas
    let canvas = document.querySelector('#game-canvas');
    canvas.style.border = '5px solid lightblue';

    let ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';

    let intervalId = 0;

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
    let ast2 = [{x:500, y: 110}];
    let ast3 = [{x:500, y: 160}];
    let ast4 = [{x:-30, y: 210}];
    let ast5 = [{x:-30, y: 360}];
    let ast6 = [{x:500, y: 410}];
    let ast7 = [{x:-30, y: 460}];
    let ast8 = [{x:500, y: 510}];

    // Variables
    let frogX = 208;
    let frogY = 560;
    let frogWidth = 35;
    let halfWidth = canvas.width/2; 
    let bHX = 225;
    let bHY = 300;
    let blackHoleR = 50;
    let lives = 3;

    let isRightArrow = false;
    let isLeftArrow = false;
    let isUpArrow = false;
    let isDownArrow = false;

    // Music
    let bgMusic = new Audio('/music/backgroundmusic.mp3');
    let hopMusic = new Audio('/music/hop.wav')

    // Press arrowkey eventListener
    document.addEventListener('keydown', function(event) {
        console.log('Key pressed', event);
            if (event.key === 'ArrowRight') {
                isRightArrow = true;
                isLeftArrow = false;
                isUpArrow = false;
                isDownArrow = false;
                hopMusic.volume = 0.1;
                hopMusic.play();
            }
            else if (event.key === 'ArrowLeft') {
                isLeftArrow = true;
                isRightArrow = false;
                isUpArrow = false;
                isDownArrow = false;
                hopMusic.volume = 0.1;
                hopMusic.play();
            }
            else if (event.key === 'ArrowUp') {
                isUpArrow = true;
                isLeftArrow = false;
                isRightArrow = false;
                isDownArrow = false;
                hopMusic.volume = 0.1;
                hopMusic.play();
            }
            else if (event.key === 'ArrowDown') {
                isUpArrow = false;
                isLeftArrow = false;
                isRightArrow = false;
                isDownArrow = true;
                hopMusic.volume = 0.1;
                hopMusic.play();
            }
    })
            
    // Release arrowkey eventListener
    document.addEventListener('keyup', function(event) {
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
        blackHole.src = '/images/blackHoletest.png';
        let blackHolepattern = ctx.createPattern(blackHole, "repeat");
        ctx.fillStyle = blackHolepattern;
        ctx.fill();
        
        ctx.stroke();
        ctx.closePath();
    }


    //Check black hole collision
    function checkBlackHoleCollision() {
        //Check closest edge and save in variabel
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

    function moveFrogger() {
        if (isRightArrow && frogX < canvas.width - frogWidth) {
            frogX += 2;
        }
        else if (isLeftArrow && frogX > 0) {
            frogX -= 2;
        }
        else if (isUpArrow && frogY > 10) {
            frogY -= 2;
        }
        else if (isDownArrow && frogY + frogWidth < canvas.height) {
            frogY += 2;
        }
    }

    // Check asteroids four top lines
    function checkAsteroidCollisionTop(astArr) {
        for (let i=0; i < astArr.length; i++) {
            if ((frogX + frogWidth > astArr[i].x && frogX < astArr[i].x + 30) && (frogY < astArr[i].y + 30 && frogY + frogWidth > astArr[i].y)) {
                lives -= 1;
                
                let score = document.querySelector('.lives');
                score.parentNode.removeChild(score);

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
                lives -= 1;
                
                let score = document.querySelector('.lives');
                score.parentNode.removeChild(score);

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
            if (ast1[i].x === 300) {
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
            ctx.drawImage(astImg, ast2[i].x + 30, ast2[i].y);
            ctx.drawImage(astImg, ast2[i].x + 60, ast2[i].y);
            ast2[i].x -= 1;

            if (ast2[i].x === -30) {
                ast2.shift();
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
            ctx.drawImage(astImg, ast4[i].x + 30, ast4[i].y);
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
            ctx.drawImage(astImg, ast6[i].x + 30, ast6[i].y);
            ast6[i].x -= 2;

            if (ast6[i].x === -30) {
                ast6.shift();
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

    function checkFroggerLives() {
        //Check if enough lives
        if (lives >= 0) {
            //Check for location of 'home'
            if (frogY === 10) {
                //Insert win-function later. If you win, change values of title of GOScreen

                console.log('You win!');
            }
            else {
                if (!checkBlackHoleCollision()) {
                    moveFrogger();
                }
                else {
                    console.log('Game over!');
                    clearInterval(intervalId);
                    //main().createGOScreen(); // goes back to splashScreen (because it is default?)
                }
            }
        }
        else {
            clearInterval(intervalId);
            console.log('Game over!');
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
        
        
        checkFroggerLives();
        
    }

    intervalId = setInterval(() => {
        requestAnimationFrame(drawCanvas);
        
    }, 20)


    //Play music after 3 seconds 
    // setTimeout(() => {
    //     bgMusic.volume = 0.1;
    //     bgMusic.play();
    // }, 3000);
    
}

window.addEventListener("load", start)

