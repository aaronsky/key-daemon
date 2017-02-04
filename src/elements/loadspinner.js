
import { Alignment, Baseline, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class LoadSpinner {
    constructor({ radius, time, baseColor, strokeColor, centerX, centerY }, onCompletion) {
        this.thisTime = Date.now();
        this.startTime = this.thisTime;
        this.time = time;
        this.elapsedTime = this.time;
        this.enabled = false;
        this.done = false;
        this.circle = {
            radius,
            centerX,
            centerY
        };
        this.strokeColor = [baseColor, strokeColor];
        this.onCompletion = onCompletion || function () { };
    }
    start() {
        this.setEnabled(true);
    }
    setEnabled(enabled) {
        this.enabled = !!enabled;
        if (this.enabled) {
            this.thisTime = Date.now();
            this.startTime = this.thisTime;
        }
    }
    isDone() {
        return this.done;
    }
    update() {
        if (this.enabled) {
            this.lastTime = this.thisTime;
            this.thisTime = Date.now();
        }

        this.elapsedTime = this.time - (this.enabled && ((this.thisTime - this.startTime) / 1000));
        if (Math.ceil(this.elapsedTime) <= 0) {
            this.elapsedTime = 0;
            this.done = true;
            this.onCompletion.call();
        }
    }
    draw(ctx) {
        // Main circle
        ctx = setContextProperties(ctx, {
            textAlign: Alignment.center,
            textBaseline: Baseline.middle,
            fillStyle: COLORS.grays['6D'],
            font: `normal ${this.circle.radius}pt Lato Light`
        });
        ctx.beginPath();
        ctx.arc(this.circle.centerX, this.circle.centerY, this.circle.radius, 0, Math.PI * 2, false);
        ctx.fill();

        // Arc with the Color of the previous loading bar
        const arcDecimal = Math.ceil(this.elapsedTime) - this.elapsedTime;
        const strokeSize = this.circle.radius / 20;
        ctx = setContextProperties(ctx, {
            lineWidth: strokeSize,
            strokeStyle: this.strokeColor[(Math.ceil(this.elapsedTime) + 1) % 2]
        });
        ctx.beginPath();
        ctx.arc(this.circle.centerX, this.circle.centerY, this.circle.radius - strokeSize * 0.5, Math.PI * -0.5, Math.PI * 2 * arcDecimal - Math.PI * 0.5, true);
        ctx.stroke();

        ctx = setContextProperties(ctx, {
            lineWidth: strokeSize,
            strokeStyle: this.strokeColor[Math.ceil(this.elapsedTime) % 2]
        });
        ctx.beginPath();
        ctx.arc(this.circle.centerX, this.circle.centerY, this.circle.radius - strokeSize * 0.5, Math.PI * -0.5, Math.PI * 2 * arcDecimal - Math.PI * 0.5, false);
        ctx.stroke();

        ctx.fillStyle = this.strokeColor[0];
        ctx.fillText(Math.ceil(this.elapsedTime), this.circle.centerX, this.circle.centerY);
    }
}