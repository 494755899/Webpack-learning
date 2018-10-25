const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
}