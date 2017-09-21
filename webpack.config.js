var path = require('path');
var webpack = require('webpack');

module.exports = {
     entry:[ './src/main.js', './scss/styles.scss'],
     output: {
         path: path.resolve(__dirname, 'build/js'),
         filename: 'main.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ],
         rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: []
                }
            }]
        }]
         
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };