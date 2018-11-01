import * as _window from './window';

let canvas: HTMLCanvasElement;
let global;
// const isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
declare var process;

if(process.env.NODE_ENV === 'development') {
	// 浏览器
	canvas = document.querySelector('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
} else {
	global = GameGlobal;
	canvas = _window.Canvas();
	inject();
}

function inject() {
	const { platform } = wx.getSystemInfoSync()
	if (platform === 'devtools')  {
		for (const key in _window) {
			const descriptor = Object.getOwnPropertyDescriptor(global, key)
	  
			if (!descriptor || descriptor.configurable === true) {
			  Object.defineProperty(window, key, {
				value: _window[key]
			  })
			}
		}
		// for (const key in _window.document) {
		// 	const descriptor = Object.getOwnPropertyDescriptor(global.document, key)
	  
		// 	if (!descriptor || descriptor.configurable === true) {
		// 	  Object.defineProperty(global.document, key, {
		// 		value: _window.document[key]
		// 	  })
		// 	}
		// }
		//@ts-ignore
		window.parent = window
	} else {
		for (const key in _window) {
			global[key] = _window[key]
		}
		global.window = _window;
		window = global;
		//@ts-ignore
		window.top = window.parent = window
	}
}

export default canvas;
