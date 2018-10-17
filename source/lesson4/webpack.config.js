const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/util.js',
    output: {
        path: path.resolve(__dirname, 'file'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.jpeg$/, loader: 'url-loader'}
        ]
    }
}