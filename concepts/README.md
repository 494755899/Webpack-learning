# 概念

`webpack`是一个现代化的的Javascript应用程序的静态模块的打包工具,所谓的静态模块包含页面程序展示所需的一切。比如(**图片、样式、交互行为**)等代码。同时它会递归构建一个依赖关系图。然后根据配置打包成一个或者多个模块(bundle)

> 通过这里可以了解**Javascript**模块和**webpack**模块的信息

在学习整个webpack的前题下需要知道几个基本的配置和4.0特有零配置方案。同时虽然有零配置的方案。但是还是可以进行针对于项目的高度集成配置。首先看一下以下五个核心的概念:

解释|配置名|版本新增选项
---|:---:|---|
入口|entry|-
输出|output|-
转化器|loader|-
插件|loader|-
模式|mode|4.0x

## 入口(entry)

入口起点(entry point)告诉webpack应该从那个模块开始进行构建内部依赖，进入入口之后，webpack会通过递归的方式通过配置进行寻找那些库和文件是入口起点文件的直接或者间接依赖。

模块被webpack处理之后，会被打包到指定的输出文件夹中。这里需要能过output进行配置，讲解output出口时会进行详细解说。

能过webapck的entry起点配置中，可以指定一个入口或者多个入口。

> 对于零配置来说，默认入口文件夹为当前配置文件的src目录，以下有示意图

```
webpackProject
│
└───src
│   │--index.js  写入一些内容
```

进入webpackProject根目录下终端运行以下命令执行默认命令,【**必须保证全局安装了webpack-cli**】

```
webpack
```

执行结果:

```
webpackProject
│
└───dist
|   |--main.js
└───src
│   │--index.js  写入一些内容
```

执行结果会在当前工程的根目录下添加dist文件夹，同时打包后的文件bundle为main.js。可以很清楚的明白如果零配置的情况下。会默认读取src目录下的index.js文件，打包后输出到同级的dist目录下,输出文件名为main.js。

> 注意: 会发生的错误

如果src目录下的js文件名不是index.js,假设设计为util.js


```
webpackProject
│
└───src
│   │--util.js  写入一些内容
```

### 报错内容

```
Insufficient number of arguments or no entry found.
Alternatively, run 'webpack(-cli) --help' for usage info.

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/ziksang/Desktop/webpackProject'
```

报错的原因是因为在webpck零配置的情况下，默认是读取webpackProject工程根目录下src/index.js文件，所以提示读取不到./src/index.js入口文件。


## 配置(configuration)

> 配置webpack.config.js配置文件

webpack.config.js文件是webpack默认读取配置的文件，需要存放在webpackProject工程的根目录下，webpack默认会在工程的根目录下读取webpack.config.js配置指示webpack打包流程的配置项。


```
webpackProject
│
└───src
│   │--util.js  写入一些内容
|---|
└───webpack.config.js  配置内容

```

此时想要要把打包入口文件的名称改成util.js。需要通过额外的webpack.config.js文件进行打包指示的配置。否改改会走默认配置


webpack.config.js

```
module.exports = {
    entry: './src/util.js'
}
```

在讲解entry入口的时候没有配置webpack.config.js配置文件，只会走webpack默认零配置的方案，零配置会默认读取当前根目录下./src/index.js文件进行打包。如果改变文件名index,则会报错。如果进行特定的配置，此时需要在webpack.config.js配置文件中进行特定的配置。

存在webpack.config.js,webpack运行的时候会试探寻找根目录下是否有webpack.config.js文件。存在的情况下。会根据webpack.config.js文件的配置项进行指示打包。

在entry选项中指令输入文件入口为./src/util.js，然后运行**webpack**

```
webpackProject
│
└───dist
|   |--main.js
└───src
│   │--index.js 
```

可以发现。在`webpackProject`工程的根目录下，最后输出在dist目录下，名为main.js。从中可以明白一个道理。如果通过webpack.config.js配置的选项entry,webpack会根据webpack.config.js中的配置项进行指令输入。但是其余的所有配置将会依然会进行webpack零配置的默认配置项。




## 出口(output)

output是告诉webpack最后输出最后的bundles所存放的目录，以及如何命名打包后的文件名。从入口(entry)的演示可以看出默认配置输出到当前根目录下的dist文件夹下，同时输出的文件名命名为main.js,所有最后打包的应用程序都会存放在main.js文件夹下。同样你可以在配置文件中对output选项进行字段配置。比如说指定输出目录、指定输出文件名称，用这些来处理自己理想的程序输出。

