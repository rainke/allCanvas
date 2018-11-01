import * as img from 'assets/images/bg.png';

const screenWidth  = innerWidth;
const screenHeight = innerHeight;

class Setting {
    width = screenWidth;
    height = screenHeight;
    bg = new Image();
    constructor() {
        this.bg.src = img;
    }
}

export default new Setting();
