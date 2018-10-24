module.exports = {
  entry: {
    index1: './src/index1.js',
    index2: './src/index2.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  }
}