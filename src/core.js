import { StartScreen } from './screens';
import { Alignment, Baseline, Rectangle, setContextProperties } from './utilities/canvas';

let instance;
export default class Core {
    constructor() {
        const canvas = document.getElementById('game-stage');
        let context = canvas.getContext('2d');
        context = setContextProperties(context, { 
            textAlign: Alignment.center, 
            textBaseline: Baseline.middle 
        });
        this.context = context;
        this.canvas = context.canvas;
        const canvasRect = new Rectangle(0, 0, this.canvas.width, this.canvas.height);
        this.level = new StartScreen(canvasRect);
    }
    static get() {
        if (!instance) {
            instance = new Core();
            instance.render();
        }
        return instance;
    }
    render() {
        this.level.update();
        this.level.draw(this.context);
        window.requestAnimationFrame(() => this.render());
    }
}