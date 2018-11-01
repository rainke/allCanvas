const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry:'./src/index.ts',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'game.js'
    },
    devServer: {
        port: 5000,
        open: true
    },
    devtool: 'cheap-module-source-map',
    resolve:{
        extensions:['.ts', '.js', '.json'],
        alias: {
            assets: path.resolve(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                loader: "file-loader",
                options: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}