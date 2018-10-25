# 插件(plugins)

`webpack`的插件功能十分强大,插件主要解决`loader`无法解决的问题。

## 插件的基本用法

所有的`webpack`插件都是定义在`plugins`选项中,在引入插件包之后。只需要在`plugins`选项中通过`new`关健词进行使用差件既可

举列`clean-webpack-plugin`:

目录结构
```
webpackProject
 |--src
 |   |--index.js
 |--webpack.config.js
```
webpack.config.js

```
module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[hash].js'
  }
}
```
运行**webpack**

在打包后的结果中`dist`目录下生成了一个`bundle.`(跟着`hash`码).js的文件。

如果此时我们改动`src/index.js`的文件。此时再次会生成一个`bundle.`(跟着`hash`码).js的文件。

这样会导致我们每次生成文件都需要都动把上次生成的`hash`文件删除。手动的情况下会导致删错文件等情况。

### 通过clean-webpack-plugin进行删除文件

下载`npm install clean-webpack-plugin -D`

在`plugins`数组选项中`new`一个`CleanWebpackPlugin`插件。为了能更好的演示出结果。在`filename`中添加了`hash`,每次改动入口文件的时候,打包后的文件`hash`值都会变。正是因为每次这样能更好的展示出`clean-webpack-plugin`的根本作用。


webpack.config.js

```
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[hash].js'
  },
 +plugins: [
 +  new CleanWebpackPlugin(['dist'])
 +] 
}
```

当每次打包之前都会调用`new CleanWebpackPlugin(['dist'])`,删除`dist`目录下的文件。这样就可以保证每次在生成文件的时候都会删除上次打包过的文件目录。当重新改变入口文件的内容的时候就不会存在多余残留的文件。

::: tip
本节学习课程demo下载文件夹为[lesson20](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 同一个插件可以new多次

对于插件而言,是通过实列化构造函数。每个传入的选项都是独立的。所以对于同一个插件可以进行多次实例化使用

改变一下webpack.config.js中的文件内容

```
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index1: './src/index1.js',
    index2: './src/index2.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]/[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/index1']),
    new CleanWebpackPlugin(['dist/index2'])
  ]
}
```

此时在`entry`中定义两个入口文件,在`output`输出结果的总目录放在`dist`目录下。然后分别把`'./src/index1.js'`打包后的文件输出结果为`dist/index1/index1.js`。把`'./src/index2.js'`打包后的文件输出结果为`dist/index2/index2.js`中。

在插件中分别对删除`dist/index1`目录和`dist/index2`目录的文件。如果只删除其中的一个。在改动`src`中`index1`和`index2`文件内容时，会对`hash`进行一个改动。每次都会残留多余上次打包后的`hash`文件。

其实本质上我们可以直接删除`dist`目录。但是为了展示可以通过`new`多个实例插件的表现。做了`index1`和`index2`目录的分别删除。由此可知可以`new`多个实例插件。


::: tip
本节学习课程demo下载文件夹为[lesson21](https://github.com/494755899/Webpack-learning/tree/master/source)
:::