//process.noDeprecation = true;
var path = require('path');
var webpack = require('webpack');
var es3ifyPlugin = require('es3ify-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var glob = require('glob')

function getEntries(path) {
    var entryFiles = glob.sync(path)
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}


const entries = getEntries('./src/pages/**/*.js');
entries['lib'] = ['jquery','react','swiper'];
const webpackConfig = {
    entry: entries,
    output: {//输出文件
        path: path.resolve(__dirname, '../build'),// 输出js和图片的目录
        filename: 'js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(__dirname, '../src/js/components/')
        },
    },
    module: {//模块加载器配置
        rules: [{
            test: /\.html$/,
            exclude: /node_modules/,//这个文件除外
            loader: 'html-loader'
        }, {
            test: /\.js?$/,
            // include: path.join(__dirname, './src/js'),
            exclude: path.join(__dirname, 'node_modules'),
            loader: 'babel-loader'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=srclication/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },{
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name]-[hash:8].[ext]',
                    }
                }]
            }]

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common', 'lib'],
            minChunks: 2
        }),
        new webpack.ProvidePlugin({
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            'jQuery': 'jquery',
            '$': 'jquery',
        }),
        new es3ifyPlugin()

    ]
};

for (let key of Object.keys(entries)) {
    let conf = {
        filename: `${key}.html`,//生成的html及存放路径，相对于path
        template: `./src/pages/${key}/index.html`,//载入文件及路径
        publicPath: "js/",//这是build文件下html文件引用js文件的路径
        chunks: ['lib', 'common', `${key}`],//需要引入的chunk，不配置就会引入所有页面的资源
    }
    if (key == "lib") {
        break;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}


module.exports = webpackConfig;