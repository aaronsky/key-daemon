export default class EndScreen {
    constructor(players, centerX, centerY) {
        this.rect = {
            centerX,
            centerY,
            width: centerX * 2,
            height: centerY * 2
        };

        this.scoreTotal = 0;
        this.scoreBoxSize = [];
        this.players = players.concat().sort((a, b) => {
            if (b.score < a.score) {
                return -1;
            }
            if (b.score > a.score) {
                return 1;
            }
            return 0;
        });
        this.players.forEach((player) => {
            console.log(i + ":Player " + (player.id + 1) + "  Score: " + player.score);
            this.scoreTotal += player.score;
        }).forEach((player) => {
            this.scoreBoxSize[i] = (player.score / this.scoreTotal) * this.rect.height;
            console.log(Math.ceil(this.scoreBoxSize[i]));
        });
    }
    getColor(index) {
        if (index === 0) {
            return '#FDE8E8';
        } else if (index === 1) {
            return '#E7E9F5';
        } else if (index === 2) {
            return '#FEF8DA';
        } else if (index === 3) {
            return '#E3EFD0';
        }
        return null;
    }
    update() {

    }
    draw(ctx) {
        ctx.fillStyle = this.getColor(this.players[0].id);
        ctx.fillRect(0, 0, this.rect.width, this.rect.height);

        ctx.textBaseline = 'middle';

        let boxStart = 0;

        this.players.forEach((player, index, players) => {
            if (this.scoreBoxSize[index] !== 0) {
                const scoreRect = {
                    x: 0,
                    y: boxStart,
                    width: this.rect.width,
                    height: Math.ceil(this.scoreBoxSize[index])
                };
                ctx.fillStyle = this.getColor(player.id);
                ctx.fillRect(0, boxStart, this.rect.width, Math.ceil(this.scoreBoxSize[index]));

                ctx.font = `normal ${Math.ceil(this.scoreBoxSize[index] / 2)}pt Raleway Thin`;
                ctx.textAlign = 'center';
                ctx.fillStyle = '#545454';
                ctx.fillText(player.score, this.rect.centerX, boxStart + Math.ceil(scoreRect.height / 2));

                ctx.textAlign = 'left';
                ctx.font = 'normal 20pt Raleway Thin';

                if (index === 0) {
                    ctx.fillText('Winner', 10, boxStart + 20);
                } else {
                    ctx.fillText('Loser', 10, boxStart + scoreRect.height - 20);
                }
                boxStart += scoreRect.height;
            }
        });
    }
}