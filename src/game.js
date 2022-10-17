function start() {
    // Music
    let hopMusic = new Audio('./music/hop.wav');
    let squashMusic = new Audio('./music/sound-frogger-squash.wav');
    let chew = new Audio('./music/eat.wav');

    function playHop() {
        hopMusic.volume = 0.1;
        hopMusic.play();
    }

    //Draw random life
    // function drawRandomLife() {
    //     let locationArr = [[160, 315],[320, 315],[20, 610],[600, 225]];
    //     let liveImg = new Image();
    //     liveImg.src = './images/starDef.png';
    //     let randomCoordinates = locationArr[Math.floor(Math.random() * locationArr.length)];
    //     let randomX = randomCoordinates[0];
    //     let randomY = randomCoordinates[1];
    //     ctx.drawImage(liveImg, randomX, randomY, 20, 20);
    // }

    // setInterval(() => {
    //     drawRandomLife();
    //     clearRect(randomX, randomY, 20, 20);
    // }, 1000)

    //Play music after 2 seconds
    setTimeout(() => {
        bgMusic.volume = 0.1;
        bgMusic.play();
    }, 2000);

}


