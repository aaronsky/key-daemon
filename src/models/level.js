import Core from '../core';
import { EndScreen } from '../screens';
import { LoadSpinner } from '../elements';
import { Player } from '../models';
import { WordManager } from '../managers';

export default class Level {
    constructor(playerCount, centerX, centerY) {
        this.wordList = WordManager.get().generateWords();
        this.rect = {
            width: centerX * 2,
            height: centerY * 2,
            centerX,
            centerY
        };
        this.players = [];
        for (let i = 0; i < playerCount; i++) {
            const player = new Player(i, centerX, centerY);
            player.setWord(this.randomWordFromList());
            this.players.push(player);
        }
        this.timeLeftSpinner = new LoadSpinner({
            radius: this.rect.width / 20,
            time: 60,
            baseColor: '#DCDCDB',
            strokeColor: '#6D6D6D',
            centerX: this.rect.centerX,
            centerY: this.rect.centerY
        });
        this.timeLeftSpinner.isOn(true);
    }
    randomWordFromList() {
        return this.wordList[Math.floor(Math.random() * (this.wordList.length + 1))];
    }
    update() {
        if (this.timeLeftSpinner.isDone()) {
            const instance = Core.get();
            instance.level = new EndScreen(this.players, this.rect.centerX, this.rect.centerY);
        } else {
            this.players.forEach(player => player.update());
            this.timeLeftSpinner.update();
        }
    }
    draw(ctx) {
        this.players.forEach(player => player.draw(ctx));
        this.drawTimer(ctx);
    }
    drawTimer(ctx) {
        const timerAmount = this.rect.width * ((this.timeLeftSpinner.time - this.timeLeftSpinner.elapsedTime) / this.timeLeftSpinner.time);

        ctx.fillStyle = '#8D8D8D';
        ctx.fillRect(0, 0, this.rect.width, 7);
        ctx.fillRect(0, this.rect.height - 7, this.rect.width, this.rect.height);
        ctx.fillStyle = '#DCDCDC';
        ctx.fillRect(0, 0, timerAmount, 7);
        ctx.fillRect(0, this.rect.height - 7, timerAmount, this.rect.height);

        // const grad = ctx.createLinearGradient(timerAmount - 70,0,70,30);
        // grad.addColorStop(0,'#6D6D6D');
        // grad.addColorStop(1,'#DCDCDC');
        // 
        // ctx.rect(timerAmount - 70,0,70,30);
        // ctx.fillStyle = grad;
        // ctx.fill();
    }
}