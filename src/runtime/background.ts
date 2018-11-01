import {reserveContext} from '../utils/index';
import setting from '../setting';

export default class Background {
    private image = setting.bg;
    constructor(public ctx: CanvasRenderingContext2D) { }

    @reserveContext
    render(ctx: CanvasRenderingContext2D) {
        const pattern = ctx.createPattern(this.image, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, setting.width, setting.height);
    }
}
