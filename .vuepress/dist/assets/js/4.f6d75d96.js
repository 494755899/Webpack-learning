(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{148:function(e,t,v){"use strict";v.r(t);var _=v(0),c=Object(_.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("div",{staticClass:"content"},[v("h1",{attrs:{id:"概念"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#概念","aria-hidden":"true"}},[e._v("#")]),e._v(" 概念")]),e._v(" "),v("p",[v("code",[e._v("webpack")]),e._v("是一个现代化的"),v("code",[e._v("Javascript")]),e._v("应用程序的静态模块的打包工具,所谓的静态模块包含页面程序展示所需的一切。比如("),v("strong",[e._v("图片、样式、交互行为")]),e._v(")等代码。同时它会递归构建一个依赖关系图。然后根据配置打包成一个或者多个模块"),v("code",[e._v("(bundle)")])]),e._v(" "),v("blockquote",[v("p",[e._v("通过这里可以了解"),v("code",[e._v("Javascript")]),e._v("模块和"),v("code",[e._v("webpack")]),e._v("模块的信息")])]),e._v(" "),v("p",[e._v("在学习整个"),v("code",[e._v("webpack")]),e._v("的前题下需要知道几个基本的配置和"),v("code",[e._v("4.0")]),e._v("版本特有零配置方案。"),v("code",[e._v("4.0")]),e._v("虽然加入了零配置的方案,但还是可以针对项目进行高度集成配置。首先看一下以下五个核心的概念:")]),e._v(" "),v("table",[v("thead",[v("tr",[v("th",[e._v("解释")]),e._v(" "),v("th",{staticStyle:{"text-align":"center"}},[e._v("配置名")]),e._v(" "),v("th",[e._v("版本新增选项")])])]),e._v(" "),v("tbody",[v("tr",[v("td",[e._v("入口")]),e._v(" "),v("td",{staticStyle:{"text-align":"center"}},[e._v("entry")]),e._v(" "),v("td",[e._v("-")])]),e._v(" "),v("tr",[v("td",[e._v("输出")]),e._v(" "),v("td",{staticStyle:{"text-align":"center"}},[e._v("output")]),e._v(" "),v("td",[e._v("-")])]),e._v(" "),v("tr",[v("td",[e._v("转化器")]),e._v(" "),v("td",{staticStyle:{"text-align":"center"}},[e._v("loader")]),e._v(" "),v("td",[e._v("-")])]),e._v(" "),v("tr",[v("td",[e._v("插件")]),e._v(" "),v("td",{staticStyle:{"text-align":"center"}},[e._v("loader")]),e._v(" "),v("td",[e._v("-")])]),e._v(" "),v("tr",[v("td",[e._v("模式")]),e._v(" "),v("td",{staticStyle:{"text-align":"center"}},[e._v("mode")]),e._v(" "),v("td",[e._v("4.0x")])])])]),e._v(" "),v("h2",{attrs:{id:"入口-entry"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#入口-entry","aria-hidden":"true"}},[e._v("#")]),e._v(" 入口(entry)")]),e._v(" "),v("p",[e._v("入口起点"),v("code",[e._v("(entry point)")]),e._v("告诉"),v("code",[e._v("webpack")]),e._v("应该从那个模块开始进行构建内部依赖，进入入口之后，"),v("code",[e._v("webpack")]),e._v("会通过递归的方式通过配置进行寻找那些库和文件是入口起点文件的直接或者间接依赖。")]),e._v(" "),v("p",[e._v("模块被"),v("code",[e._v("webpack")]),e._v("处理之后，会被打包到指定的输出文件夹中。这里需要通过"),v("code",[e._v("output")]),e._v("进行配置，关于output的介绍会在第三章讲解。")]),e._v(" "),v("p",[e._v("通过"),v("code",[e._v("webapck")]),e._v("的"),v("code",[e._v("entry")]),e._v("起点配置中，可以指定一个入口或者多个入口。")]),e._v(" "),v("blockquote",[v("p",[e._v("对于零配置来说，默认入口文件夹为当前工程的根目录"),v("code",[e._v("src")]),e._v("文件夹，以下有示意图")])]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("webpackProject\n│\n└───src\n│   │--index.js  写入一些内容\n")])])]),v("p",[e._v("在\b\b终端进入"),v("code",[e._v("webpackProject")]),e._v("根目录下\b执行\b"),v("code",[e._v("webpack")]),e._v("打包命令,【"),v("strong",[e._v("必须保证全局安装了webpack-cli")]),e._v("】")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("// 在终端中运行\nwebpack\n")])])]),v("p",[e._v("执行结果:")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("webpackProject\n│\n└───dist\n|   |--main.js\n└───src\n│   │--index.js  写入一些内容\n")])])]),v("p",[e._v("执行结果会在当前工程的根目录下创建"),v("code",[e._v("dist")]),e._v("文件夹，同时打包后的文件名为"),v("code",[e._v("main.js")]),e._v("。可以很清楚的明白如果零配置的情况下,会默认读取"),v("code",[e._v("src")]),e._v("目录下的"),v("code",[e._v("index.js")]),e._v("文件，打包后输出到同级的"),v("code",[e._v("dist")]),e._v("目录下,输出文件名为"),v("code",[e._v("main.js")]),e._v("。")]),e._v(" "),v("blockquote",[v("p",[e._v("注意: 会发生的错误")])]),e._v(" "),v("p",[e._v("如果"),v("code",[e._v("src")]),e._v("目录下的"),v("code",[e._v("js")]),e._v("文件名不为"),v("code",[e._v("index.js")]),e._v(",假设重命名为"),v("code",[e._v("util.js")])]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("webpackProject\n│\n└───src\n│   │--util.js  写入一些内容\n")])])]),v("h3",{attrs:{id:"报错内容"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#报错内容","aria-hidden":"true"}},[e._v("#")]),e._v(" 报错内容")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("Insufficient number of arguments or no entry found.\nAlternatively, run 'webpack(-cli) --help' for usage info.\n\nERROR in Entry module not found: Error: Can't resolve './src' in '/Users/ziksang/Desktop/webpackProject'\n")])])]),v("p",[e._v("报错的原因是因为在"),v("code",[e._v("webpack")]),e._v("零配置的情况下，默认是读取"),v("code",[e._v("webpackProject")]),e._v("工程根目录下"),v("code",[e._v("src/index.js")]),e._v("文件，所以webpack提示从根目录读取不到"),v("code",[e._v("./src/index.js")]),e._v("入口文件。")]),e._v(" "),v("blockquote",[v("p",[e._v("解决方案:")])]),e._v(" "),v("p",[e._v("接下来介绍通过"),v("code",[e._v("webpack.config.js")]),e._v("配置文件进行特定入口\b配置。")]),e._v(" "),v("h2",{attrs:{id:"配置-configuration"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#配置-configuration","aria-hidden":"true"}},[e._v("#")]),e._v(" 配置(configuration)")]),e._v(" "),v("p",[v("code",[e._v("webpack.config.js")]),e._v("文件是"),v("code",[e._v("webpack")]),e._v("默认读取配置的文件，需要存放在"),v("code",[e._v("webpackProject")]),e._v("工程的根目录下，"),v("code",[e._v("webpack")]),e._v("默认会在工程的根目录下读取"),v("code",[e._v("webpack.config.js")]),e._v("配置指示"),v("code",[e._v("webpack")]),e._v("该如何打包。")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("webpackProject\n│\n└───src\n│   │--util.js  写入一些内容\n|---|\n└───webpack.config.js  配置内容\n\n")])])]),v("p",[e._v("此时想要把打包入口文件的名称改成"),v("code",[e._v("util.js")]),e._v("。需要通过额外的"),v("code",[e._v("webpack.config.js")]),e._v("文件进行打包指示的配置,同时只会\b根据已配的选项进行指示打包,否则其余的配置改将会走默认零配置方案")]),e._v(" "),v("p",[e._v("webpack.config.js")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("module.exports = {\n    entry: './src/util.js'\n}\n")])])]),v("blockquote",[v("p",[e._v("回顾 入口(entry):")])]),e._v(" "),v("p",[e._v("在讲解"),v("code",[e._v("entry")]),e._v("入口的时候并没有配置"),v("code",[e._v("webpack.config.js")]),e._v("配置文件，只会走"),v("code",[e._v("webpack")]),e._v("默认零配置的方案，零配置会默认读取当前根目录下"),v("code",[e._v("./src/index.js")]),e._v("文件进行打包。如果把入口文件index.js\b改为util.js,将会报错。如果进行特定入口配置，此时需要在"),v("code",[e._v("webpack.config.js")]),e._v("配置文件中进行对应的配置。")]),e._v(" "),v("p",[v("code",[e._v("webpack")]),e._v("运行的时候会试探寻找根目录下是否有"),v("code",[e._v("webpack.config.js")]),e._v("文件。如果根目录下存在"),v("code",[e._v("webpack.config.js")]),e._v(",会根据"),v("code",[e._v("webpack.config.js")]),e._v("文件的配置项进行指示打包。")]),e._v(" "),v("p",[e._v("在根目录配置好"),v("code",[e._v("webpack.config.js")]),e._v("中的入口选项之后,运行"),v("code",[e._v("webpack")]),e._v("命令。")]),e._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[e._v("webpackProject\n│\n└───dist\n|   |--main.js\n└───src\n│   │--util.js \n")])])]),v("p",[e._v("打包完成后可以发现。在"),v("code",[e._v("webpackProject")]),e._v("工程的根目录下，最后输出在"),v("code",[e._v("dist")]),e._v("目录下，名为"),v("code",[e._v("main.js")]),e._v("。从中可以明白一个道理。如果通过"),v("code",[e._v("webpack.config.js")]),e._v("配置的选项"),v("code",[e._v("entry")]),e._v(","),v("code",[e._v("webpack")]),e._v("会根据"),v("code",[e._v("webpack.config.js")]),e._v("中的配置项进行指令打包。但是其余的所有配置将会依然会进行"),v("code",[e._v("webpack")]),e._v("零配置的默认配置项。")]),e._v(" "),v("h2",{attrs:{id:"出口-output"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#出口-output","aria-hidden":"true"}},[e._v("#")]),e._v(" 出口(output)")]),e._v(" "),v("p",[e._v("output是告诉webpack最后输出最后的bundles所存放的目录，以及如何命名打包后的文件名。从入口(entry)的演示可以看出默认配置输出到当前根目录下的dist文件夹下，同时输出的文件名命名为main.js,所有最后打包的应用程序都会存放在main.js文件夹下。同样你可以在配置文件中对output选项进行字段配置。比如说指定输出目录、指定输出文件名称，用这些来处理自己理想的程序输出。")])])}],!1,null,null,null);c.options.__file="README.md";t.default=c.exports}}]);