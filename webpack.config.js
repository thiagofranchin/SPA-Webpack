const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    devServer: {
        contentBase: './build',
        port: 8080
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "style.css" }),
        new CopyWebpackPlugin([
            { context: 'src/assets/', from: '**/*.html' },
            { context: 'src/assets/', from: 'imgs/**/*' }
        ])
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader, // Tira o CSS do arquivo JS e coloca em um CSS
                // 'style-loader', // Add o CSS a DOM injetando a tag <style>
                'css-loader', // Interpreta @import, url()...
                'sass-loader',
            ]
        },{
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: ['file-loader']
        },{
            test: /\.(ttf|otf|eot|svg|png|woff(2)?)$/,
            use: ['file-loader']
        }]
    }
}

