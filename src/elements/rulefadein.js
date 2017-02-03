export default class RuleFadeIn {
	constructor({ x = 0, y = 0, text = '', textSize = 25, textColor = '#CDCDCD', fadeSpeed = 1 }) {
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
		ctx.textAlign = 'left';
		ctx.textBaseline = 'hanging';
		ctx.font = 'normal ' + this.font.size + 'pt Raleway Light';
		const colorWidth = ctx.measureText('Pick A Color').width + 50;

		ctx.globalAlpha = this.alpha / 255;
		ctx.fillStyle = this.font.color;
		ctx.fillText(this.text, this.x, this.y);
		ctx.globalAlpha = 1;
	}
}