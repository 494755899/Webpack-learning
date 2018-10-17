# 概念

`webpack`是一个现代化的`Javascript`应用程序的静态模块的打包工具,所谓的静态模块包含页面程序展示所需的一切。比如(**图片、样式、交互行为**)等代码。同时它会递归构建一个依赖关系图。然后根据配置打包成一个或者多个模块`(bundle)`

> 通过这里可以了解`Javascript`模块和`webpack`模块的信息

在学习整个`webpack`的前题下需要知道几个基本的配置和`4.0`版本特有零配置方案。`4.0`虽然加入了零配置的方案,但还是可以针对项目进行高度集成配置。首先看一下以下五个核心的概念:

解释|配置名|版本新增选项
---|:---:|---|
入口|entry|-
输出|output|-
转化器|loader|-
插件|plugin|-
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

::: tip
本节学习课程demo下载文件夹为[lesson1](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

::: danger
注意: 经常会发生的错误
:::

如果`src`目录下的`js`文件名不为`index.js`,假设重命名为`util.js`


```
webpackProject
│
└───src
│   │--util.js  写入一些内容
```

> 报错内容

```
Insufficient number of arguments or no entry found.
Alternatively, run 'webpack(-cli) --help' for usage info.

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/ziksang/Desktop/webpackProject'
```

报错的原因是因为在`webpack`零配置的情况下，默认是读取`webpackProject`工程根目录下`src/index.js`文件，所以webpack提示从根目录读取不到`./src/index.js`入口文件。

::: tip
解决方案:
:::

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

::: tip
本节学习课程demo下载文件夹为[lesson2](https://github.com/494755899/Webpack-learning/tree/master/source)
:::


## 出口(output)

`output`是告诉`webpack`最后输出最后的`bundles`(打包结果)所存放的目录，以及如何命名打包后的文件名。从入口`(entry)`的演示可以看出默认配置输出到当前根目录下的`dist`文件夹下，同时输出的文件名命名为`main.js`,所有最后打包的应用程序都会存放在`main.js`文件夹下。同样你可以在配置文件中对`output`选项进行字段配置。比如说指定`输出目录`、`指定输出文件名称`，用这些来处理自己理想的程序输出。

创建以下文件目录

```
webpackProject
│
└───src
│   │--util.js  写入一些内容
|---|
└───webpack.config.js  配置内容

```

webpack.config.js

```
module.exports = {
  entry: './src/util.js'
  output: {
    path: './file',
    filename: 'bundle.js'
  }
}
```

最后想打包的结果图:

```
webpackProject
└───file
|---|--bundle.js
└───src
│   │--util.js  写入一些内容
|---|
└───webpack.config.js  配置内容

```
::: danger
在终端中运行`webpack`命令,会提示以下错误:
:::

```
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.output.path: The provided value "./src/util.js" is not an absolute path!
   -> The output directory as **absolute path** (required).
```

应该通过绝对路径告诉`webapck`最后存放的打包后文件的目录,不允许以相对的路径进行解析配置`output.path`

重新配置webpack.config.js

```
const path = require('path')
module.exports = {
  entry: './src/util.js'
  output: {
    path: path.resolve(__dirname, 'file'),
    filename: 'bundle.js'
  }
}
```

通过`path`模块的`resolve`方法获取最后输出路径的目录,此时是一个绝对路径。可能你会想知道`path`模块到底是什么，它是[Node.js](http://nodejs.cn/api/path.html)的一个核心模块。称之为路径模块，用于操作文件路径。再次运行`webpack`命令，在工程的根目录下如愿写入`file`文件夹，同时文件名为`bundle.js`


::: tip
本节学习课程demo下载文件夹为[lesson3](https://github.com/494755899/Webpack-learning/tree/master/source)
:::


## 解析器(loader)


在`webpack`打包中,会对入口文件的直接依赖或者间接依赖进行解析,但是`webpack`只能解析某些文件(比如`.js`结尾的文件)在`4.0`之后`.txt`、`.json`文件都能支持解析。而`loader`做的事情就是把其它类型的所有文件转换为`webpack`能够处理的模块。然后你就可以利用 `webpack` 的打包能力，对它们进行处理。

延续`output`的例子,在`src`目录下添加一个`image`图片文件

```
webpackProject
│
└───src
|   |--image.jpeg  添加一个图片文件
│   │--util.js  写入一些内容
|---|
└───webpack.config.js  配置内容

```

```
// util.js 文件
import myImage from  './image.jpeg'

const img = new Image()
img.src = myImage
const body = document.querySelector('body');
body.appendChild(img)
```

常试运行`webpack`

::: danger
出现报错信息
:::

```
ERROR in ./src/image.jpeg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./src/util.js 1:0-35 4:10-17
```

因为`webpack`并不支持对图片的解析。所以需要配置相应的`loader`做支持。其实`webpack`就是让其它类型的文件作为入口文件依赖的指定文件或者直接引用代码。

`webpack`能够解析任何`import`导入的模块，比如`.css, .jpg`文件等。但是需要配置对应的`loader`进行解析

> 两个`loader`关健启动的配置

1. `test`属性, 用于标时此时通过`loader`配置需要解析那种模块(文件)
2. `use`属性, 用于转换时配置`text`解析模块对应的解析器(loader)

webpack.confg.js

```
const config = {
  module: {
    rules: [
      {test: /\.jpeg$/, loader: 'url-loader'}
    ]
  }
};
```

当配置这样的`loader`就像用人类语言一样告诉`webpack`,当你解析到依赖的时候(通过`import`或者`require()`引入的文件),如果文件是`.jpeg`结尾的文件先用`url-loader`进行解析一下。

::: tip
提示
:::

在配置`url-loader`的时候，需要在本地工程中通过`npm`下载`url-loader`,方法`npm install url-loader`。
一定要在`module`选项中定义`rules`属性。通过数组的方式存放每个对应解析器。每个解析器以一个对象的方式存放。对象中必须需要两个关健的属性启动解析器(`loader`),否则会报出严重的错误警告。

最后运行`webpack`,同时在打包后的`file`文件夹中添加`index.html`,添加`script`标签引入`bundle.js`。发现页面中显示了一张图片,说明了`webpack`对图片进行了正确的解析和建立依赖。

::: tip
本节学习课程demo下载文件夹为[lesson4](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 插件(plugins)

`loader`用来解析某些特定的文件，而`plugins`的职能就更加强大了,几乎你能想到需要做的自动化操作都需要能过插件进行完成。比如说对文件进行操作,对当前代码执行的环境进行定义一系列自动化操作。

> 插件基本作用的方法

在使用插件的时候,必须通过[commonJS规范](http://www.commonjs.org)中用`require()`引入的方法把所需要的插件进行引入。通过`new`操作符创建一个新的实列。同时大多数插件都可以在实列化的时候传入一些(options)的配置选项,进行插件特殊的配置化。对于插件来说。既然是通过`new`一个实例而言，可以因为不同的目的进行多次实列化同一个插件。

webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
        new HtmlWebpackPlugin({template: './index2.html'})
    ]
}
```
::: tip
提示
:::

切记`plugins`选项不要少写一个`s`,这样的低级错误在程序中执行打包报错,如果遇到以下报错,可以检查`plugins`选项书写是否缺少`s`:

```
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration has an unknown property 'plugin'. These properties are valid:
   object { amd?, bail?, cache?, context?, dependencies?, devServer?, devtool?,entry?, externals?, loader?, mode?, module?, name?, node?, optimization?, output?, parallelism?, performance?, plugins?, profile?, recordsInputPath?, recordsOutputPath?, recordsPath?, resolve?, resolveLoader?, serve?, stats?, target?, watch?, watchOptions? }
   For typos: please correct them.
   For loader options: webpack >= v2.0.0 no longer allows custom properties in configuration.
     Loaders should be updated to allow passing options via loader options in module.rules.
     Until loaders are updated one can use the LoaderOptionsPlugin to pass these options to the loader:
     plugins: [
       new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           plugin: …
         }
       })
     ]
```

同时`webpack`也给我们提供了一些市面上比较热门和常用的插件。

## 模式(mode)

在`webpack4.0`的时候加入了`mode`模式。在没有配置`mode`的情况下。默认启用的是`production`生产模式。正是因为引入了零配置方案。通过`mode`进行配置会自动对设置的当前模式进行特定的通用的优化方案。对应模式的优化可以查看[这里](http://www.kedou2.com)

同时`webpack`可以配置三种模式，分别为`development`、`production`、`none`这三种模式

```
module.exports = {
  mode: 'development'
};
```

::: warning
在运行打包命令的时候没有设置mode,则会在打包结果报出警告
:::

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

警告告诉我们,如果没有设置`mode`模式,`webapck`会默认认为是`production`模式。

关于设定对应的模式有着什么对应的效果,请求[这里](http://www.baidu.com)


## 浏览器兼容性 Browser Compatibility

`webpack`支持所有符合[ES5](https://www.w3.org/html/ig/zh/wiki/ES5)标准的浏览器(不支持IE8以下的版本)。 如果需要`webpack`在打包的时候检测到`import()`和`require.ensure()`这种异步打包`chunk`的方式需要`Promise`(`ES6`语法)进行支持,如果需要`Promise`支持所有符合`ES5`标签浏览器的时候,可以通过`babel/polyfill`进行支持。

在这里提及到浏览器兼容性可能大家会很奇怪,为什么`webpack`只是把我们的代码进行打包输出,所有的适应浏览器的兼容性全是打包程中的自己写的代码。为什么还需要对注意`webpack`对浏览器的兼容性进行。关于更多`webpack`对浏览器的兼容性详细的介绍点击[这里](http://www.baidu.com)

