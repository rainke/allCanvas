// 开始界面
import util, {reserveContext} from '../utils/index';

export default class StartScene {
    constructor() {
        
    }
    @reserveContext
    render(ctx: CanvasRenderingContext2D) {
        util.renderButtonWithText(ctx,void 0, '开始游戏')
    }
}