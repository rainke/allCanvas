declare  namespace WX {

    interface SystemInfo {
        /**
         * 手机品牌
         */
        brand?: string;
        /**
         * 手机型号
         */
        model: string;
        /**
         * 设备像素比
         */
        pixelRatio: number;
        /**
         * 屏幕宽度
         */
        screenWidth?: number;
        /**
         * 屏幕高度
         */
        screenHeight?: number;
        /**
         * 可使用窗口宽度
         */
        windowWidth: number;
        /**
         * 可使用窗口高度
         */
        windowHeight: number;
        /**
         * 状态栏的高度
         */
        statusBarHeight?: number;
        /**
         * 操作系统版本
         */
        system: string;
        /**
         * 微信版本号
         */
        version: string;
        /**
         * 客户端平台
         */
        platform: string;
    }

    export interface Base {
        createCanvas(): HTMLCanvasElement;
        createImage(): HTMLImageElement;
        getSystemInfoSync(): SystemInfo
    }
    
    export interface GameGlobal {
        [prop:string]: any
    }
}

declare var wx: WX.Base;
declare var GameGlobal: WX.GameGlobal;
