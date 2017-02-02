export default class Word {
    constructor(word, x, y) {
        this.word = word || '';
        this.remainingWord = this.word;
        this.completed = '';
        this.center = {
            x: x || 400, //debug values
            y: y || 300
        };
        this.solved = false;
    }
    update(keys) {
        const nextLetter = this.remainingWord.charAt(0).toUpperCase();
        if (keys[nextLetter]) {
            this.completed += this.remainingWord.charAt(0);
            this.remainingWord = this.remainingWord.substr(1);
        }
        if (this.remainingWord.length === 0 && this.completed === this.word) {
            console.log('word done');
            this.solved = true;
        }
    }
    draw(ctx, completedColor, selectedColor) {
        const fontSize = '40';
        ctx.font = 'normal ' + fontSize + 'pt Raleway Thin';
        const remWordSize = ctx.measureText(this.remainingWord).width;
        ctx.font = 'normal ' + fontSize + 'pt Raleway Thin';
        const comWordSize = ctx.measureText(this.completed).width;
        ctx.font = 'normal ' + fontSize + 'pt Raleway Thin';
        const letterSize = ctx.measureText(this.remainingWord.charAt(0)).width;
        const wordSize = remWordSize + comWordSize;
        const lineY = 32;
        
        ctx.textAlign = "left";
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#A7A7A7';
        ctx.font = 'normal ' + fontSize + 'pt Raleway Thin';
        ctx.fillText(this.completed, this.center.x - (wordSize / 2), this.center.y);
        ctx.fillStyle = '#000';
        ctx.font = 'normal ' + fontSize + 'pt Raleway Thin';
        ctx.fillText(this.remainingWord, this.center.x - (wordSize / 2) + comWordSize, this.center.y);
        
        ctx.strokeStyle = completedColor;
        ctx.beginPath();
        ctx.moveTo(this.center.x - (wordSize / 2), this.center.y + lineY);
        ctx.lineTo(this.center.x - (wordSize / 2) + comWordSize, this.center.y + lineY);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.strokeStyle = selectedColor;
        ctx.beginPath();
        ctx.moveTo(this.center.x - (wordSize / 2) + comWordSize, this.center.y + lineY);
        ctx.lineTo(this.center.x - (wordSize / 2) + comWordSize + letterSize, this.center.y + lineY);
        ctx.lineWidth = 4;
        ctx.stroke();
        
        ctx.strokeStyle = '#9A9A9A';
        ctx.beginPath();
        ctx.moveTo(this.center.x - (wordSize / 2) + comWordSize + letterSize, this.center.y + lineY);
        ctx.lineTo(this.center.x + (wordSize / 2), this.center.y + lineY);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.textAlign = "center";
    }
    shuffle() {
        // call this when it's time to shuffle
    }
}