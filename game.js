// function start() {
//     froggerMovement();
    

    
// }

// Draw canvas
let canvas = document.getElementById('gameCanvas');
canvas.style.border = '5px solid lightblue';

let ctx = canvas.getContext('2d');

let intervalID = 0;

// Load images
let bgImg = new Image();
bgImg.src = 'images/kai-pilger-Ef6iL87-vOA-unsplash.jpg'

let baseImg = new Image();
baseImg.src = 'images/startBase.png';

let homeImg = new Image();
homeImg.src = 'images/home.png';

let frogger = new Image();
frogger.src = 'images/frogger.png'

let bluePlanet = new Image();
bluePlanet.src = 'images/bluePlanet.png'

let yellowPlanet = new Image();
yellowPlanet.src = 'images/yellowPlanet.png'

let blackHole = new Image();
blackHole.src = 'images/blackHole.png'


//Variables
let frogX = 208;
let frogY = 560;
let froghalfWidth = 35/2;
let halfWidth = canvas.width/2; 

let isrightArrow = false;
let isleftArrow = false;
let isupArrow = false;

    // Press arrowkey
document.addEventListener('keydown', function(event) {
    console.log('Key pressed', event);
        if (event.key === 'ArrowRight') {
            isrightArrow = true;
            isleftArrow = false;
            isupArrow = false;
        }
        else if (event.key === 'ArrowLeft') {
            isleftArrow = true;
            isrightArrow = false;
            isupArrow = false;
        }
        else if (event.key === 'ArrowUp') {
            isupArrow = true;
            isleftArrow = false;
            isrightArrow = false;
        }
})
        
// Release arrowkey
document.addEventListener('keyup', function(event) {
    isupArrow = false;
    isleftArrow = false;
    isrightArrow = false;
            
})

function froggerMovement() {
    if (isrightArrow) {
        frogX++;
    }
    else if (isleftArrow) {
        frogX -= 1;
    }
    else if (isupArrow) {
        frogY -= 1;
    }
}

// Draw images
function draw() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImg, halfWidth - 100, 550, 200, 100);
    ctx.drawImage(homeImg, -20, -40, 500, 100);
    ctx.drawImage(bluePlanet, 30, 300 - 40, 80, 80);
    ctx.drawImage(yellowPlanet, 330, 300 - 40, 80, 80);
    ctx.drawImage(blackHole, halfWidth - 50, 300 - 40, 100, 80);
    ctx.drawImage(frogger, frogX, frogY, 35, 35);
    froggerMovement();
}

intervalId = setInterval(() => {
    requestAnimationFrame(draw);
    
}, 10)




