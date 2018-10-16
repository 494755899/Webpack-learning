## fdsfdsa

> 修改webpack.config.js配置文件名称

对于webpack.config.js而言并没有限定一定要在根目录下或者一定需要文件命webpack.config.js。通常整个完整工程在webpack配置下必然会分为两套环境，development和production环境。此时执行的配置文件必然也不同，同时语义也不够强烈。


```
webpackProject
│
└───src
│   │--util.js
|---|
└───build
|   |--prod.config.js
```

在build目录下分别创建prod.config.js，对应着生产环境的配置。同时写入以下配置代码:

```
module.exports = {
    entry: '../src/util.js'
}
```

在命行运行**webpack**

运行时程序报错了，依然和上篇介绍entry入口一样的报错。并没有找到./src/index.js。**说明什么？**

说明运行webpack命令没有指定任何参数的时候，webpack默认只会从根目录下读取webpack.config.js文件进行指令打包。如果没有读取到，则会走零配置的默认打包方案，从当前目录src/index.js中找打包入口。

> 解决方案

需要自定义打包配置文件的文件名或者打包文件的目录结构的时候，需要配置命令行参数，通过--config [指定需要读取配置文件的地址，从根目录算起]

```
// 运行
webpack --config build/prod.config.js
```



```
webpackProject
│
└───dist
|   |--main.js
└───src
│   │--index.js  写入一些内容
└───build
|   |--prod.config.js
```