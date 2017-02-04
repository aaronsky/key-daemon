import Core from '../core';
import { LoadSpinner, RuleFadeIn } from '../elements';
import { Level } from '../models';
import { Alignment, Baseline, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class RulesScreen {
    constructor(rect, time) {
        this.rect = rect;
        this.time = time;
        this.spinner = new LoadSpinner({
            radius: 200,
            time: time,
            baseColor: COLORS.grays['DCB'],
            strokeColor: COLORS.grays['6D'],
            centerX: this.rect.width - 230,
            centerY: this.rect.height - 230
        });
        this.spinner.start();
        this.rules = [
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
            instance.level = new Level(this.rect, 4);
            return;
        }
        this.rules.forEach(rule => rule.update(1));
        this.spinner.update();
    }
    draw(ctx) {
        ctx.fillStyle = COLORS.grays['542'];
        ctx.fillRect(0, 0, this.rect.width, this.rect.height);

        ctx = setContextProperties(ctx, {
            textAlign: Alignment.left,
            textBaseline: Baseline.hanging,
            font: 'normal 30pt Raleway Light'
        })
        this.rules.forEach(rule => rule.draw(ctx));
        this.spinner.draw(ctx);
    }
}