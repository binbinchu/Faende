//清除
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseWebpackConf = require('./webpack.base.config');
var merge = require('webpack-merge')
var webpack = require('webpack')
var path = require('path')

const prodWebpackConf = merge(baseWebpackConf, {
    output: {//输出文件
        path: path.resolve(__dirname, '../build'),// 输出js和图片的目录
        filename: 'js/[name].[chunkhash:8].js',
        publicPath: './'
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.less$/,//正则匹配拓展名为···的文件
                include:
                    path.join(__dirname, '../src/less'),//需要被加载文件的路径
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 表示通过@import进来的css也要解析一下

                        }
                    }, 'less-loader'],
                    publicPath: '../'
                })
            }
        ]
    },
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join('/', 'index.html')},
            ],
        },
        contentBase: false,
        historyApiFallback: true,
        port: 4000,
        open: true,
        compress: true,
        inline: true,
        publicPath: '/',
        // quiet: true, // necessary for FriendlyErrorsPlugin
        hot: true,
        host: 'localhost'
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new CleanWebpackPlugin(
            /* ['build/!*'],　 //匹配删除的文件
             {
                 root: __dirname,  //根目录
                 verbose: true,  //开启在控制台输出信息
                 dry: false    //启用删除文件
             }*/
            ['build/*'],{
                root: process.cwd(),
                exclude: []
            }
        ),
        // new UglifyJSPlugin({
        //     beautify:true
        // }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: false,
            quote_keys:true,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap:true
        }),
        new ExtractTextPlugin("css/[name].[contenthash:8].css"),
    ]
})


module.exports = prodWebpackConf


