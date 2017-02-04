import { Enum } from 'enumify';

class Alignment extends Enum { }
Alignment.initEnum(['left', 'center', 'right']);

class Baseline extends Enum { }
Baseline.initEnum(['middle', 'hanging']);

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.centerX = width / 2;
        this.centerY = height / 2;
    }
}

function setContextProperties(ctx, props) {
    const propsKeys = Object.keys(props);
    for (let key of propsKeys) {
        const value = props[key];
        if (value.name) {
            ctx[key] = value.name;
        } else {
            ctx[key] = value;
        }
    }
    return ctx;
}

export {
    Alignment,
    Baseline,
    Rectangle,
    setContextProperties
};