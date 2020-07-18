function start() {
    // Draw canvas
    let canvas = document.querySelector('#game-canvas');
    canvas.style.border = '5px solid lightblue';

    let ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';

    let intervalID = 0;

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
    let ast5 = [{x:-30, y: 360}];
    let ast6 = [{x:500, y: 410}];
    let ast7 = [{x:-30, y: 460}];
    let ast8 = [{x:500, y: 510}];

    // Variables
    let frogX = 208;
    let frogY = 560;
    let frogWidth = 35;
    let halfWidth = canvas.width/2; 
    let blackHoleR = 50;

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
            
    // Release arrowkey
    document.addEventListener('keyup', function(event) {
        isUpArrow = false;
        isLeftArrow = false;
        isRightArrow = false;
        isDownArrow = false;
                
    })

    function froggerMovement() {
        
        //Check for location of 'home'
        if (frogY === 10) {
            //Insert win-function later. If you win, change values of title
            console.log('You win!');
        }
        else {
            //Checks for location of black hole
            //
            if ((frogX + frogWidth < 225 - blackHoleR || frogX > 225 + blackHoleR) || (frogY + frogWidth < 300 - blackHoleR || frogY > 300 + blackHoleR)) {
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
            else {
                //Insert gameover-function later. How to make this work?
                // main().removeGameScreen;
                // main().createGOScreen;
                clearInterval(intervalId);
                console.log('Game over!');
            }
        }
    }

    //Asteroid draw function, 8 times for 8 lines

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

            // Collision logic
        }
    }

    // Line 6
    function drawAsteroid6() {
        for (let i=0; i < ast6.length; i++) {
            ctx.drawImage(astImg, ast6[i].x, ast6[i].y);
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

            // Collision logic
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

            // Collision logic
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

            // Collision logic
        }
    }


    // Draw images
    function draw() {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, halfWidth - 100, 550, 200, 100);
        ctx.drawImage(homeImg, -20, -40, 500, 100);
        ctx.drawImage(bluePlanet, 30, 300 - 40, 80, 80);
        ctx.drawImage(yellowPlanet, 330, 300 - 40, 80, 80);
        ctx.drawImage(frogger, frogX, frogY, frogWidth, frogWidth);
        
        drawAsteroid8();
        drawAsteroid7();
        drawAsteroid6();
        drawAsteroid5();
        

        froggerMovement();

        //ctx.drawImage(blackHole, 225, 300, 100, 100);
        //Draw circle for blackHole
        ctx.beginPath();
        ctx.arc(225, 300, blackHoleR, 0, Math.PI*2);
        let blackHole = new Image();
        blackHole.src = '/images/rsz_2blackhole3.png';
        let blackHolepattern = ctx.createPattern(blackHole, "repeat");
        ctx.fillStyle = blackHolepattern;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    intervalId = setInterval(() => {
        requestAnimationFrame(draw);
        
    }, 20)


    //Play music after 3 seconds 
    setTimeout(() => {
        bgMusic.volume = 0.1;
        bgMusic.play();
    }, 3000);
    
}

window.addEventListener("load", start)



