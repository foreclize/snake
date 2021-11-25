class ScorePanel {
    score: number = 0;
    level: number = 1;
    scoreElem: HTMLElement;
    levelElem: HTMLElement;

    topLevel: number;
    upScore: number;

    constructor(topLevel: number = 10, upScore: number = 10) {
        this.scoreElem = document.getElementById('score')!;
        this.levelElem = document.getElementById('level')!;
        this.topLevel = topLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.score++;
        this.scoreElem.innerHTML = this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    levelUp() {
        if (this.level < this.topLevel) {
            this.levelElem.innerHTML = ++this.level + '';
        }
    }
}

export default ScorePanel;
