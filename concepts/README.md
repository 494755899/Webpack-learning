# 概念

`webpack`是一个现代化的`Javascript`应用程序的静态模块的打包工具,所谓的静态模块包含页面程序展示所需的一切。比如(**图片、样式、交互行为**)等代码。同时它会递归构建一个依赖关系图。然后根据配置打包成一个或者多个模块`(bundle)`

> 通过这里可以了解`Javascript`模块和`webpack`模块的信息

在学习整个`webpack`的前题下需要知道几个基本的配置和`4.0`版本特有零配置方案。`4.0`虽然加入了零配置的方案,但还是可以针对项目进行高度集成配置。首先看一下以下五个核心的概念:

解释|配置名|版本新增选项
---|:---:|---|
入口|entry|-
输出|output|-
转化器|loader|-
插件|loader|-
模式|mode|4.0x

## 入口(entry)

入口起点`(entry point)`告诉`webpack`应该从那个模块开始进行构建内部依赖，进入入口之后，`webpack`会通过递归的方式通过配置进行寻找那些库和文件是入口起点文件的直接或者间接依赖。

模块被`webpack`处理之后，会被打包到指定的输出文件夹中。这里需要通过`output`进行配置，关于output的介绍会在第三章讲解。

通过`webapck`的`entry`起点配置中，可以指定一个入口或者多个入口。

> 对于零配置来说，默认入口文件夹为当前工程的根目录`src`文件夹，以下有示意图

```
webpackProject
│
└───src
│   │--index.js  写入一些内容
```

在终端进入`webpackProject`根目录下执行`webpack`打包命令,【**必须保证全局安装了webpack-cli**】

```
// 在终端中运行
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

执行结果会在当前工程的根目录下创建`dist`文件夹，同时打包后的文件名为`main.js`。可以很清楚的明白如果零配置的情况下,会默认读取`src`目录下的`index.js`文件，打包后输出到同级的`dist`目录下,输出文件名为`main.js`。

> 注意: 会发生的错误

如果`src`目录下的`js`文件名不为`index.js`,假设重命名为`util.js`


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

报错的原因是因为在`webpack`零配置的情况下，默认是读取`webpackProject`工程根目录下`src/index.js`文件，所以webpack提示从根目录读取不到`./src/index.js`入口文件。

> 解决方案:

接下来介绍通过`webpack.config.js`配置文件进行特定入口配置。


## 配置(configuration)

`webpack.config.js`文件是`webpack`默认读取配置的文件，需要存放在`webpackProject`工程的根目录下，`webpack`默认会在工程的根目录下读取`webpack.config.js`配置指示`webpack`该如何打包。


```
webpackProject
│
└───src
│   │--util.js  写入一些内容
|---|
└───webpack.config.js  配置内容

```

此时想要把打包入口文件的名称改成`util.js`。需要通过额外的`webpack.config.js`文件进行打包指示的配置,同时只会根据已配的选项进行指示打包,否则其余的配置改将会走默认零配置方案


webpack.config.js

```
module.exports = {
    entry: './src/util.js'
}
```
> 回顾 入口(entry):

在讲解`entry`入口的时候并没有配置`webpack.config.js`配置文件，只会走`webpack`默认零配置的方案，零配置会默认读取当前根目录下`./src/index.js`文件进行打包。如果把入口文件index.js改为util.js,将会报错。如果进行特定入口配置，此时需要在`webpack.config.js`配置文件中进行对应的配置。

`webpack`运行的时候会试探寻找根目录下是否有`webpack.config.js`文件。如果根目录下存在`webpack.config.js`,会根据`webpack.config.js`文件的配置项进行指示打包。

在根目录配置好`webpack.config.js`中的入口选项之后,运行`webpack`命令。

```
webpackProject
│
└───dist
|   |--main.js
└───src
│   │--util.js 
```

打包完成后可以发现。在`webpackProject`工程的根目录下，最后输出在`dist`目录下，名为`main.js`。从中可以明白一个道理。如果通过`webpack.config.js`配置的选项`entry`,`webpack`会根据`webpack.config.js`中的配置项进行指令打包。但是其余的所有配置将会依然会进行`webpack`零配置的默认配置项。




## 出口(output)

output是告诉webpack最后输出最后的bundles所存放的目录，以及如何命名打包后的文件名。从入口(entry)的演示可以看出默认配置输出到当前根目录下的dist文件夹下，同时输出的文件名命名为main.js,所有最后打包的应用程序都会存放在main.js文件夹下。同样你可以在配置文件中对output选项进行字段配置。比如说指定输出目录、指定输出文件名称，用这些来处理自己理想的程序输出。

