import { Alignment, Baseline, setContextProperties } from '../utilities/canvas';
import { COLORS } from '../utilities/constants';

export default class RuleFadeIn {
	constructor({ x = 0, y = 0, text = '', textSize = 25, textColor = COLORS.grays['CD'], fadeSpeed = 1 }) {
		this.x = x;
		this.y = y;
		this.text = text;
		this.font = {
			size: textSize,
			color: textColor
		};
		this.alpha = 0;
		this.done = false;
		this.speed = fadeSpeed;
	}
	update(dt) {
		if (!this.done) {
			this.alpha += this.speed * dt;
			if (this.alpha > 255) {
				this.done = true;
			}
		}
	}
	draw(ctx) {
		ctx = setContextProperties(ctx, {
			textAlign: Alignment.left,
			textBaseline: Baseline.hanging,
			fillStyle: this.font.color,
			font: `normal ${this.font.size}pt Raleway Light`,
			globalAlpha: this.alpha / 255
		});
		ctx.fillText(this.text, this.x, this.y);
		ctx.globalAlpha = 1;
	}
}