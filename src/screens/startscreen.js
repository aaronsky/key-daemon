import Core from '../core';
import { InputManager } from '../managers';
import { RulesScreen } from '../screens';

export default class StartScreen {
    constructor(centerX, centerY) {
        this.rect = {
            centerX,
            centerY
        };
        this.randomFun = Math.floor((Math.random() * 100));
        this.backgroundColor = '#545252';
        this.textColor = '#CDCDCD';
    }
    end() {
        const instance = Core.get();
        instance.level = new RulesScreen(this.rect.centerX, this.rect.centerY, 10);
    }
    update() {
        if (InputManager.keys[13]) {
            this.end();
        }
    }
    draw(ctx) {
        const height = this.rect.centerY * 2;
        const heightSeg = height / 4;
        const width = this.rect.centerX * 2;

        ctx.fillStyle = '#FDE8E8';
        ctx.fillRect(0, 0, width, heightSeg);

        ctx.fillStyle = '#E7E9F5';
        ctx.fillRect(0, heightSeg, width, heightSeg);

        ctx.fillStyle = '#FEF8DA';
        ctx.fillRect(0, heightSeg * 2, width, heightSeg);

        ctx.fillStyle = '#E3EFD0';
        ctx.fillRect(0, heightSeg * 3, width, heightSeg);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#343434';
        ctx.font = 'normal 72pt Raleway Thin';
        if (this.randomFun == 1) {
            ctx.fillText('Type 4 Diabetes', 20, heightSeg / 2);
        } else {
            ctx.fillText('Key-Daemon', 20, heightSeg / 2);
        }
        ctx.font = 'normal 12pt Raleway Thin';
        ctx.fillStyle = '#242424';
        ctx.fillText('A game by Aaron Sky, Richard Weiss, Doug Watro, and Stephen Garabedian', 20, height - 20);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#343434';
        ctx.font = 'normal 72pt Raleway Thin';
        ctx.fillText('Press Enter', width - 20, heightSeg * 3 - heightSeg / 2);
    }
}