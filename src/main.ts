import Bg from './runtime/background';
import Ss from './scenes/startScene';

export default class Main {
    private bg: Bg;
    private ss: Ss;
    constructor(public ctx: CanvasRenderingContext2D) {
        this.bg = new Bg(ctx);
        this.ss = new Ss();

        this.loop();
    }

    render(ctx) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        this.bg.render(ctx);
        this.ss.render(ctx);
    }

    loop = () => {
        requestAnimationFrame(this.loop);
        this.render(this.ctx);
    }
}
