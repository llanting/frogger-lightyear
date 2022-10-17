const playMusic = (music, volume) => {
    music.volume = volume ? volume : 0.1;
    music.play();
}

const isMusicPlaying = (music) => {
    return !music.paused;
}

export { playMusic, isMusicPlaying };