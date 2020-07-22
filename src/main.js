 function buildPage(html) {
    let div = document.createElement('div');

    div.innerHTML = html;

    return div.children[0];

}

let bodyIndex = document.querySelector('body');
let splashScreen;
let gameScreen;
let gameOverScreen;
let winScreen;
let playerName;
let splashMusic = new Audio('./music/splashMusic.mp3')
let winSound = new Audio('./music/snd_music_victorytheme.ogg');
let bgMusic = new Audio('./music/backgroundmusic.mp3');
bgMusic.loop = true;

//Splash

function createSplashScreen() {
    splashScreen = buildPage(`
        <main class="splashScreen">
            <div class="title jumbotron">
                <button class="music"><img src="./images/musicBtn.png"></button>
                <h1 class="display-4">Frogger Lightyear</h1>
                <p class="lead">Frogger has been on an amazing space-adventure. Help him get home safe by eating your way through aliens and visiting planets. But watch out for asteroids and that black hole...</p>
                <div>
                    <h3 class="keyHead">Keys</h3>
                    <ul class='keys'>
                        <li>Arrow Up: Up</li>
                        <li>Arrow Down: Down</li>
                        <li>Arrow Left: Left</li>
                        <li>Arrow Right: Right</li>
                    </ul>
                </div>
                <input type='text' placeholder="What is your name?">
                <div class="mainSplash">
                    <button id="start-btn" class ="button btn btn-danger">START</button>
                    <img class="frogLY" src="./images/froggerLY.jpeg" alt='Frogger Lightyear'>
                </div>
            </div>
        </main>`);

    bodyIndex.prepend(splashScreen);

    function getPlayerName() {
        if (!document.querySelector('input').value) {
            playerName = 'Frogger';
        } else {
            playerName = document.querySelector('input').value;
        }
    }

    splashMusic.volume = 0.1;
    let splashOn = true;
    splashMusic.play();

    let musicBtn = splashScreen.querySelector('.music');

    musicBtn.addEventListener('click', function() {
        if (splashOn) {
            splashMusic.pause();
            splashOn = false;
        } else {
            splashOn = true;
            splashMusic.play();
        }
    })

    let startBtn = splashScreen.querySelector('#start-btn');

    let startMusic = new Audio('./music/coinin.wav');

    startBtn.addEventListener('click', function() {
        getPlayerName();
        splashMusic.pause();
        startMusic.volume = 0.1;
        startMusic.play();
        removeSplashScreen();
        createGameScreen();
        start();
    });
}

function removeSplashScreen() {
    splashScreen.remove();
}

window.addEventListener("load", createSplashScreen)

//Game screen
function createGameScreen() {
    gameScreen = buildPage(`
    <main class="gamescreen">
        <div class="heightset">
            <div class='score-lives'>
                <span class='score score-num'>Score:</span>
                <span class='score'>Lives:</span>
                <img src="./images/frogger.png" alt='life' class="lives life">
                <img src="./images/frogger.png" alt='life' class="lives life">
                <img src="./images/frogger.png" alt='life' class="lives life">
            </div> 
            <div class="canvas-container">
                <canvas id='game-canvas' width="450" height="600"></canvas>
            </div>
        </div>
    </main>`);
    
    bodyIndex.prepend(gameScreen);

}

function removeGameScreen() {
    gameScreen.remove();
    bgMusic.pause();
}

//Game over
function createGOScreen() {
    gameOverScreen = buildPage(`
    <main class="background-gameover">
        <div class="jumbotron">
            <h3 class="win-lose-text">GAME OVER!</h3>
            <p class="lead">Frogger Lightyear floats in space for ever...</p>
            <p class="end-score"></p>
            <div class="scoreboard">
                <h2 class="score-title">High Scores:</h2>
                <ol class='highscores'>
                    <li class="scoreLi1">Buzz: 0000</li>
                    <li class="scoreLi2">Neil: 0000</li>
                    <li class="scoreLi3">Laika: 0000</li>
                    <li class="scoreLi4">Yuri: 0000</li>
                    <li class="scoreLi5">Valentina: 0000</li>
                </ol>
            </div>
            <button id="restart-btn" class ="button btn btn-danger">PLAY AGAIN?</button>
            <p class="honor">In honor of Frogger</p>
            <p class="mention">Lanette &copy 2020</p>
        </div>
    </main>`);

    bodyIndex.prepend(gameOverScreen);

    let restartBtn = gameOverScreen.querySelector('#restart-btn');

    restartBtn.addEventListener('click', function() {
        removeGOScreen();
        createSplashScreen();
    });      
}

function removeGOScreen() {
    gameOverScreen.remove();
}

//Win
function createWinScreen() {
    winScreen = buildPage(`
    <main class="background-gameover">
        <div class="jumbotron">
            <h3 class="win-lose-text">YOU WIN!</h3>
            <p class="lead">Frogger Lightyear is reunited with his family!</p>
            <p class="end-score"></p>
            <div class="scoreboard">
                <h2 class="score-title">High Scores:</h2>   
                <ol class='highscores'>
                    <li class="scoreLi1">Buzz: 0000</li>
                    <li class="scoreLi2">Neil: 0000</li>
                    <li class="scoreLi3">Laika: 0000</li>
                    <li class="scoreLi4">Yuri: 0000</li>
                    <li class="scoreLi5">Valentina: 0000</li>
                </ol>
            </div>
            <button id="restart-btn" class ="button btn btn-danger">PLAY AGAIN?</button>
            <p class="honor">In honor of Frogger</p>
            <p class="mention">Lanette &copy 2020</p>
        </div>
    </main>`);

    bodyIndex.prepend(winScreen);

    let winRestartBtn = winScreen.querySelector('#restart-btn');

    winRestartBtn.addEventListener('click', function() {
        winSound.pause();
        removeWinScreen();
        createSplashScreen();
    });      
}

function removeWinScreen() {
    winScreen.remove();
}
