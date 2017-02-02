import Core from '../core';
import { LoadSpinner, RuleFadeIn } from '../elements';
import { Level } from '../models';

export default class RulesScreen {
    constructor(centerX, centerY, time) {
        this.rect = {
            width: centerX * 2,
            height: centerY * 2,
            centerX,
            centerY
        };
        this.backgroundColor = '#545252';
        this.textColor = '#CDCDCD';
        this.time = time;
        this.spinner = new LoadSpinner({
            radius: 200,
            time: time,
            baseColor: '#DCDCDB',
            strokeColor: '#6D6D6D',
            centerX: this.rect.width - 230,
            centerY: this.rect.height - 230
        });
        this.spinner.isOn(true);
        this.rulesTexts = [
            new RuleFadeIn({
                x: 50,
                y: 50,
                fadeSpeed: 3,
                text: 'Pick a Color'
            }),
            new RuleFadeIn({
                x: 50,
                y: 150,
                fadeSpeed: 3,
                text: 'Type Your Word'
            }),
            new RuleFadeIn({
                x: 50,
                y: 250,
                fadeSpeed: 3,
                text: 'Use One Finger'
            }),
            new RuleFadeIn({
                x: 50,
                y: 350,
                fadeSpeed: 3,
                text: 'You Have Two Minutes'
            })
        ];
    }
    update() {
        if (this.spinner.isDone()) {
            const instance = Core.get();
            instance.level = new Level(4, this.rect.centerX, this.rect.centerY);
        } else {
            this.rulesTexts.forEach((rulesText) => {
                rulesText.update(1);
                return rulesText.done;
            });
            this.spinner.update();
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.rect.width, this.rect.height);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'hanging';
        const textSize = 30;
        const colorWidth = ctx.measureText("Pick A Color").width + 50;
        ctx.font = 'normal ' + textSize + 'pt Raleway Light';

        this.rulesTexts.forEach((rulesText) => {
            rulesText.draw(ctx);
        });
        this.spinner.draw(ctx);
    }
}