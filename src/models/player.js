import Core from '../core';
import { InputManager } from '../managers';
import { Word } from '../models';
import { Alignment, Rectangle, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class Player {
    constructor(playerNumber, rect) {
        this.id = playerNumber;
        const x = (this.id % 2) * rect.centerX;
        this.rect = new Rectangle(x, 0, rect.centerX, rect.centerY);
        if (this.id === 0 || this.id === 3) {
            this.rect.y = (this.id % 2) * rect.centerY;
        } else if (this.id === 2) {
            this.rect.y = rect.centerY;
        }
        this.rect.centerX += this.rect.x;
        this.rect.centerY += this.rect.y;
        this.currentWord = null;
        this.mode = 'normal';
        this.score = 0;

    }
    getColor(index, tint) {
        const tints = ['lightest', 'light', 'regular'];
        if ((index > 3 || index < 0)) {
            return '';
        }
        const colors = ['reds', 'blues', 'yellows', 'greens'];
        const category = COLORS[colors[index]];
        const categoryKeys = Object.keys(category);
        if (!categoryKeys.includes(tint)) {
            return '';
        }
        return category[tint];
    }
    setWord(newWord) {
        this.currentWord = new Word(newWord, this.rect);
    }
    update() {
        if (this.mode !== 'click') {
            InputManager.get().keyHandle(this.currentWord);
        }
        if (this.currentWord.solved) {
            const instance = Core.get();
            const currentLevel = instance.level;
            this.setWord(currentLevel.randomWordFromList());
            this.score += 100;
        }
    }
    draw(ctx) {
        ctx = setContextProperties(ctx, {
            fillStyle: this.getColor(this.id, 'lightest')
        });
        ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        this.currentWord.draw(ctx, this.getColor(this.id, 'light'), this.getColor(this.id, 'regular'));
        ctx = setContextProperties(ctx, {
            fillStyle: COLORS.grays['67'],
            font: 'normal 16pt Raleway Light',
            textAlign: Alignment.right
        });
        const x = this.rect.width * ((this.id % 2) + 1) - 25;
        const y = this.rect.height * ((this.id > 1) + 1) - 25;
        const scoreRect = { x, y };
        ctx.fillText(this.score, scoreRect.x, scoreRect.y);
    }
}