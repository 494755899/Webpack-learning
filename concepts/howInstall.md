# 安装

## 前提条件

关于webapck安装有好几种方式，在安装webpack请确保安装了Node.js最新的版本,因为webapck是运行在node.js之上的。最新的webpack运行时对应的是node.js特定的版本api/或者缺少相关的包。请确保node.js为最新的长期支持版本(LTS - Long Term Support)

## 全局安装

可以通过全局安装webapck

```
npm install webapck -g
```

此时安装的是4.x以上的版本,如果需要安装指定版本:

```
npm install webpack@<version> -g
```

全局安装webapck有什么用？

通过全局安装webpack,可以在任何系统目录下运行webpack的命令。

常试在终端中进入作意目录下运行webapck -v,查看webpack的版本:

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

在webpack4.x中,webpack分离出了webapck-cli,运行webpack必须安装webpack-cli。因为是进行全局常试,退出后通过命令安装webpack-cli:

```
npm install webpack-cli -g
```

现在全局的node_module包中已经存在webpack与webpack-cli两个全局包了。

进入:

```
cd /usr/local/lib/node_modules
```

可以查看到全局的node_modules已经安装webpack与webpack-cli,同时会根据webpack中package.json中的bin选项在/usr/local/bin目录下创建一个可执行文件的软连接,本质上其实两者就是一个引用关系。

```
"bin": {
    "webpack": "./bin/webpack.js"
},
```

1. 可执行文件名就是根据bin目录的字段名启动。
2. 启动时运行的则是webpack属笥的值,通过bin目录下运行webpack.js文件

## 理解package.json作用

首先创建一个工程

```
mkdir webpackProject
```

接着需要添加一个package.json文件。那什么是package.json, 起了什么作用?

package.json就是一个就是管理你本地安装的npm包

1. 展示项目所依赖的npm包
2. 允许你指定一个包的版本(范围)
3. 让你建立起稳定，意味着你可以更好的与其他开发者共享

当新的成员加入开发你的项目的时候，通过package.json中记录的依赖包可以让新成员可以通过npm install准确的下载项目所依赖的对应版本包。

在本地安装依赖的时候，对安装后的依赖描述可以分为两种

1. npm install xxx --save

--save 后的依赖描述会被添加到package.json中的dependencies字段中。表示此时下载的包最后是代码运行时所依赖的包。比如说jquery。在生产环境的代码中，需要通过jquery去进行dom操作

2. npm install xxx --save-dev

--save-dev 后的依赖描述会被添加到package.json中的devDependencies字段中。表示此时下载的包不会被打包或者作用在运行时的代码中。比如说wepback依赖包，只是在开发或者或者上线时对代码进行打包和一系列操作,webpack包的代码并不会在生产代码中出现。

## 本地安装

进入webpackProject根目录,运行npm init,通过回答的方式配置你的package.json文件，或者直接npm init -y直接生成默认配置的package.json的默认文件。

```
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

依赖存放简写的方式

```
npm install webpack --D
npm install webpack-cli --D
```

同时下载多个包

```
npm install webpack webpack-cli --D
```

::: warning
如果同时下载多个包--save-dev 与 --save两种模式的包需要进行区分

错误的方式:

npm install webpack jquery -D

因为jquery是生产中需要的依赖包所以不建意用-D
:::


在本地安装完webpack与webpack-cli的时候请查看package.json中的文件

```
"devDependencies": {
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2"
}
```

发现package.json中多一个devDependencies的字段。对象中有两个非生产代码依赖的包。同时还有对应当下载的版本号。

