import buildPage from '../utils/buildPage.js';
import splashScreen from '../screens/splashScreen.js';
import gameScreen from '../screens/gameScreen.js';
import gameOverScreen from '../screens/gameOverScreen.js';
import winScreen from '../screens/winScreen.js';
import animateTitle from '../utils/animateTitle.js';
import pauseSplashMusic from '../utils/music/pauseSplashMusic.js';
import getPlayerName from '../utils/getPlayerName.js';
import Game from './gameClass.js';
import { playMusic, isMusicPlaying } from '../utils/music/music.js';

let bodyIndex = document.querySelector('body');
let activeScreen;
let splashMusic = new Audio('./music/splashMusic.mp3');
let startMusic = new Audio('./music/coinin.wav');
let winSound = new Audio('./music/snd_music_victorytheme.ogg');
let bgMusic = new Audio('./music/backgroundmusic.mp3');
bgMusic.loop = true;
let game;

function createScreen(screen, callback) {
    activeScreen = buildPage(screen);
    bodyIndex.prepend(activeScreen);
    if (callback) {
        callback();
    }
}

function removeActiveScreen() {
    activeScreen.remove();
}

// Create splash screen
window.addEventListener("load",
    createScreen(splashScreen, animateSplashScreen())
);

// On click, start game
if (document.getElementById('start-btn')) {
    document.getElementById('start-btn').addEventListener('click', () => startGame());
}

// On restart, open splash screen again
if (document.getElementById('restart-btn')) {
    document.getElementById('restart-btn').addEventListener('click', () => openSplashScreen());
}

function animateSplashScreen() {
    animateTitle();

    playMusic(splashMusic);
    pauseSplashMusic(splashMusic);
}

function startGame() {
    splashMusic.pause();
    playMusic(startMusic);

    const playerName = getPlayerName();
    removeActiveScreen();
    createScreen(gameScreen);

    game = new Game(playerName);
    game.drawCanvas();
}

function openSplashScreen() {
    if (isMusicPlaying(winSound)) {
        winSound.pause();
    }

    removeActiveScreen();
    createScreen(splashScreen);
}

function removeGameScreen() {
    removeActiveScreen();

    bgMusic.pause();
}

function createFinalScreen(result) {
    if (result === 'win') {
        createScreen(winScreen);
    }
    if (result === 'lose') {
        createScreen(gameOverScreen);
    }
}

function playWinSound() {
    playMusic(winSound);
}

function playBGMusic() {
    playMusic(bgMusic);
}

export { removeGameScreen, createFinalScreen, playWinSound, playBGMusic };