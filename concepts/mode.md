# 模式(mode)

## 模式介绍

`webpack4.x`提供了模式`mode`。`mode`同样也应对了零配置的优化方案。在不配置`webpack.config.js`文件的时候。通过默认配置的情况下。在概念部分已经提到了`mode`的警告提醒。默认情况下。会提供`production`生产模式。

同样`mode`不光有生产模式。一共存在三种模式

1. `proudction` 生产模式
2. `development` 开发模式
3. `none` 无任何模式。

> 模式的定义意思着什么？

在`development`和`production`两种模式下提供了不同的优化点。这并不需要开发者进行手动配置。会隐式的根据模式的不同自动添加一些佛系优化方案。何为佛系,笔者个人认为就是最实用的方案。

## 用法

> cli中的用法。

在运行`webpack`打包命令的时候。对`mode`进行配置的时候。需要能过`--mode`参数进行选项配置。

```
webpack --mode production 或者 --mode development
```

> 配置文件中的用法

```
module.exports = {
  mode: 'development'
  // 或者
  mode: 'production'
}
```


## 模式零配置的选项

development:

```
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- cache: true,
- performance: {
-   hints: false  
- },
- output: {
-   pathinfo: true
- },
- optimization: {
-   namedModules: true,
-   namedChunks: true,
-   nodeEnv: 'development',
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

production:

```
module.exports = {
+  mode: 'production',
- performance: {
-   hints: 'warning'  
- },
- output: {
-   pathinfo: false
- },
- optimization: {
-   namedModules: false,
-   namedChunks: false,
-   nodeEnv: 'production',
-   flagIncludedChunks: true,
-   occurrenceOrder: true,
-   sideEffects: true,
-   usedExports: true,
-   concatenateModules: true,
-   splitChunks: {
-     hidePathInfo: true,
-     minSize: 30000,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-   },
-   noEmitOnErrors: true,
-   checkWasmTypes: true,
-   minimize: true,
- },
- plugins: [
-   new UglifyJsPlugin(/* ... */),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-   new webpack.optimize.ModuleConcatenationPlugin(),
-   new webpack.NoEmitOnErrorsPlugin()
- ]
}
```

无论在生产模式还是在开发模式，只需要根据当前所处的环境配置对应的`mode`,可以省去一大堆的手动配置,特别对于`4.0`之前。以上这些配置都需要手动配置。关于内部省去的配置后续会进行一一详细介绍。

