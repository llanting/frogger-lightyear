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
            <main>
                <div class="title">
                    <h1>Frogger Lightyear</h1>
                    <p>Frogger has been on an amazing space-adventure. Reach the top and help him come home safe!</p>
                    <div>
                        <h3>Keys</h3>
                        <ul>
                            <li>Arrow Up = Up</li>
                            <li>Arrow Left = Left</li>
                            <li>Arrow Right = Right</li>
                        </ul>
                    </div> 
                    <button id="start-btn" class ="button">START</button>
                </div>
            </main>`);

        bodyIndex.appendChild(splashScreen);

        let startBtn = splashScreen.querySelector('#start-btn');

        startBtn.addEventListener('click', function() {
            removeSplashScreen();
            createGameScreen();
        });

    };

    function removeSplashScreen() {
        splashScreen.remove();
    }

    function createGameScreen() {
        gameScreen = buildPage(`
        <main>
            <div class='counter'>
                <span class='score'>Score:</span>
                <span class='score'>Lives:</span>
                <img src="images/life.png" alt='life' class="lives">
                <img src="images/life.png" alt='life' class="lives">
                <img src="images/life.png" alt='life' class="lives">
            </div> 
            <div>
                <canvas id='gameCanvas' width="450" height="500"></canvas>
            </div>
            <button id="gameover-btn" class ="button">gameover</button>
        </main>`);
        
        bodyIndex.appendChild(gameScreen);

        let gameOverBtn = gameScreen.querySelector('#gameover-btn');

        gameOverBtn.addEventListener('click', function() {
            removeGameScreen();
            createGOScreen();
        })

    };

    function removeGameScreen() {
        gameScreen.remove();
    }

    function createGOScreen() {
        gameOverScreen = buildPage(`
        <main>
            <div>
                <h3>GAME OVER!</h3>
                <p>Frogger Lightyear floats in space for ever...</p>
                
            </div> 
            <div>
                <button id="restart-btn" class ="button">RESTART</button>
            </div>
            <div>
                <p>In honor of Frogger</p>
                <p>Lanette &copy 2020</p>
            </div>
        </main>`);

        bodyIndex.appendChild(gameOverScreen);

        let restartBtn = gameOverScreen.querySelector('#restart-btn');

        restartBtn.addEventListener('click', function() {
            removeGOScreen();
            createSplashScreen();
        });

    };

    function removeGOScreen() {
        gameOverScreen.remove();
    }

    createSplashScreen();

}

window.addEventListener("load", main)