# 解析器(loader)

`loader`是对模块进行转换。在遇到`import`或者`require`这些加载代码的时候，会对加载的文件后缀进行解析。相对`webpack`而言只能处理`js`后缀的文件,除此之外到4.x这个版本还可以处理`.json`、`.txt`文件。

而`loader`就是把其它文件的内容转换为`javascript`能处理的方式。比如把`css`文件写入`javascript`文件。在包打运行的时候。能够让`css`同样工作起来。再比如说`typescript`文件是浏览并不认识的文件。通过`loader`转化为`javascript`文件。只要想嵌入`js`文件中一起打包的非`js`文件。`loader`都能转换为能过行在浏览器中能运行的`js`文件。


## 通过cli命令行方式配置loader

下载`file-loader`对文件进行解析。

```
npm install file-loader
```

我们知道`file-loader`中要对图片资源进行解析。在概念阶段已经为大家讲解了如何通过`webpack.config.js`去配置一个`loader`

目录结构

```
.webpackProject
 |--src
 |   |--index.js
 |   |--xx.png
```

运行`webpack --module-bind 'png=file-loader'`

通过`--module-bind`参数指定当遇到`png`结尾的文件的时候，通过`file-loader`进行解析。但是此方法不建议。

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

下载`file-loader`对文件进行解析。

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

如果不使用命令行`cli`的方式对`image`图片进行处理的情况下。可以通过内联的方式，在向文件引入图片的时候。需要对引入图片路径之前写入需要用什么`loader`进行解析。通过`！`进行分隔。不建意使用

运行webpack

::: tip
本节学习课程demo下载文件夹为[lesson15](https://github.com/494755899/Webpack-learning/tree/master/source)
:::


## 通过webpack.config.js进行配置

在以上两种方法对`loader`进行配置的情况下。都是官方不建意的方式,只能说`webpack`有此功能。最直观最好定位错误的方式则是在`webpack.config.js`文件中进行`loader`的配置

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

通过配置文件`webpack.config.js`文件中定义`module`选项,定义`rules`规则。在`rules`数组中定义每个对象。每个对象意味着针对每个文件的解析的规则。

1. `test`: 解析所有`.png`结尾的文件
2. `use`: 通过那些`loader`方法进行解析

运行`webpack`

通过以上的方式进行配置`loader`,可以很直观,方便的把每个`.png`结尾的文件通过`file-loader`进行解析。

::: tip
本节学习课程demo下载文件夹为[lesson16](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 多匹配方案

对于图片而言,不光会有`.png`结尾的文件。同样还会存在`.jpg`等等后缀的文件。不用定义多个`loader`

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

运行`webpack`

通过`|`管道符进行正则匹配。表示如果遇到`jpg`或者`png`结尾的文件。都通一通过`file-loader`进行解析。同样如果遇到`jpeg`文件。用同样的原理通过管道符再次添加

::: tip
本节学习课程demo下载文件夹为[lesson17](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## loader配置的三种写法

1. 通过在`use`字段直接定义数组字符串或者字符串定义`loader`,通过`?`后面跟参数选项。

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

2. 通过`loader`字段直接定义数组或者字符串定义`loader`,通过`?`后面跟参数选项。

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

3. 通过`use`字段定义数组对象方式

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

最后一种方式较为直观。通过`use`数组的方式用对象定义匹配到对应的文件后缀的时候需要经过那些`loader`进行解析
1. 通过`loader`字段写入需要通过什么`loader`进行解析。
2. 通过`options`字段,用对象方式存放每个`loader`的选项参数。


::: tip
本节学习课程demo下载文件夹为[lesson18](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## 多个loader进行同时解析

对于`css`文件最后解析后能在页面中进行展示。不但需要`css-loader`,同时还需要`style-loader`。如何并行写入`css-loader`和`style-loader`作用在解析在一个文件后缀之上。

文件目录
```
.webpackProject
 |--src
 |   |--index.js
 |   |--style.css
 |--webpack.config.js
```

下载`style-loader`和`css-loader`

style.css

```
body {
  background: red;
}
```

1. 用`loader`字段直接定义数组字符串或者字符串

* 字符串需要通过`!`进行对`loader`进行分隔
* 数组字符串通过**逗号**进行分隔

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

2. 用`use`字段直接定义数组字符串

::: warning
`use`通过字符串利用`!`进行`loader`进行分隔会报错。并不会进行解析
:::

* `use`只能通过定义数组字符串的方式写入多个`loader`进行解析

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

3. 通过`use`字段定义数组对象的方式写入多个`loader`进行解析

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

同样笔者也是支持以上方式。利用数组对象的方式清晰的定义每个`loader`,因为此方式扩展性比较强、直观性都比较有优热。

::: tip
对于多个`loader`解析的方式,如果是字符串或者数组字符串定义。是从右到左的方式，经过每个`loader`进行解析。

如果是通过`use`组数对象进行解析的时候。是从下到上经过`loader`进行解析。

`loader`解析顺序决定着每个文件最终的解析结果
:::


::: tip
本节学习课程demo下载文件夹为[lesson19](https://github.com/494755899/Webpack-learning/tree/master/source)
:::

## options选项参数

options选项对于每个loader转对应的模块时,配置选项参数。通过配置选项参数可以对loader转换时进行特定的设置。比如file-loader可以在options中设置name参数。

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

设置`name`参数后可以对文件最后的路径、文件名、文件后缀可以进行需要的配置。

## 总结

这里简单的简绍了如何通过`cli`、`内联`、`配置`文件这三种方式进行配置`loader`对应解析的后缀文件。但是无论是官方还是笔者都建议用配置文件的方式对`loader`进行配置。对单个`loader`对应一个解析文件的时候。存在`6`种方案。
而通过多个`loader`对应一个解析文件的时候。存在`5`种方案。`use`字段定义字符串的方式不能通过`!`进行分隔。