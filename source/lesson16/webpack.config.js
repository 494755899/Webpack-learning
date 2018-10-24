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