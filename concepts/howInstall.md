# 安装

## 前提条件

关于`webpack`安装有好几种方式，在安装`webpack`请确保安装了`Node.js`最新的版本,因为`webpack`是运行在`node.js`之上的。最新的`webpack`运行时对应的是`node.js`特定的版本，使用旧版本的`node`,可能是缺少缺少相关的包。请确保`node.js`为最新的长期支持版本`(LTS - Long Term Support)`

## 全局安装

可以通过全局安装`webpack`

```
npm install webpack -g
```

此时安装的是`4.x`以上的版本,如果需要安装指定版本:

```
npm install webpack@<version> -g
```

全局安装`webpack`有什么用？

通过全局安装`webpack`,可以在任何系统目录下运行`webpack`的命令。

常试在终端中进入任意目录下运行`webpack -v`,查看`webpack`的版本:

::: warning
缺少webpack-cli提示信息
:::
```
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
We will use "npm" to install the CLI via "npm install -D".
Do you want to install 'webpack-cli' (yes/no):
```

在`webpack4.x`中,`webpack`分离出了`webpack-cli`,运行`webpack`必须安装`webpack-cli`。以上的提示是本地的开发依赖,此时我们需要安装全局依赖,退出后通过命令安装`webpack-cli`:

```
npm install webpack-cli -g
```

现在全局的`node_module`包中已经存在`webpack`与`webpack-cli`两个全局包了。

进入:

```
cd /usr/local/lib/node_modules
```

可以查看到全局的`node_modules`已经安装`webpack`与`webpack-cli`,同时会根据`webpack`中`package.json`中的`bin`选项在`/usr/local/bin`目录下创建一个可执行文件的软连接,本质上其实两者就是一个引用关系。

```
"bin": {
    "webpack": "./bin/webpack.js"
},
```

1. 可执行文件名就是根据`bin`目录的字段名启动。
2. 启动时运行的则是`webpack`字段的值,通过`bin`目录下运行`webpack.js`文件

## 理解package.json作用

首先创建一个工程

```
mkdir webpackProject
```

接着需要添加一个`package.json`文件。那什么是`package.json`, 起了什么作用?

`package.json`就是一个就是管理你本地安装的`npm`包

> 1. 展示项目所依赖的npm包
> 2. 允许你指定一个包的版本(范围)
> 3. 让你建立起稳定，意味着你可以更好的与其他开发者共享

当新的成员加入开发你的项目的时候，通过`package.json`中记录的依赖包可以让新成员通过`npm install`准确的下载项目所依赖的对应版本包。

在本地安装依赖的时候，对安装后的依赖描述可以分为两种

```
1. npm install xxx --save
```
`--save` 后的依赖描述会被添加到`package.json`中的`dependencies`字段中。表示此时下载的包最后是代码运行时所依赖的包。比如说`jquery`。在生产环境的代码中，需要通过`jquery`去进行`Dom`操作

```
2. npm install xxx --save-dev
```
`--save-dev` 后的依赖描述会被添加到`package.json`中的`devDependencies`字段中。表示此时下载的包不会被打包或者作用在运行时的代码中。比如说`webpack`依赖包，只是在开发或者或者上线时对代码进行打包和一系列操作创建[**依赖关系**],[**开发构建**],[**上线性能优化**]等,`webpack`包的代码并不会在生产代码中出现。

## 本地安装

进入`webpackProject`根目录,运行`npm init`,通过回答的方式配置你的`package.json`文件，或者直接`npm init -y`直接生成默认配置的`package.json`的默认文件。

```
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

下载依赖简写的方式:

```
npm i webpack --D
npm i webpack-cli --D
```

同时下载多个包的简写方式:

```
npm i webpack webpack-cli --D
```

::: warning
如果同时下载多个包--save-dev 与 --save两种模式的包需要进行区分

错误的方式:

npm install webpack jquery -D

因为jquery是生产中需要的依赖包所以不建意用-D
:::


在本地安装完`webpack`与`webpack-cli`的时候请查看`package.json`中的文件

```
"devDependencies": {
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2"
}
```

发现`package.json`中多一个`devDependencies`的字段。对象中有两个非生产代码依赖的包。同时还有对应当下载的版本号。

:::warning
如果本地安装包的时候不添加`--save-dev` 或者 `--save`的时候,下载对应的包也会下载到本地`node_modules`文件中。但是不会把包的相关信息添加到`package.json`中`devDependencies`或者`dependencies`字段中。这样会导致其它人接手工程的时候启动工程不知道下载对应的依赖包或者依赖包版本对应的开发`api`
:::

## 全局安装的注意事项

不推荐全局安装`webpack`，这样会让你的`webpack`指定到全局的指定版本。可能会导致构建失败。从语句的意思中我们很难理解到到底是什么意思,接下来通过案例进行解释:

通过全局安装:

```
// 全局安装一个webpack3.0的版本
npm install webpack@3.0.0 -g
```

再创建一个`webpackProject`的工程

```
// 创建名为webpackProject的工程
mkdir webpackProject
// 进入到webpackProject工程的根目录
cd webpackProject  
// 初始化package.json文件
npm init -y  
// 下载webpack和webpack-cli的本地依赖,此时下载的是4.x的版本
npm install webpack webpack-cli -D  
```

创建基本测试目录和文件

```
// 创建src目录
mkdir src  
// 进入src目录
cd src 
// 在src目录下创建index.js写入console.log(hello)
echo "console.log('hello')" > index.js  
```

在工程的根目录下运行`webpack`命令。此时生成了`dist`目录，目录下生成了`main.js`文件,因为`webpack4.0`有了零配置的方案。

> 说明了什么？

说明了虽然运行的是全局命令。但是`webpack`检测当前工程目录下的`node_modules`中`.bin`下是否有`webpack`对应的执行文件。如果存在。则使用当前工程下的`webpack`版本进行打包

### 删除本地webpack依赖包

```
// 此时删除当前工程下的webpack依赖包
npm uninstall webpack webpack-cli
```

再次运行`webpack`

::: danger
No configuration file found and no output filename configured via CLI option.
A configuration file could be named 'webpack.config.js' in the current directory.
Use --help to display the CLI options.
:::

可以看到提示我们需要通过`cli`加上参数或者创建`webpack.config.js`配置文件。此时证明如果本地不存在`webpack`依赖包。则会找全局的依赖包进行打包执行。

如果在你的工程中忘记装`webpack`包的依赖。如果全局装了`webpack`依赖，依然会通过全局的`webpack`依赖进行打包。这样对发生的错误很难定位。所以全局的依赖包的版本会导致你的工程无法启动。

### 删除全局webpack依赖包,执行全局方法

```
// 删除全局webpack依赖包
npm uninstall webpack -g

// 在本地重新安装webpack4.x的依赖包
npm install webpack webpack-cli -D
```

终端运行`webpack`

::: danger
bash: /usr/local/bin/webpack: No such file or directory
:::

虽然本地有`webpack`依赖的包。但是终端运行全局命令的时候。需要全局下载对应的依赖包

::: tip
解决方案
:::

package.json
```
"scripts": {
    "build": "webpack"
},
```

在`package.json`文件中`script`运行脚本中添加`build`字段。运行命令为`webpack`
通过`npm run build`运行。运行时会先执行当前工程下`node_modules`中`.bin`目录下`webpack`命令。

### 通过script脚本运行依然固定不了执行依赖

如果当前工程删除`webpack`依赖。运行`npm run build`命令。依然会执行全局的`webpack`命令。此时`script`脚本设置的命令首先会从当前工程下的`node_modules`包的`.bin`目录寻找执行文件。如果不存在则通过全局安装的依赖包寻找。

进行测试:

```
// 删除本地工程的依赖包
npm uninstall webpack webpack-cli

// 添加全局的依赖包
npm install webpack@3.0.0 -g
```

运行npm run build

::: danger
No configuration file found and no output filename configured via CLI option.
A configuration file could be named 'webpack.config.js' in the current directory.
Use --help to display the CLI options.
:::

此时还是运行了`3.0`版本的`webpack`报错结果。

### 总结:

通过以上这些测试结果, 为了以上综上会出现的出误。最后的方案是:

1. 不要在全局下载对应的执行依赖包
2. 同时通过`script`脚本命令执行打包命令。
3. 在本地下载对应的执行依赖包。

