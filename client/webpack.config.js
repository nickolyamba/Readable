const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',

    // Where files should be sent once they are bundled
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].js',
    },

    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3000,
        watchContentBase: true
    },

    // https://webpack.js.org/guides/asset-management/
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                },
                include: [
                    path.resolve(__dirname, './src'),
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                include: [
                    path.resolve(__dirname, './src/assets/images'),
                ],
                generator: {
                    filename: 'images/[name]-[contenthash].[ext]'
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [
                    path.resolve(__dirname, './src/assets/css'),
                ]
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            criticalCss: '',
            inject: false,
            minify: false,
            favicon: './public/favicon.ico'
        }),
    ],
}