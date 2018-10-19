# 输出(output)

output在webpack.config.js中配置是用来向指定的磁盘中写入打包的文件名和存放打包的文件路径。output的配置是以一个对象构成。同时也只会有一个对象的写法。

## output默认的写入方式

这里对概念的部分在回顾一下。对于webpack4.x的版本。在不配置output选项的时候，对文件路径和文件名是如何输出的。

> path选项

path选项对应的是文件输出的路径,在概念部分通过报错的案例,发现输出的路径必须是一个绝对路径,可以借助于node.js的path模块的resolve方进行拼接绝对路径。

default: 默认路径是输出到当前工程的根目录下的dist文件夹下


> filename选项

filename选项对应的是文件输出的文件名。我们可以通过filename自定义想要的输出的文件名

default: 默认输出的文件名为index.js

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
运行webpack打包命令

```
.webpackProject
  |--dist
  |   |--js
  |   |   |--bundle.js
  |--src
  |   |--index.js
  |webapck.config.js
```

这里为了更好的展现打包的路径。把打包后的文件放入深层级的文件夹中。无认存放的打包后文件的层级目录有多深或者如何命名文件名都是一律从path选项中进行配置。

> 发现不同

这里并没有引入path模块和概念的演示代码有所不同。创建绝对路径这里直接使用__dirname和自定义的路径进行拼接。

> 原理

要明白webpack是运行在node.js之上的。所以__dirname是node.js的全局变量。输的结果是当前文件根路径。通过console.log(__dirname),笔者电脑打印出来的结果为/Users/ziksang/Desktop/webpack-doc/source/lesson11

::: warning 注意
这里需要注意的是在概念部分
通过path.resolve(__dirname, 'dist')
输出的结果则为:
/Users/ziksang/Desktop/webpack-doc/source/lesson11/dist

通过__dirname + 'dist'
输出的结果:
/Users/ziksang/Desktop/webpack-doc/source/lesson11dist

因为path.resolve()方法会对路径进行自动补全,而本节的方式是字符串拼接。所以在dist字符串前必须记得加上 / ,这样才是最后想要得到的根路径结果。
:::

::: tip
本节学习课程demo下载文件夹为[lesson11](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 多入口多输出

在讲解entry入口的时候,已经介绍了多入口的配置。在没有配置output选项的情况下。会根据output默认配置生成多个输出文件。在输出的文件名根据entry对象中的每个属性名来确定最后的输出文件的名称。是一一对应的结果。如果我们想自定义输出的文件名如何操作？

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

运行webapck

::: danger 报错:
仔细观查output中filename的配置,此时的文件名像往前一样写。输出的打包文件为bundle.js文件。


ERROR in chunk index2 [entry]
bundle.js
Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks 0 and 1)
:::

此时会发生报错，指向的报错是一种冲突的方式。在entry中通过对象方式定义多个入口，每个入口都会成生一个js文件。同样也是各自的主入口文件,但是在输出output对象中只有一个filename字段。提供入口文件打包后输出的文件。从报错中可以明白，当打包第一个index1.js的文件的时候。输出的文件名为bundle.js。此时再打包index2.js文件的时候。此时filename依然为bundle.js。如果打包出的文件名为相同的情况下。后者会覆盖前者。webpack检测到之后，会以错误冲突的方式告诉我们。此时是两个入口文件，而输出的文件名是相同的。

## 占位符(substitutions)

通过substitutions(占位符)变量动态的创建的对应入口
