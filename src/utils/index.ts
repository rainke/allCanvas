
export interface renderFunction {
    (ctx: CanvasRenderingContext2D, ...args): void;
}

interface locWithSize {
    x: number;
    y: number;
    w?: number;
    h?: number;
}

const reserveContextFunction = (render: renderFunction) => {
    return function(ctx: CanvasRenderingContext2D, ...args) {
        ctx.save();
        render(ctx, ...args);
        ctx.restore();
    }
}

const renderButton = reserveContextFunction(function(ctx, translate) {
    ctx.fillStyle = '#308231';
    ctx.translate(translate.x, translate.y);
    ctx.fillRect(0, 0, 200, 100);
});

const renderText = reserveContextFunction(function(ctx, translate, text) {
    ctx.fillStyle = '#fff';
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 100, 50);
});

export class RenderUtil {
    renderButtonWithText(ctx: CanvasRenderingContext2D, translate = {x: 0, y: 0},  text: string) {
        renderButton(ctx, translate);
        renderText(ctx, translate, text);
    }
}



export default new RenderUtil();

export function reserveContext(target, propKey, descriptor) {
    const render = descriptor.value;
    descriptor.value = function(ctx: CanvasRenderingContext2D, ...args) {
        ctx.save();
        render.call(this, ctx, ...args);
        ctx.restore();
    }
    return descriptor;
}

function createElement<T extends keyof HTMLElementTagNameMap>(tag : T) {
    return document.createElement(tag);
}

function createCanvas(): HTMLCanvasElement {
    return createElement('canvas');
}


