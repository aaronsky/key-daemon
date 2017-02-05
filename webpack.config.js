const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, './src');
const distPath = path.resolve(rootPath, './dist');
const assetsPath = path.resolve(distPath, './assets');

module.exports = {
    context: srcPath,
    entry: {
        app: './index.js'
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: distPath
    },
    devtool: 'cheap-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({ use: 'css-loader' })
            },
            {
                test: /\.ttf$/,
                exclude: /node_modules/,
                loader: `file-loader`
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(srcPath, 'public', 'templates', 'index.template.ejs'),
            inject: 'body'
        }),
        new ExtractTextPlugin({ filename: '[name].css', allChunks: true })
    ]
}