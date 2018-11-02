    之前ts学习的比较糙，很多细节都不太清楚，这是一个完整的学习ts的东西，包含了比较多的ts特性

之前想同时使用模块和命名空间，以求达到双方的便利性，后来发现同时使用模块和命名空间不是一个好的实践。
因为在命名空间的文件使用`import`和`export`等语法后这个命名空间会当做模块来处理，和其他文件的相同`namespace`产生隔离，此时无法直接使用其他文件的相同命名空间下的值,需要像下面代码这样获取，也就是说模块和命名空间二选其一吧。 

dep.ts

    //此处的export也使得A变成了模块，其他地方想使用就必须import
    export namespace A {
        export interface Log {
            (str: string): void
        }
    }

test.ts

    import * as otherName from "./src/dep";

    namespace A {
        export const log:otherName.A.Log= function(str) {
            console.log(str)
        }
    }
    //因为此处的导出，变成了模块
    export default A.log;

说说重载，这是我之前比较疑惑的地方，初学的时候我想定义一个函数，实现传入值的不同，返回不同类型：
```typescript
function createElement(tag: string) {
    return document.createElement(tag)
}
const canvas = createElement('canvas');
const context = canvas.getContext('2d'); //error: Property 'getContext' does not exist on type 'HTMLElement'
```
假设此处我只关注`canvas`其他的我都看成`HTMLElement`,那就先要定义个map
```ts
interface tagMap {
    'canvas':HTMLCanvasElement
}
function createElement<T extends keyof tagMap>(tag: T) {
    return document.createElement(tag)
}
```
此时，除了`canvas`外不能穿其他的值，就需要重载,当然可以在`tagMap`里面加一个`[tag: string]: HTMLElement`,
但这么做会有问题,这表明`tag`可以是`number`[indexable-types](http://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types)
```ts
function createElement<T extends keyof tagMap>(tag: T): tagMap[T];
function createElement(tag: string): HTMLElement;
function createElement(tag) {
    return document.createElement(tag)
}
```
重载也可以在接口里面。
```ts
declare var util: Util;
interface Util {
    createElement<T extends keyof tagMap>(tag: T): tagMap[T];
    createElement(tag: string): HTMLElement;
}
const canvas = util.createElement('canvas');
const other = util.createElement('other');

```
