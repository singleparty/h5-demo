var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //提取公共js
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //合并为一个css
var HtmlWebpackPlugin = require('html-webpack-plugin'); //修改html
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //压缩
var ProvidePlugin = webpack.ProvidePlugin;
var DefinePlugin = webpack.DefinePlugin; //设置变量
var NoErrorsPlugin = webpack.NoErrorsPlugin;
var WebpackMd5Hash = require('webpack-md5-hash'); //fix vendor chunkhash changes when bundle code changes
var path = require('path');
module.exports = {
    entry: {
        bundle: [
            './src/designer/js/main.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:9090'
        ],//我们开发时的入口文件
        vendor: ['vue']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/', //给require.ensure用
        chunkFilename: 'js/[name]-[chunkhash:8].js' //给require.ensure用
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style", "css!less")
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style", "css")
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=image/[name]-[hash:8].[ext]'
            }, {
                test: /\.html$/,
                loader: "raw"
            }, {
                test: /\.(txt|swf|xap)$/,
                exclude: /node_modules/,
                loader: "file?name=file/[name]-[hash:8].[ext]"
            }, {
                test: require.resolve('./libs/jquery-1.9.1/jquery.js'), //jquery
                loader: 'exports?window.$'
            }, {
                test: require.resolve('./libs/plupload/js/plupload.full.min.js'), //plupload
                loader: 'imports?this=>window!exports?window.plupload,window.mOxie'
            }
        ]
    },
    resolve: {
        alias: {
            libs: __dirname + '/libs',
            common: __dirname + '/src/common',
            //设计器
            designer: __dirname + '/src/designer',
            components: __dirname + '/src/designer/components',
            editors: __dirname + '/src/designer/editors',
            plugins: __dirname + '/src/designer/plugins',
            //插件
            vue: __dirname + '/libs/vue-1.0.26/vue.dev.js',
            jquery: __dirname + '/libs/jquery-1.9.1/jquery.js',
            plupload: __dirname + '/libs/plupload/js/plupload.full.min.js'
        }
    },
    devtool: 'source-map',
    devServer: {
        proxy: {
            '/backend/*' : {
                target: 'http://localhost:82/',
                changeOrigin: true,
                secure: false
            }
        }
    },
    /*externals: {
     'jquery': 'jQuery' //key是模块名，value是全局变量
     },*/
    plugins: [
        new ExtractTextPlugin('css/all-[contenthash:8].css'),
        new NoErrorsPlugin(),
        new WebpackMd5Hash(),
        /*new ProvidePlugin({
         Vue: 'vue'
         }),*/
        /*new UglifyJsPlugin({
         compress: {warnings: false}
         }),*/
        new HtmlWebpackPlugin({
            template: require.resolve('./src/designer/index.html'),
            favicon: require.resolve('./favicon.ico'),
            chunks: ['bundle', 'vendor']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['bundle', 'vendor'],
            minChunks: Infinity
        }),
        new DefinePlugin({
            __DEV__: true
        })
    ]
};