module.exports = {
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
}