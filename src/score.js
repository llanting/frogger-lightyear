import setHighScore from '../utils/setHighScore.js'

export default class Score {
    constructor(startScore) {
        this.score = startScore;
    }

    addScore(amount) {
        this.score += amount;
    }

    removeScore(amount) {
        this.score -= amount;
    }

    isZero() {
        return this.score === 0;
    }

    getScore() {
        return this.score;
    }

    setFinalScore() {
        const FINAL_SCORE = document.querySelector('.end-score');

        if (FINAL_SCORE) {
            FINAL_SCORE.innerText = `Your score: ${this.score}`;
        }
    }

    showScoreDuringPlay = () => {
        const SCORE = document.querySelector('.score-num');

        if (SCORE) {
            SCORE.innerText = `Score: ${this.score}`;
        }
    }

    getHighScore = (playerName) => {
        const result = {
            name: playerName,
            score: this.score
        };

        const savedScores = localStorage.getItem('highscore') || '[]';

        let newHighscores = [...JSON.parse(savedScores), result];

        newHighscores.sort((a, b) => b.score - a.score).slice(0, 5);

        localStorage.setItem('highscore', JSON.stringify(newHighscores));

        newHighscores.forEach((score, index) => {
            setHighScore(score, index);
        })
    }
}