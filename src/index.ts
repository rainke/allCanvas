import canvas from './adapter/index'
import Main from './main';

const ctx = canvas.getContext('2d');

new Main(ctx);