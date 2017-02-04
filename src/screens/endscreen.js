import { Alignment, Baseline, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class EndScreen {
    constructor(rect, players) {
        this.rect = rect;
        this.scoreTotal = 0;
        this.scoreBoxSize = [];
        this.players = players.concat().sort((a, b) => {
            if (b.score < a.score) {
                return -1;
            } else if (b.score > a.score) {
                return 1;
            }
            return 0;
        });
        this.players.map((player, index) => {
            console.log(index, ':Player', player.id + 1, 'Score:', player.score);
            this.scoreTotal += player.score;
            return player;
        }).forEach((player, index) => {
            this.scoreBoxSize[index] = (player.score / this.scoreTotal) * this.rect.height;
            console.log(Math.ceil(this.scoreBoxSize[index]));
        });
    }
    getColor(index) {
        if (index > 3 || index < 0) {
            return null;
        }
        const colors = ['reds', 'blues', 'yellows', 'greens'];
        return COLORS[colors[index]].lightest;
    }
    update() {

    }
    draw(ctx) {
        ctx.fillStyle = this.getColor(this.players[0].id);
        ctx.fillRect(0, 0, this.rect.width, this.rect.height);

        ctx.textBaseline = Baseline.middle.name;

        let boxStart = 0;
        this.players.forEach((player, index, players) => {
            const scoreSize = this.scoreBoxSize[index];
            if (scoreSize !== 0) {
                const height = Math.ceil(scoreSize);
                const scoreRect = {
                    x: 0,
                    y: boxStart,
                    width: this.rect.width,
                    height: height
                };

                ctx.fillStyle = this.getColor(player.id);
                ctx.fillRect(0, boxStart, this.rect.width, height);

                const halfHeight = Math.ceil(scoreSize / 2);
                ctx = setContextProperties(ctx, {
                    textAlign: Alignment.center,
                    fillStyle: COLORS.grays['54'],
                    font: `normal ${halfHeight}pt Raleway Thin`
                });
                ctx.fillText(player.score, this.rect.centerX, boxStart + Math.ceil(scoreRect.height / 2));

                ctx = setContextProperties(ctx, {
                    textAlign: Alignment.left,
                    font: 'normal 20pt Raleway Thin'
                });
                const text = index === 0 ? 'Winner' : 'Loser';
                const modifier = index === 0 ? 20 : scoreRect.height - 20;
                ctx.fillText(text, 10, boxStart + modifier);
                boxStart += scoreRect.height;
            }
        });
    }
}