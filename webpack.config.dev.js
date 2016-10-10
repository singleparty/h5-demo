var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //提取公共js
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //合并为一个css
var HtmlWebpackPlugin = require('html-webpack-plugin'); //修改html
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //压缩
var ProvidePlugin = webpack.ProvidePlugin;
var DefinePlugin = webpack.DefinePlugin; //设置变量
var NoErrorsPlugin = webpack.NoErrorsPlugin;
var WebpackMd5Hash = require('webpack-md5-hash'); //fix vendor chunkhash changes when bundle code changes
var ReloadPlugin = require('reload-html-webpack-plugin');
var path = require('path');
module.exports = {
    entry: {
        bundle: [
            './src/designer/js/main.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:9090'
        ],//我们开发时的入口文件
        vendor: [
            'vue',
            'vuex',
            'plupload',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:9090'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/', //给require.ensure用
        chunkFilename: 'js/[name].js' //给require.ensure用
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!less'
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=image/[name]-[hash:8].[ext]'
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html"
            }, {
                test: /\.(txt|swf|xap)$/,
                exclude: /node_modules/,
                loader: "file?name=file/[name]-[hash:8].[ext]"
            }, {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: "vue"
            }, {
                test: /\.js$/,
                exclude: [/node_modules/, /libs/],
                include: /src/,
                loader: "babel?presets[]=es2015&presets[]=stage-0!webpack-module-hot-accept"
            }, {
                test: require.resolve('./libs/jquery-1.9.1/jquery.js'), //jquery
                loader: 'exports?window.$'
            }, {
                test: require.resolve('./libs/plupload/js/plupload.full.min.js'), //plupload
                loader: 'imports?this=>window!exports?window.plupload,window.mOxie'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel?presets[]=es2015&presets[]=stage-0'
        }
    },
    resolve: {
        alias: {
            libs: __dirname + '/libs',
            common: __dirname + '/src/common',
            //设计器
            designer: __dirname + '/src/designer',
            coms: __dirname + '/src/designer/coms',
            edts: __dirname + '/src/designer/edts',
            store: __dirname + '/src/designer/store',
            //插件
            vue: __dirname + '/libs/vue-1.0.26/vue.dev.js',
            vuex: __dirname + '/libs/vuex-2.0.0/vuex.js',
            jquery: __dirname + '/libs/jquery-1.9.1/jquery.js',
            plupload: __dirname + '/libs/plupload/js/plupload.full.min.js'
        }
    },
    devtool: 'source-map',
    devServer: {
        //项目根目录，如果设置dist，无法访问其他文件夹静态资源
        //contentBase: 'dist',
        hot: true,
        publicPath: '/dist',
        port: 9090,
        host: '0.0.0.0',
        historyApiFallback: false,
        progress: true,
        lazy: false,
        stats: {
            colors: true
        },
        proxy: {
            '/backend/*': {
                target: 'http://localhost:82',
                changeOrigin: true,
                secure: false
            }
        }
    },
    /*externals: {
     'jquery': 'jQuery' //key是模块名，value是全局变量
     },*/
    plugins: [
        new NoErrorsPlugin(),
        new WebpackMd5Hash(),
        new ReloadPlugin(),
        new ProvidePlugin({
            Vue: 'vue'
        }),
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