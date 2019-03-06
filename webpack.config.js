const path = require('path');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = [
    // JS
    {
        mode: 'production',
        entry: {
            js: './src/index.js'
        },
        output: {
            filename: 'toast.min.js',
            chunkFilename: '[id].[hash:8].js',

            path: path.resolve(__dirname, 'dist'),
            library: 'toast',
            libraryTarget: 'window',
            libraryExport: 'default'
        },
        plugins: [
            new UnminifiedWebpackPlugin(),
        ],
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }]
        }
    },
    // CSS
    {
        mode: 'production',
        entry: {
            styles: './src/less/toast.less'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'toast.css',
                chunkFilename: "[id].css"
            })
        ],
        module: {
            rules: [{
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }]
        },
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                cacheGroups: {
                  styles: {
                    name: 'styles',
                    test: /\.less$/,
                    chunks: 'all',
                    enforce: true
                  }
                }
              }
        }
    }
];