var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/app/Controllers/index.ts',
        signin: './src/app/Controllers/signin.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 10000,
                        name: '[name].[ext]',
                        outputPath: "img/",
                        publicPath: "img/",
                        // limit: 2000000
                    }
                }]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/Views/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'signin.html',
            template: './src/app/Views/signin.html',
            chunks: ['signin']
        }),
    ],
    devServer: {
        contentBase: './dist'
    }
}