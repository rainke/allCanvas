
export interface renderFunction {
    (ctx: CanvasRenderingContext2D, ...args): void;
}

interface locAndSize {
    x: number;
    y: number;
    w?: number;
    h?: number;
}

const defaultLocAndSize: locAndSize = {
    x: 0,
    y: 0,
    w: 110,
    h: 40
}

const reserveContextFunction = (render: renderFunction) => {
    return function(ctx: CanvasRenderingContext2D, ...args) {
        ctx.save();
        render(ctx, ...args);
        ctx.restore();
    }
}

const renderButton = reserveContextFunction(function(ctx, ls) {
    const grd = ctx.createLinearGradient(0, 0, 0, 45);
    grd.addColorStop(0, '#c00');
    grd.addColorStop(0.48, '#c00');
    grd.addColorStop(0.52, '#b00');
    grd.addColorStop(1, '#b00');
    ctx.fillStyle = grd;
    ctx.shadowColor = '#500';
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 1;
    ctx.translate(ls.x, ls.y);
    ctx.beginPath();
    let bezierOffset = 20;
    let left = 20;
    let right = ls.w - left;
    ctx.moveTo(left, 0);
    ctx.lineTo(right, 0)
    ctx.bezierCurveTo(
        right + bezierOffset,
        0,
        right + bezierOffset,
        ls.h,
        right,
        ls.h
    );
    ctx.lineTo(left, ls.h);
    ctx.bezierCurveTo(
        left - bezierOffset, ls.h, left - bezierOffset, 0, left, 0
        );
    ctx.closePath();
    ctx.fill();
});

const renderText = reserveContextFunction(function(ctx, ls: locAndSize, text) {
    ctx.fillStyle = '#fff';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(ls.x, ls.y)
    ctx.fillText(text, ls.w / 2, ls.h / 2);
});

export class RenderUtil {
    renderButtonWithText(
        ctx: CanvasRenderingContext2D,
        ls: locAndSize = defaultLocAndSize,
        text: string
    ) {
        if(!ls.w) {
            ls.w = defaultLocAndSize.w
        }
        if(!ls.h) {
            ls.h = defaultLocAndSize.h
        }
        renderButton(ctx, ls);
        renderText(ctx, ls, text);
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


