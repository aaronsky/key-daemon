import Core from '../core';
import { EndScreen } from '../screens';
import { LoadSpinner } from '../elements';
import { Player } from '../models';
import { WordManager } from '../managers';
import { COLORS } from '../utilities/constants';

export default class Level {
    constructor(rect, playerCount) {
        this.rect = rect;
        this.wordList = WordManager.get().generateWords();
        this.players = [];
        for (let i = 0; i < playerCount; i++) {
            const player = new Player(i, this.rect);
            player.setWord(this.randomWordFromList());
            this.players.push(player);
        }
        this.timeLeftSpinner = new LoadSpinner({
            radius: this.rect.width / 20,
            time: 60,
            baseColor: COLORS.grays['DCB'],
            strokeColor: COLORS.grays['6D'],
            centerX: this.rect.centerX,
            centerY: this.rect.centerY
        });
        this.timeLeftSpinner.start();
    }
    randomWordFromList() {
        return this.wordList[Math.floor(Math.random() * (this.wordList.length + 1))];
    }
    update() {
        if (this.timeLeftSpinner.isDone()) {
            const instance = Core.get();
            instance.level = new EndScreen(this.rect, this.players);
            return;
        }
        this.players.forEach(player => player.update());
        this.timeLeftSpinner.update();
    }
    draw(ctx) {
        this.players.forEach(player => player.draw(ctx));
        this.drawTimer(ctx);
    }
    drawTimer(ctx) {
        const timerAmount = this.rect.width * ((this.timeLeftSpinner.time - this.timeLeftSpinner.elapsedTime) / this.timeLeftSpinner.time);
        ctx.fillStyle = COLORS.grays['8D'];
        ctx.fillRect(0, 0, this.rect.width, 7);
        ctx.fillRect(0, this.rect.height - 7, this.rect.width, this.rect.height);
        ctx.fillStyle = COLORS.grays['DC'];
        ctx.fillRect(0, 0, timerAmount, 7);
        ctx.fillRect(0, this.rect.height - 7, timerAmount, this.rect.height);
    }
}