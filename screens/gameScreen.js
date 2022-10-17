export default `
    <main class="gamescreen">
        <div class='score-lives'>
            <span class='score score-num'>Score:</span>
            <span class='score'>Lives:</span>
            <img src="./images/frogger.png" alt='life' class="lives life">
            <img src="./images/frogger.png" alt='life' class="lives life">
            <img src="./images/frogger.png" alt='life' class="lives life">
        </div>
        <div class="canvas-container">
            <canvas id='game-canvas' width="500" height="650"></canvas>
        </div>
    </main>`;