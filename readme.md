    之前ts学习的比较糙，很多细节都不太清楚，这是一个完整的学习ts的东西，包含了比较多的ts特性

之前想同时使用模块和命名空间，以求达到双方的便利性，后来发现同时使用模块和命名空间不是一个好的实践。
因为在命名空间的文件使用`import`和`export`等语法后这个命名空间会当做模块来处理，和其他文件的相同`namespace`产生隔离，此时无法直接使用其他文件的相同命名空间下的值,需要像下面代码这样获取，也就是说模块和命名空间二选其一吧。 

dep.ts
    //此处的export也是的A变成了模块，其他地方想使用就必须import
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
