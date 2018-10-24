module.exports = {
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: ['file-loader']
      },
      // {
      //   test: /\.jpg$/,
      //   use: 'file-loader'
      // },
      // {
      //   test: /\.jpg$/,
      //   loader: 'file-loader'
      // },
      // {
      //   test: /\.jpg$/,
      //   loader: ['file-loader?name=[name].[ext]']
      // },
      // {
      //   test: /\.jpg$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]'
      //       }
      //     }
      //   ]
      // }
    ]
  }
}