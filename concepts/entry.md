# 入口起点(entry point)

在上一章概念中已经对entry配置有了初步的认识,同时entry在webpack存在多种方式去进行配置,如果对上一章概念认识阅读的,提到过可以配置多入口方案。

## 单入口语法

用法: entry: string

> 简写语法

```
module.exports = {
    entry: './util.js'
}
```

以上的写法是以下方法的简写方式

```
module.exports = {
    entry: {
        main: './src/util.js'
    }
}
```

## 数组方式创建单入口

使用entry选项创建一个入口的时候,不但可以使用字符串的方式,而且还可以通过数组的方式写入不同的文件路径,如果你想把多个依赖文件注入在一起时，通过数组的方式就可以灵活运用

```
webpackProject
├── src
|   ├── index1.js
|   ├── index2.js
```

如果想把index1.js的文件中的代码和index2.js中的代码同时打包到一个入口中,用数组方式定义entry再和适不过了

webpack.config.js

```
module.exports = {
    entry: ['index1.js', 'index2.js']
}
```

运行webpack命令。

在根目录下会生成dist目录,同时内部添加了一个main.js。index1.js和index2.js文件的执行代码会被顺序的打入



