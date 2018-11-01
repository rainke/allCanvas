// 开始界面
import util, {reserveContext} from '../utils/index';

export default class StartScene {

    render(ctx: CanvasRenderingContext2D) {
        util.renderButtonWithText(ctx, {
            x: 15,
            y: 500
        }, '开始游戏')

        util.renderButtonWithText(ctx, {
            x: 132.5,
            y: 500
        }, '排 行 榜')

        util.renderButtonWithText(ctx, {
            x: 250,
            y: 500
        }, '分      享')
    }
}