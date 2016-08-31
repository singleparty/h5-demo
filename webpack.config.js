var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //提取公共js
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //合并为一个css
var lessExtractText = new ExtractTextPlugin('css/[contenthash:8]-all.css');
var cssExtractText = new ExtractTextPlugin('css/[contenthash:8]-vendor.css');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //修改html
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //压缩
var ProvidePlugin = webpack.ProvidePlugin;
var DefinePlugin = webpack.DefinePlugin; //设置变量
var NoErrorsPlugin = webpack.NoErrorsPlugin;
var path = require('path');
module.exports = {
    entry: {
        bundle: [
            './src/designer/js/main.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:9090'
        ]//我们开发时的入口文件
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[chunkhash:8]-[name].js',
        publicPath: '/dist/', //给require.ensure用
        chunkFilename: 'js/[chunkhash:8]-[name].js' //给require.ensure用
    },
    module: {
        loaders: [
            /*{
             test: require.resolve('./src/designer/js/test.js'),
             loader: 'imports?$=jquery'
             },*/
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?presets[]=es2015'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: lessExtractText.extract("style", "css!less")
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: cssExtractText.extract("style", "css")
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=[path][hash:8]-[name].[ext]'
            }, {
                test: /\.html$/,
                loader: "raw"
            }, {
                test: require.resolve('./libs/jquery-1.9.1/jquery.js'),
                loader: 'exports?window.$'
            }
        ]
    },
    resolve: {
        alias: {
            /*test: __dirname + '/src/designer/js/test.js',*/
            libs: __dirname + '/libs',
            common: __dirname + '/src/common',
            components: __dirname + '/src/components',
            designer: __dirname + '/src/designer',
            editors: __dirname + '/src/editors',
            publish: __dirname + '/src/publish',
            vue: __dirname + '/libs/vue-1.0.26/vue.dev.js',
            jquery: __dirname + '/libs/jquery-1.9.1/jquery.js',
            template: __dirname + '/libs/artTemplate-v3.0.0/dist/template.js'
        }
    },
    devtool: 'source-map',
    /*devServer: {
        proxy: {
            '*.php': {
                target: 'localhost:82',
                secure: false
            }
        }
    },*/
    /*externals: {
     'jquery': 'jQuery' //key是模块名，value是全局变量
     },*/
    plugins: [
        lessExtractText,
        cssExtractText,
        new NoErrorsPlugin(),
        /*new ProvidePlugin({
         Vue: 'vue'
         }),*/
        /*new UglifyJsPlugin({
         compress: {warnings: false}
         }),*/
        new HtmlWebpackPlugin({
            template: require.resolve('./src/designer/index.html'),
            favicon: require.resolve('./favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin('js/common.js'),
        new DefinePlugin({
            __DEV__: true
        })
    ]
};