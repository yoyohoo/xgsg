// nodejs 中的path模块
var path = require('path');
var root_path = path.resolve(__dirname);
var assets_path = path.resolve(root_path, 'src/assets');
var build_path = path.resolve(root_path, 'build');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    // entry: path.resolve(__dirname, '../app/main.js'),
    entry: {
        './scripts/main': path.resolve(__dirname, '../src/main.js')
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/dev'),
        publicPath: './',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.gif', '.png', '.jpg'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'Vue': 'vue/dist/vue.js'
        }
    },
    babel: {
        presets: ['es2015']
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: assets_path
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=100000&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true
        })
    ],
}