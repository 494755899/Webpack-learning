const path = require('path')
module.exports = {
    entry: './src/util.js',
    output: {
        path: path.resolve(__dirname, 'file'),
        filename: 'bundler.js'
    }
}