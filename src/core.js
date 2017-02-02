import { StartScreen } from './screens';

let instance;
export default class Core {
    constructor() {
        this.canvas = document.getElementById('game-stage');
        this.context = canvas.getContext('2d');
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const playerCount = 4;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        this.level = new StartScreen(centerX, centerY);
    }
    static get() {
        if (!instance) {
            instance = new Core();
            instance.render.call();
        }
        return instance;
    }
    render() {
        this.level.update();
        this.level.draw(this.context);
        window.requestAnimationFrame(() => this.render());
    }
}