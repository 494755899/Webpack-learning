module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //   test: /\.css$/,
      //   loader: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader','css-loader']
      // }
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader'
      //     }
      //   ]
      // }
    ]
  }
}