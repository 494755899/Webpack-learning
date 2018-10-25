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