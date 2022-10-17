function setHighScore(score, index) {
    const SCORE_LI_ITEM = document.querySelector(`.scoreLi${index + 1}`)
    if (SCORE_LI_ITEM) {
        SCORE_LI_ITEM.innerText = `${score.name} : ${score.score}`;
    }
}

export default setHighScore;
