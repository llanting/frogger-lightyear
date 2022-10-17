import { isMusicPlaying } from "./music.js";

const pauseSplashMusic = (music) => {
    const musicBtn = document.querySelector('.splashScreen__music-toggle');

    // console.log('asd', musicBtn)
    // TODO: pausing not working yet. musicBtn is null
    if (musicBtn) {
        musicBtn.addEventListener('click', function () {
            if (isMusicPlaying(music)) {
                music.pauseMusic();
                return;
            }
            if (!isMusicPlaying(music)) {
                splashMusic.playMusic();
                return;
            }
        })
    }
}

export default pauseSplashMusic;