import { InputManager } from '../managers';
import { Word } from '../models';
import { Core } from '../core';

export default class Player {
    constructor(playerNumber, centerX, centerY) {
        centerX = centerX || window.innerWidth * 0.5;
        centerY = centerY || window.innerHeight * 0.5;

        this.id = num;
        this.currentWord = null;
        this.mode = 'normal';

        let y;
        if (this.id === 0) {
            this.color = "#FDE8E8";
            this.comColor = "#F59A9C";
            this.selColor = "#F05657";
            y = (this.id % 2) * centerY;
        } else if (this.id === 1) {
            this.color = "#E7E9F5";
            this.comColor = "#9E9BCC";
            this.selColor = "#5960AB";
            y = 0;
        } else if (this.id === 2) {
            this.color = "#FEF8DA";
            this.comColor = "#E29C35";
            this.selColor = "#BB842B";
            y = centerY;
        } else if (this.id === 3) {
            this.color = "#E3EFD0";
            this.comColor = "#9FCB9D";
            this.selColor = "#3AAE49";
            y = (this.id % 2) * centerY;
        }

        const x = (this.id % 2) * centerX;
        this.rect = {
            x,
            y,
            width: centerX,
            height: centerY,
            centerX: x + (centerX * 0.5),
            centerY: y + (centerY * 0.5)
        };
        this.score = 0;
        //this.color = id << '#000';
    }
    setWord(newWord) {
        this.currentWord = new Word(newWord, this.rect.centerX, this.rect.centerY);
    }
    update() {
        if (this.mode !== 'click') {
            InputManager.keyHandle(this.currentWord);
        }
        if (this.currentWord.solved) {
            const instance = Core.get();
            const currentLevel = instance.level;
            this.setWord(currentLevel.randomWordFromList());
            this.score += 100;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        this.currentWord.draw(ctx, this.comColor, this.selColor);
        ctx.fillStyle = '#676767';
        ctx.font = 'normal 16pt Raleway Light';
        ctx.textAlign = "right";
        //super hardcoded, switch to modulo at some point
        let scoreRect;
        if (this.id === 0) {
            scoreRect = {
                x: this.rect.width - 25,
                y: this.rect.height - 25
            };
        } else if (this.id === 1) {
            scoreRect = {
                x: this.rect.width * 2 - 25,
                y: this.rect.height - 25
            };
        } else if (this.id === 2) {
            scoreRect = {
                x: this.rect.width - 25,
                y: this.rect.height * 2 - 25
            };
        } else if (this.id === 3) {
            scoreRect = {
                x: this.rect.width * 2 - 25,
                y: this.rect.height * 2 - 25
            };
        } else {
            scoreRect = {
                x: 0,
                y: 0
            };
        }
        ctx.fillText(this.score, scoreRect.x, scoreRect.y);
        //////////// 
        //ScoreBar//
        ////////////
    }
}