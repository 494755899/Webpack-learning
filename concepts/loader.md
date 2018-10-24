# 转换器(loader)

loader是用模块进行转换。在遇到import或者require这些加载代码的时候，会对加载的文件后缀进行解析。相对webpack而言只能处理js后缀的文件,除此之外到4.x这个版本还可以处理.json、.txt文件。

而loader就是把其它文件的内容转换为javascript能处理的方式。比如把css文件写入javascript文件。在包打运行的时候。能够让css同样工作起来。再比如说typescript文件是浏览并不认识的文件。通过loader转化为javascript文件。只要想嵌入js文件中一起打包的非js文件。loader都能转换为能过行在浏览器中能运行的js文件。


## 通过cli命令行方式配置loader

下载file-loader对文件进行解析。

```
npm install file-loader
```

我们知道file-loader中要对图片资源进行解析。在概念阶段已经为大家讲解了如何通过webpack.config.js去配置一个loader

目录结构

```
.webpackProject
 |--src
 |   |--index.js
 |   |--xx.png
```

运行`webpack --module-bind 'png=file-loader'`

通过--module-bind参数指定当遇到png结尾的文件的时候，通过file-loader进行解析。但是此方法不建议。

::: tip
本节学习课程demo下载文件夹为[lesson14](https://github.com/494755899/Webpack-learning/tree/master/source)
:::


## 通过内文件引入内联的方式

文件目录

```
.webpackProject
 |--src
 |   |--index.js
 |   |--xx.png
```

下载file-loader对文件进行解析。

```
npm install file-loader
```

index.js

```
import imgs from 'file-loader!./xx.png'
var img = new Image();
img.src = imgs;
var body = document.querySelector('body');
body.appendChild(img);
```

如果不使用命令行cli的方式对image图片进行处理的情况下。可以通过内联的方式，在向主文件引入图片的时候。需要对引入图片路径之前写入需要用什么loader进行解析。通过！进行分隔。不建意使用

运行webpack

::: tip
本节学习课程demo下载文件夹为[lesson15](https://github.com/494755899/Webpack-learning/tree/master/source)
:::


## 通过webpack.config.js进行配置

在以上两种方法对loader进行配置的情况下。都是官方不建意的方式,只能说webpack有此功能。最直观最好定位错误的方式则是在webpack.config.js文件中进行loader的配置

```
.webpackProject
 |--src
 |   |--index.js
 |   |--xx.png
 |--webpack.config.js
```

webpack.config.js

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {loader: 'file-loader'}
        ]
      }
    ]
  }
}
```

通过配置文件webpack.config.js文件中定义module选项,定义rules规则。在rules数组中定义每个对象。每个对象意味着针对每个文件的解析的规则。

1. test: 解析所有.png结尾的文件
2. use: 通过那些loader方法进行解析

运行webpack

通过以上的方式进行配置loader,可以很直观,方便的把每个.png结尾的文件通过file-loader进行解析。

::: tip
本节学习课程demo下载文件夹为[lesson16](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 多匹配方案

对于图片而言,不光会有.png结尾的文件。同样还会存在.jpg等等后缀的文件。不用定义多个loader

::: warning 不友好的方式
```
module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {loader: 'file-loader'}
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {loader: 'file-loader'}
        ]
      }
    ]
  }
```
:::

::: tip 正确的方式
```
module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: [
          {loader: 'file-loader'}
        ]
      }
    ]
  }
```
:::

运行webpack

通过|管道符进行正则匹配。表示如果遇到jpg或者png结尾的文件。都通一通过file-loader进行解析。同样如果遇到jpeg文件。用同样的原理通过管道符再次添加

::: tip
本节学习课程demo下载文件夹为[lesson17](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## loader配置的三种写法

1. 通过在use字段直接定义数组字符串或者字符串定义loader,通过?后面跟参数选项。

webpack.config.js

```
module: {
  rules: [
    {
        test: /\.jpg$/,
        use: ['file-loader']
    },
    // 两者选一种
    {
        test: /\.jpg$/,
        use: 'file-loader?name=[name].[ext]'
    },
  ]
}
```

2. 通过loader字段直接定义数组或者字符串定义loader,通过?后面跟参数选项。

webpack.config.js

```
module: {
  rules: [
    {
      test: /\.jpg$/,
      loader: 'file-loader'
    },
    // 两者选一种
    {
      test: /\.jpg$/,
      loader: ['file-loader?name=[name].[ext]']
    },
  ]
}
```

3. 通过use字段定义数组对象方式

webpack.config.js

```
module: {
  rules: [
    {
      test: /\.jpg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          } 
        }
      ]  
    }
  ]
}
```

最后一种方式较为直观。通过use数组的方式用对象定义匹配到对应的文件后缀的时候需要经过那些loader进行解析
1. 通过loader字段写入需要通过什么loader进行解析。
2. 通过options字段,用对象方式存放每个loader的选项参数。


::: tip
本节学习课程demo下载文件夹为[lesson18](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 多个loader进行同时解析

对于css文件最后解析后能在页面中进行展示。不但需要css-loader,同时还城要style-loader。如何并行写入css-loader和style-loader作用在解析在一个文件后缀之上。

文件目录
```
.webpackProject
 |--src
 |   |--index.js
 |   |--style.css
 |--webpack.config.js
```

下载style-loader和css-loader

style.css

```
body {
  background: red;
}
```

1. 用loader字段直接定义数组字符串或者字符串

* 字符串需要通过!进行对loader进行分隔
* 数组字符串通过逗号进行分隔

```
module: {
  rules: [
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    // 两者选一种
    {
      test: /\.jpg$/,
      loader: ['style-loader', 'css-loader']
    },
  ]
}
```

2. 用use字段直接定义数组字符串

::: warning
use通过字符串利用!进行loader进行分隔会报错。并不会进行解析
:::

* use只能通过定义数组字符串的方式写入多个loader进行解析

```
module: {
  rules: [
    {
      test: /\.jpg$/,
      use: ['style-loader', 'css-loader']
    },
  ]
}
```

3. 通过use字段定义数组对象的方式写入多个loader进行解析

```
{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    }
  ]
}
```

同样笔者也是支持以上方式。利用数组对象的方式清晰的定义每个loader,因为此方式扩展性比较强、直观性都比较有优热。

::: tip
对于多个loader解析的方式,如果是字符串或者数组字符串定义。是从右到左的方式，经过每个loader进行解析。

如果是通过use组数对象进行解析的时候。是从下到上经过loader进行解析。

loader解析顺序决定着每个文件最终的解析结果
:::


::: tip
本节学习课程demo下载文件夹为[lesson19](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 总结:

这里简单的简绍了如何通过cli、内联、配置文件这三种方式进行配置loader对应解析的后缀文件。但是无论是官方还是笔者都建议用配置文件的方式对loader进行配置。对单个loader对应一个解析文件的时候。存在6种方案。
而通过多个loader对应一个解析文件的时候。存在5种方案。use字段定义字符串的方式不能通过!进行分隔。