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
       if (document.querySelector('.end-score')) {
            document.querySelector('.end-score').innerText = `Your score: ${this.score}`;
        }
    }

    showScoreDuringPlay = () => {
        if (document.querySelector('.score-num')) {
            document.querySelector('.score-num').innerText = `Score: ${this.score}`;
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