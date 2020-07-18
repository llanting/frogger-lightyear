function buildPage(html) {
    let div = document.createElement('div');

    div.innerHTML = html;

    return div.children[0];

}

function main() {
    let bodyIndex = document.querySelector('body');
    let splashScreen;
    let gameScreen;
    let gameOverScreen;
    
    function createSplashScreen() {
        splashScreen = buildPage(`
            <main class="splashScreen">
                <div class="title jumbotron">
                    <h1 class="display-4">Frogger Lightyear</h1>
                    <p class="lead">Frogger has been on an amazing space-adventure. Reach the top and help him get home safe. But watch out for asteroids and that black hole...</p>
                    <div>
                        <h3 class="keyHead">Keys</h3>
                        <ul class='keys'>
                            <li>Arrow Up = Up</li>
                            <li>Arrow Down = Down</li>
                            <li>Arrow Left = Left</li>
                            <li>Arrow Right = Right</li>
                        </ul>
                    </div>
                    <div class="mainSplash">
                        <button id="start-btn" class ="button btn btn-danger">START</button>
                        <img class="frogLY" src="images/froggerLY.jpeg" alt='Frogger Lightyear'>
                </div>
            </main>`);

        bodyIndex.prepend(splashScreen);

        let startBtn = splashScreen.querySelector('#start-btn');

        let startMusic = new Audio('/music/coinin.wav');

        startBtn.addEventListener('click', function() {
            startMusic.volume = 0.1;
            startMusic.play();
            removeSplashScreen();
            createGameScreen();
            start();
        });

    };

    function removeSplashScreen() {
        splashScreen.remove();
    }

    function createGameScreen() {
        gameScreen = buildPage(`
        <main>
            <div class='score-lives'>
                <span class='score'>Score:</span>
                <span class='score'>Lives:</span>
                <img src="images/life.png" alt='life' class="lives">
                <img src="images/life.png" alt='life' class="lives">
                <img src="images/life.png" alt='life' class="lives">
            </div> 
            <div class="canvas-container">
                <canvas id='game-canvas' width="450" height="600"></canvas>
            </div>
            <button id="go-btn" class ="button">PLAY AGAIN?</button>
        </main>`);
        
        bodyIndex.prepend(gameScreen);

        let goBtn = gameScreen.querySelector('#go-btn');

        goBtn.addEventListener('click', function() {
            removeGameScreen();
            createGOScreen();
        });

        return gameScreen;
    };

    function removeGameScreen() {
        gameScreen.remove();
    }

    function createGOScreen() {
        gameOverScreen = buildPage(`
        <main>
            <div class="jumbotron">
                <h3>GAME OVER!</h3>
                <p>Frogger Lightyear floats in space for ever...</p>
            </div> 
            <div class="main">
                <button id="restart-btn" class ="button">PLAY AGAIN?</button>
                <p>In honor of Frogger</p>
                <p>Lanette &copy 2020</p>
            </div>
        </main>`);

        bodyIndex.prepend(gameOverScreen);

        let restartBtn = gameOverScreen.querySelector('#restart-btn');

        restartBtn.addEventListener('click', function() {
            removeGOScreen();
            createSplashScreen();
        });
        return gameOverScreen;
    };

    function removeGOScreen() {
        gameOverScreen.remove();
    }

    createSplashScreen();

}

window.addEventListener("load", main)

