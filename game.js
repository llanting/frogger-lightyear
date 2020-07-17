let canvas = document.getElementById('gameCanvas');
canvas.style.border = '5px solid lightblue';

let ctx = canvas.getContext('2d');

let bgImg = new Image();
bgImg.src = 'images/kai-pilger-Ef6iL87-vOA-unsplash.jpg'

let baseImg = new Image();
baseImg.src = 'images/startBase.png';

let homeImg = new Image();
homeImg.src = 'images/home.png';

let frogger = new Image();
frogger.src = 'images/frogger.png'

function draw() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImg, 140, 400, 200, 100);
    ctx.drawImage(homeImg, 0, -40, 500, 150);
    ctx.drawImage(frogger, canvas.width/2, 460, 35, 35);
}

let intervalId = setInterval(() => {
    requestAnimationFrame(draw)
}, 1000)
