# 配置(configuration)

`webpack.config.js`是命令`webpack`如何进行打包的`javascript`文件，通过`webpack.config.js`文件可以根据不同的配置打包不同的效果。根据对象定义的属性进行解析。

`webpack`配置文件标准是`Node.js CommonJS`模块。

1. 可以通过`require('./xxx.js')`,引入本地文件
2. 可以通过`require('vue')`, 引入`npm`包的模块
3. 最后把配置文件对象的方式通过`module.exports`导出

```
module.exports = {
  ...需要的配置
}
```

## 使用配置文件的好处

配置文件可以很清晰和管理好我们的打包需求,不建意以下方式的做法:

1. 通过`webpack`命令行写入参数进行打包,这种方式不直观,会导致命令参数太长,例如:

```
webpack --entry ./src/index --output-filename index.js
```

2. 在配置`webpack.config.js`文件的时候，通常我们要配置开发环境和生产环境的配置文件,但是一些阀门(**配置的开关**)和一些公用配置可以提取出来，不要使得配置文件的庞大，会导致难以维护。


## 统一分风格配置

在`webpack`中何为统一风格,一个完整的`webpack`打包配置必然存在开发环境和生产环境的配置。

1. 把阀门(配置开关通过`config.js`文件提取出来),例如是否需要自动开浏览器，打后存放的文件路径等。
2. 把公用配置比如说`loader`,`plugin`给提取出来,放用一个公用例如:`base.config.js`,通过`webpack-merge`包进行基础合并。
3. 把`development`和`production`两套打包环境进行区分。对于各自环境配置各自的特有配置。
4. 例如: `.babelrc` `.postcss.config.js`这些额外对`babel`的配置和`postcss`的配置通过配置文件方式进行配置。不要通过内联方式或者在`package.json`中写入。除了你想配置一些开箱即用的方式。

## webpack配置文件名称

对于`webpack.config.js`而言并没有限定一定要在根目录下或者一定需要文件命为`webpack.config.js`。通常整个完整工程在`webpack`配置下必然会分为两套环境，`development`和`production`环境。此时执行的配置文件必然也不同，同时语义也不够强烈。


```
webpackProject
│
└───src
│   │--util.js
|---prod.config.js
```

在`build`目录下分别创建`prod.config.js`,对应着生产环境的配置。同时写入以下配置代码:


prod.config.js

```
module.exports = {
    entry: '../src/util.js'
}
```

在命行运行`webpack`

::: danger
ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/ziksang/Desktop/webpack-doc/source/lesson9'
:::

运行时程序报错了，依然和概念中介绍`entry`入口一样的报错。并没有找到`./src/index.js`。**说明什么？**

说明运行`webpack`命令没有指定任何参数的时候，`webpack`默认只会从根目录下读取`webpack.config.js`文件进行指令打包。如果没有读取到，则会走零配置的默认打包方案，从当前目录`src/index.js`中找打包入口。

> 解决方案

需要自定义打包配置文件的文件名或者打包配置文件的目录结构的时候，需要配置命令行参数，通过`--config prod.config.js`

```
// 运行
webpack --config prod.config.js
```


::: tip
本节学习课程demo下载文件夹为[lesson9](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 入口路径解析的问题

现在有一种这样的情况,为了文件的夹的合理性，把`dev.config.js`与`prod.config.js`放入到根目录下的`build`目录下进行统一管理

```
webpackProject
│
└───src
│   │--util.js
└───build
|   |--dev.config.js
|   |--prod.config.js
```

prod.config.js

```
module.exports = {
  entry: '../src/util.js'
}
```

在上一节已经讲解过如何启动非默认名的配置文件。

运行`webpack --config build/prod.config.js`

::: danger
ERROR in Entry module not found: Error: Can't resolve '../src/util.js' in '/Users/ziksang/Desktop/webpack-doc/source/lesson10'
:::

对于以上的情况肯定很好奇,从表面上看配置本身没有问题。启动的文件是`build`目录下的`prod.config.js`。上面报的错误信息是找不到`../src/util.js`。如果通过`prod.config.js`启动配置进行寻找入口的情况下。本应该没有问题。但是为什么还是提示找不对应的入口文件呢？

::: tip 解决方案
虽然启动的配置文件在`build`目录下,这里要牵扯到了[context](http://www.baidu.com)上下文环境。但是上下文的环境还是在根目录下。
:::

prod.config.js

```
module.exports = {
  entry: './src/util.js'
}
```

再次运行`webpack --config build/prod.config.js`

### 原因分析

入口取决于上下文环境的配置。在默认配置下，上下文(**context**)是在根目录下。虽然`prod.config.js`存放在`build`目录下,在启动`webpack`打包的时候，`webpack`不是通过`prod.config.js`文件所在位置通过相对路径进行寻找打包的入口文件,这而是取决于上下文环境寻找入口的打包文件,具体点就是从根目录下进行寻找入口文件。这里也很容易导致迷惑。

::: tip
本节学习课程demo下载文件夹为[lesson10](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 总结

1. 在根路径下寻找不到命名为`webpack.config.js`文件的时候,运行打包命令会走·webpack4.x·的默认配置

2. 通过其它命名打包配置文件的时候,启动打包命令的时候需要通过参数`--config` （**指定打包文件的名称/从根目录算起**）

3. 对于入口文件而言,`webpack`在打包的时候不会根据配置文件所在的位置进行寻找,而是根据`context`上下文环境进行寻找。默认的上下文环境为工程的根路径。

