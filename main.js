// function main() {
//     let splashScreen;
//     let gameScreen;
//     let gameOverScreen;

//     function createSplashscreen() {
//         splashScreen = buildDom(`
//             <main>
//                 <div class="title">
//                     <h1>Frogger Lightyear</h1>
//                     <p>Frogger has been on an amazing space-adventure. Reach the top and help him come home safe!</p>
//                     <div>
//                         <h3>Keys</h3>
//                         <ul>
//                             <li>Arrow Up = Up</li>
//                             <li>Arrow Left = Left</li>
//                             <li>Arrow Right = Right</li>
//                         </ul>
//                     </div> 
//                     <button id="start-btn" class ="button">START</button>
//                 </div>
//             </main>`);

//         document.body.appendChild(splashScreen);

//         let startButton = splashScreen.querySelector("#start-btn");

//         startButton.addEventListener("click", function() {
//             startGame();
//         });
//     }

//     function removeSplashScreen() {
//         splashScreen.remove();
//     }

//     function createGamescreen() {
//         gameScreen = buildDom(`
//         <main>
//             <div class='counter'>
//                 <span class='score'>Score:</span>
//                 <span class='score'>Lives:</span>
//                 <img src="life.png" alt='life' class="lives">
//                 <img src="life.png" alt='life' class="lives">
//                 <img src="life.png" alt='life' class="lives">
//             </div> 
//             <div>
//                 <canvas id='gameCanvas' width="450" height="500"></canvas>
//             </div>
//         </main>`);

//         document.body.appendChild(gameScreen);

//         return gameScreen;
    
//     }

//     function removeGameScreen() {
//         gameScreen.remove();
//     }

//     function createGameOverscreen() {
//         gameOverScreen = buildDom(`
//         <main>
//             <div>
//                 <h3>GAME OVER!</h3>
//                 <p>Frogger Lightyear floats in space for ever...</p>
//                 <p>`You scored ${totalScore} points`</p>
//             </div> 
//             <div>
//                 <button id="reset-btn" class ="button">RESTART</button>
//             </div>
//             <div>
//                 <p>In honor of Frogger</p>
//                 <p>Lanette &copy 2020</p>
//             </div>
//         </main>`);

//         document.body.appendChild(gameOverScreen);

//         let resetButton = gameOverScreen.querySelector("#reset-btn");

//         resetButton.addEventListener("click", function() {
//             startGame();
//         });

//     }

//     function removeGameOverScreen() {
//         gameOverScreen.remove();
//     }

//     function startGame() {
//         removeSplashScreen();
//         removeGameOverScreen();

//         game.gameScreen = createGameScreen();

//         game.start();

//         game.gameOverCallback(gameOver);
//     }

//     function gameOver() {
//         removeGameScreen();
//         createGameOverscreen(this.totalScore);
//     }

//     createSplashscreen();

// }

// window.addEventListener("load", "main");



