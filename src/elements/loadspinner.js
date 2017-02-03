export default class LoadSpinner {
    /**
     * options = {
     *  radius: Number,
     *  time: Number,
     *  baseColor: String,
     *  strokeColor: String,
     *  centerX: Number,
     *  centerY: Number
     * }
     */
    constructor(options, onCompletion) {
        options = options || {};
        this.thisTime = Date.now();
        this.startTime = this.thisTime;
        this.time = options.time;
        this.elapsedTime = this.time;
        this.on = false;
        this.done = false;
        this.circle = {
            radius: options.radius,
            centerX: options.centerX,
            centerY: options.centerY
        };
        this.strokeColor = [options.baseColor, options.strokeColor];
        this.onCompletion = onCompletion || function () { };
    }
    isOn(isItOn) {
        if (isItOn) {
            this.on = true;
            this.thisTime = Date.now();
            this.startTime = this.thisTime;
        } else {
            this.on = false;
        }
    }
    isDone() {
        return this.done;
    }
    update() {
        if (this.on) {
            this.lastTime = this.thisTime;
            this.thisTime = Date.now();
            this.elapsedTime = this.time - ((this.thisTime - this.startTime) / 1000);
        } else {
            this.elapsedTime = this.time;
        }

        if (Math.ceil(this.elapsedTime) <= 0) {
            this.elapsedTime = 0;
            this.done = true;
            this.onCompletion.call();
        }
    }
    draw(ctx) {
        //Debug Stuff
        //Draws a bigass rect so I can see the spinner ageinst a solid background.
        //ctx.fillStyle = "#545252";
        //ctx.fillRect(0,0,2000,2000);
        //End Debug Stuff

        //Decimal is used to computer the arc of the loading circle
        const arcDecimal = Math.ceil(this.elapsedTime) - this.elapsedTime;
        const strokeSize = this.circle.radius / 20;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'normal ' + this.circle.radius + 'pt Lato Light';

        //Main circle
        ctx.beginPath();
        ctx.fillStyle = "#6D6D6D";
        ctx.arc(this.circle.centerX,
            this.circle.centerY,
            this.circle.radius,
            0,
            2 * Math.PI, false);
        ctx.fill();

        //Arc with the Color of the previous loading bar
        ctx.lineWidth = strokeSize;
        ctx.beginPath();
        ctx.strokeStyle = this.strokeColor[(Math.ceil(this.elapsedTime) + 1) % 2];
        ctx.arc(this.circle.centerX,
            this.circle.centerY,
            this.circle.radius - strokeSize * 0.5,
            -Math.PI * 0.5,
            2 * Math.PI * arcDecimal - Math.PI * 0.5,
            true);
        ctx.stroke();

        //Arc with the color of the "next" loading bar. I don't know a better way to make this make sense. 
        //Honestly, though, nobody really needs to touch this stuff so don't worry about understanding whats going on here.
        ctx.lineWidth = strokeSize;
        ctx.beginPath();
        ctx.strokeStyle = this.strokeColor[Math.ceil(this.elapsedTime) % 2];
        ctx.arc(this.circle.centerX,
            this.circle.centerY,
            this.circle.radius - strokeSize * 0.5,
            -Math.PI * 0.5,
            2 * Math.PI * arcDecimal - Math.PI * 0.5,
            false);
        ctx.stroke();

        ctx.fillStyle = this.strokeColor[0];
        ctx.fillText(Math.ceil(this.elapsedTime), this.circle.centerX, this.circle.centerY);
    }
}