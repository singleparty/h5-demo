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
        bundle: ['./src/designer/js/main.js'],
        vendor: ['vue', 'vuex', 'plupload']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash:8].js',
        publicPath: './', //给require.ensure用
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
                exclude: /node_modules/,
                loader: "raw"
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
                loader: "babel?presets[]=es2015"
            }, {
                test: require.resolve('./libs/jquery-1.9.1/jquery.min.js'), //jquery
                loader: 'exports?window.$'
            }, {
                test: require.resolve('./libs/plupload/js/plupload.full.min.js'), //plupload
                loader: 'imports?this=>window!exports?window.plupload,window.mOxie'
            }
        ]
    },
    vue: {
        loaders: {
            less: ExtractTextPlugin.extract('css!less')
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
            vue: __dirname + '/libs/vue-1.0.26/vue.min.js',
            vuex: __dirname + '/libs/vuex-2.0.0/vuex.min.js',
            jquery: __dirname + '/libs/jquery-1.9.1/jquery.min.js',
            plupload: __dirname + '/libs/plupload/js/plupload.full.min.js'
        }
    },
    /*externals: {
     'jquery': 'jQuery' //key是模块名，value是全局变量
     },*/
    plugins: [
        new ExtractTextPlugin('css/all-[contenthash:8].css'),
        new NoErrorsPlugin(),
        new WebpackMd5Hash(),
        new ProvidePlugin({
            Vue: 'vue'
        }),
        new UglifyJsPlugin({
            compress: {warnings: false},
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
        new HtmlWebpackPlugin({
            template: require.resolve('./src/designer/index.html'),
            favicon: require.resolve('./favicon.ico'),
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            chunks: ['bundle', 'vendor']
        }),
        //new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['bundle', 'vendor'],
            minChunks: Infinity
        }),
        new DefinePlugin({
            __DEV__: false
        })
    ]
};