import { Alignment, Baseline, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class Word {
    constructor(word, rect) {
        this.word = word || '';
        this.rect = rect;
        this.remainingWord = this.word;
        this.completed = '';
        this.solved = false;
    }
    isCompleted() {
        return this.remainingWord.length === 0 && this.completed === this.word;
    }
    update(keys) {
        const nextLetter = this.remainingWord.charAt(0).toUpperCase();
        if (keys[nextLetter]) {
            this.completed += this.remainingWord.charAt(0);
            this.remainingWord = this.remainingWord.substr(1);
        }
        if (this.isCompleted()) {
            console.log('word done');
            this.solved = true;
        }
    }
    draw(ctx, completedColor, selectedColor) {
        const font = `normal 40pt Raleway Thin`;
        ctx.font = font;
        const remWordSize = ctx.measureText(this.remainingWord).width;
        const comWordSize = ctx.measureText(this.completed).width;
        const letterSize = ctx.measureText(this.remainingWord.charAt(0)).width;
        const wordSize = remWordSize + comWordSize;
        
        ctx = setContextProperties(ctx, {
            textAlign: Alignment.left,
            textBaseline: Baseline.middle,
            fillStyle: COLORS.grays['A7'],
            font
        });
        ctx.fillText(this.completed, this.rect.centerX - (wordSize / 2), this.rect.centerY);
        ctx = setContextProperties(ctx, {
            fillStyle: COLORS.black,
            font
        });
        ctx.fillText(this.remainingWord, this.rect.centerX - (wordSize / 2) + comWordSize, this.rect.centerY);
        
        ctx = setContextProperties(ctx, {
            strokeStyle: completedColor,
            lineWidth: 2
        });
        const lineY = 32;
        ctx.beginPath();
        ctx.moveTo(this.rect.centerX - (wordSize / 2), this.rect.centerY + lineY);
        ctx.lineTo(this.rect.centerX - (wordSize / 2) + comWordSize, this.rect.centerY + lineY);
        ctx.stroke();
        
        ctx = setContextProperties(ctx, {
            strokeStyle: selectedColor,
            lineWidth: 4
        });
        ctx.beginPath();
        ctx.moveTo(this.rect.centerX - (wordSize / 2) + comWordSize, this.rect.centerY + lineY);
        ctx.lineTo(this.rect.centerX - (wordSize / 2) + comWordSize + letterSize, this.rect.centerY + lineY);
        ctx.stroke();
        
        ctx = setContextProperties(ctx, {
            strokeStyle: COLORS.grays['9A'],
            lineWidth: 2
        });
        ctx.beginPath();
        ctx.moveTo(this.rect.centerX - (wordSize / 2) + comWordSize + letterSize, this.rect.centerY + lineY);
        ctx.lineTo(this.rect.centerX + (wordSize / 2), this.rect.centerY + lineY);
        ctx.stroke();
        
        ctx.textAlign = Alignment.center.name;
    }
    shuffle() {
        // call this when it's time to shuffle
    }
}