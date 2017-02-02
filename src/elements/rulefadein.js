export default class RuleFadeIn {
	/**
	 * options = {
	 * 	x: Number, 
	 * 	y: Number, 
	 * 	fadeSpeed: Number, 
	 * 	text: String, 
	 * 	textSize: Number, 
	 * 	textColor: String
	 * }
	 */
	constructor(options) {
		options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.text = options.text || '';
		this.font = {
			size: options.textSize || 25,
			color: options.textColor || '#CDCDCD'
		};
		this.alpha = 0;
		this.done = false;
		this.speed = options.fadeSpeed || 1;
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