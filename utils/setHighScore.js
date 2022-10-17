function setHighScore(score, index) {
    if (document.querySelector(`.scoreLi${index + 1}`)) {
        document.querySelector(`.scoreLi${index + 1}`).innerText = `${score.name} : ${score.score}`;
    }
}

export default setHighScore;
