# 输出(output)

`output`在`webpack.config.js`中配置是用来向指定的磁盘中写入打包的文件名和存放打包的文件路径。`output`的配置是以一个对象构成。同时也只会有一个对象的写法。

## output默认的写入方式

这里对概念的部分在回顾一下。对于`webpack4.x`的版本。在不配置`output`选项的时候，对文件路径和文件名是如何输出的。

> path选项

`path`选项对应的是文件输出的路径,在概念部分通过报错的案例,发现输出的路径必须是一个绝对路径,可以借助于`node.js`的`path`模块的`resolve`方进行拼接绝对路径。

**default**: 默认路径是输出到当前工程的根目录下的`dist`文件夹下


> filename选项

`filename`选项对应的是文件输出的文件名。我们可以通过`filename`自定义想要的输出的文件名

**default**: 默认输出的文件名为`index.js`

### 基础用法

工程目录图:

```
.webpackProject
  |--src
  |   |--index.js
  |webapck.config.js
```

webpack.config.js

```
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + 'dist/assets/js',
    filename: 'bundle.js'
  }
}
```
运行**webpack**打包命令

```
.webpackProject
  |--dist
  |   |--js
  |   |   |--bundle.js
  |--src
  |   |--index.js
  |webapck.config.js
```

这里为了更好的展现打包的路径。把打包后的文件放入深层级的文件夹中。无论存放的打包后文件的层级目录有多深或者如何命名文件名都是一律从`path`选项中进行配置。

> 发现不同

这里并没有引入`path`模块和概念的演示代码有所不同。创建绝对路径这里直接使用`__dirname`和自定义的路径进行拼接。

> 原理

要明白`webpack`是运行在`node.js`之上的。所以`__dirname`是`node.js`的全局变量。输的结果是当前文件根路径。通过`console.log(__dirname)`,笔者电脑打印出来的结果为`/Users/ziksang/Desktop/webpack-doc/source/lesson11`

::: warning 注意
这里需要注意的是在概念部分
通过`path.resolve(__dirname, 'dist')`
输出的结果则为:
`/Users/ziksang/Desktop/webpack-doc/source/lesson11/dist`

通过`__dirname + 'dist'`
输出的结果:
`/Users/ziksang/Desktop/webpack-doc/source/lesson11dist`

因为`path.resolve()`方法会对路径进行自动补全,而本节的方式是字符串拼接。所以在`dist`字符串前必须记得加上 `/` ,这样才是最后想要得到的根路径结果。
:::

::: tip
本节学习课程demo下载文件夹为[lesson11](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 多入口多输出

在讲解`entry`入口的时候,已经介绍了多入口的配置。在没有配置`output`选项的情况下。会根据`output`默认配置生成多个输出文件。在输出的文件名根据`entry`对象中的每个属性名来确定最后的输出文件的名称。是一一对应的结果。如果我们想自定义输出的文件名如何操作？

工程文件目录:

```
.webpackProject
  |--src
  |   |--index1.js
  |   |--index2.js
  |webapck.config.js
```

webpack.config.js

```
module.exports = {
  entry: {
    index1: './src/index1.js',
    index2: './src/index2.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
```

运行**webapck**

::: danger 报错:
仔细观查`output`中`filename`的配置,此时的文件名像往前一样写。输出的打包文件为`bundle.js`文件。


ERROR in chunk index2 [entry]
bundle.js
Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks 0 and 1)
:::

此时会发生报错，指向的报错是一种冲突的方式。在`entry`中通过对象方式定义多个入口，每个入口都会成生一个`js`文件。同样也是各自的主入口文件,但是在输出`output`对象中只有一个`filename`字段。提供入口文件打包后输出的文件。从报错中可以明白，当打包第一个`index1.js`的文件的时候。输出的文件名为`bundle.js`。此时再打包`index2.js`文件的时候。此时`filename`依然为`bundle.js`。如果打包出的文件名为相同的情况下。后者会覆盖前者。`webpack`检测到之后，会以错误冲突的方式告诉我们。此时是两个入口文件，而输出的文件名是相同的。

::: 此demo是一个错误示例的demo
本节学习课程demo下载文件夹为[lesson12](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 占位符(substitutions)

通过`substitutions`(占位符)变量动态的创建的对应入口,通过`substitutions`作为输出文件的命名变量。要知道这个`substitutions`变量取值是从什么方位进行取值的。

webpack.config.js

```
module.exports = {
  entry: {
    index1: './src/index1.js',
    index2: './src/index2.js'
  },
  output: {
    path: __dirname + '/dist',
    // 依然采用之前的目录结构,在bundle.js之前加上[name]占位符
    filename: '[name].bundle.js'
  }
}
```

打包后的输出结果目录


```
.webpackProject
 +|--dist
 +|   |--index1.bundle.js
 +|   |--index2.bundle.js
  |--src
  |   |--index1.js
  |   |--index2.js
  |webapck.config.js
```

对于最后输出的文件名中的**【name】**占位符变量是根据`entry`入口对象的字段名时行取值的。


对于`filename`字段中的`.bundle`对于每个打包后的文件在占位符变量之后都会添加`.bundle`,对于`.bundle`来说就是所有打包文件的公共部分名称。

::: tip
本节学习课程demo下载文件夹为[lesson13](https://github.com/494755899/Webpack-learning/tree/master/source)
:::
