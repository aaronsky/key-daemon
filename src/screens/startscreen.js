import Core from '../core';
import { InputManager } from '../managers';
import { RulesScreen } from '../screens';
import { Alignment, Baseline, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class StartScreen {
    constructor(rect) {
        this.rect = rect;
        this.backgroundColor = COLORS.grays['542'];
        this.textColor = COLORS.grays['CD'];
    }
    end() {
        const instance = Core.get();
        instance.level = new RulesScreen(this.rect, 10);
    }
    update() {
        if (InputManager.get().keys[13]) {
            this.end();
        }
    }
    draw(ctx) {
        const colorSegments = [
            COLORS.reds.lightest, 
            COLORS.blues.lightest, 
            COLORS.yellows.lightest, 
            COLORS.greens.lightest
        ];
        const heightSeg = this.rect.height / colorSegments.length;
        colorSegments.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(0, heightSeg * index, this.rect.width, heightSeg);
        });

        ctx = setContextProperties(ctx, {
            textAlign: Alignment.left,
            textBaseline: Baseline.middle,
            fillStyle: COLORS.grays['34'],
            font: 'normal 72pt Raleway Thin'
        });
        ctx.fillText('Key Daemon', 20, heightSeg / 2);

        ctx = setContextProperties(ctx, {
            fillStyle: COLORS.grays['24'],
            font: 'normal 12pt Raleway Thin'
        });
        ctx.fillText('A game by Aaron Sky, Richard Weiss, Doug Watro, and Stephen Garabedian', 20, this.rect.height - 20);

        ctx = setContextProperties(ctx, {
            textAlign: Alignment.right,
            fillStyle: COLORS.grays['34'],
            font: 'normal 72pt Raleway Thin'
        });
        ctx.fillText('Press Enter', this.rect.width - 20, heightSeg * 3 - heightSeg / 2);
    }
}