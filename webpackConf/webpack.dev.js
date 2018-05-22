var merge = require('webpack-merge')
var baseWebpackConf = require('./webpack.base.config')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

var DevWebpackConf = merge(baseWebpackConf, {
    module: {
        rules: [
            {
                test: /\.(less|css)$/,//正则匹配拓展名为···的文件
                include: path.join(__dirname, '../src/less'),//需要被加载文件的路径
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join('/', 'index.html')},
            ],
        },
        contentBase: false,
        historyApiFallback: true,
        port: 3000,
        open: true,
        compress: true,
        inline: true,
        publicPath: '/',
        // quiet: true, // necessary for FriendlyErrorsPlugin
        hot: true,
        host: 'localhost'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
        /*new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {baseDir: ['../build/']}//会默认访问./build/index.html
        }),*/
    ]
})

module.exports = DevWebpackConf

