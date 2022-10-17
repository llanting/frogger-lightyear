export default `
    <main class="splashScreen">
        <div class="splashScreen__title">
            <button class="splashScreen__music-toggle"><img src="./images/musicBtn.png"></button>
            <h1 id="animate-title" class="splashScreen__h1">
                <span class="animate-0">F</span>
                <span class="animate-1">r</span>
                <span class="animate-2">o</span>
                <span class="animate-3">g</span>
                <span class="animate-4">g</span>
                <span class="animate-5">e</span>
                <span class="animate-6">r</span>
                &nbsp;Lightyear
            </h1>
        </div>
        <p class="splashScreen__lead">Frogger has been on an amazing space-adventure. Help him get home safe by eating your way through aliens and visiting planets. But watch out for asteroids and that black hole...</p>
        <div>
            <h3 class="splashScreen__h3">Keys</h3>
            <ul>
                <li>Arrow Up: Up</li>
                <li>Arrow Down: Down</li>
                <li>Arrow Left: Left</li>
                <li>Arrow Right: Right</li>
            </ul>
        </div>
        <input id="name-input" type='text' placeholder="What is your name?" class="splashScreen__name-input">
        <div class="splashScreen__button-container">
            <button id="start-btn" class="splashScreen__start-button button">START</button>
            <img class="splashScreen__image" src="./images/froggerLY.jpeg" alt='Frogger Lightyear'>
        </div>
    </main>`;
