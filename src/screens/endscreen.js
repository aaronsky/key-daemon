export default class EndScreen {
    constructor(scores, centerX, centerY) {
        this.scores = scores || [];
        this.rect = {
            centerX,
            centerY,
            width: centerX * 2,
            height: centerY * 2
        };
        this.order = [-1, -1, -1, -1];
        for (var i = 0; i < 4; i++) {
            var max = -1;
            var player = -1;
            for (var j = 0; j < 4; j++) {
                if (this.scores[j] > max) {
                    if (this.order[0] != j && this.order[1] != j && this.order[2] != j && this.order[3] != j) {
                        player = j;
                        max = this.scores[j];
                    }
                }
            }
            this.order[i] = player;
        }

        for (var i = 0; i < 4; i++) {
            console.log(i + ":Player " + (this.order[i] + 1) + "  Score: " + this.scores[this.order[i]]);
        }

        this.sizeScores = [];
        this.scoreTotal = 0;

        for (var i = 0; i < this.scores.length; i++) {
            this.scoreTotal += this.scores[i];
        }

        this.scoreBoxSize = [];

        for (var i = 0; i < this.scores.length; i++) {
            this.scoreBoxSize[i] = (this.scores[this.order[i]] / this.scoreTotal) * this.rect.height;
            console.log(Math.ceil(this.scoreBoxSize[i]));
        }
    }
    getColor(index) {
        if (index === 0) {
            return '#FDE8E8';
        } else if (index === 1) {
            return "#E7E9F5";
        } else if (index === 2) {
            return "#FEF8DA";
        } else if (index === 3) {
            return "#E3EFD0";
        }
        return null;
    }
    update() {

    }
    draw(ctx) {
        ctx.fillStyle = this.getColor(this.order[0]);
        ctx.fillRect(0, 0, this.rect.width, this.rect.height);

        ctx.textBaseline = 'middle';

        let boxStart = 0;

        this.scores.forEach((score, index, scores) => {
            if (this.scoreBoxSize[index] !== 0) {
                const scoreRect = {
                    x: 0,
                    y: boxStart,
                    width: this.rect.width,
                    height: Math.ceil(this.scoreBoxSize[index])
                };
                ctx.fillStyle = this.getColor(this.order[index]);
                ctx.fillRect(0, boxStart, this.rect.width, Math.ceil(this.scoreBoxSize[index]));

                ctx.font = 'normal ' + Math.ceil(this.scoreBoxSize[index] / 2) + 'pt Raleway Thin';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#545454';
                ctx.fillText(scores[this.order[index]], this.rect.centerX, boxStart + Math.ceil(scoreRect.height / 2));

                ctx.textAlign = 'left';
                ctx.font = 'normal 20pt Raleway Thin';

                if (index === 0) {
                    ctx.fillText("Winner", 10, boxStart + 20);
                } else {
                    ctx.fillText("Loser", 10, boxStart + scoreRect.height - 20);
                }
                boxStart += scoreRect.height;
            }
        });
    }
}