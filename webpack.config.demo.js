const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const PATH_ROOT = path.resolve(__dirname);
const PATH_DIST = path.resolve(PATH_ROOT, 'dist');
const PATH_DEMO = path.resolve(PATH_ROOT, 'demo');
const PATH_ASSETS = path.resolve(PATH_ROOT, 'assets');
const PATH_CONFIG_WEBPACK_BASE = path.resolve(__dirname, 'webpack.config.base.js');

const MINIMIZE_CSS = false;
const BUILD_SOURCE_MAP = true;
const DEMO_HOST = 'localhost';
const DEMO_PORT = 3000;

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {

    const baseConfig = require(PATH_CONFIG_WEBPACK_BASE);

    return merge([baseConfig(), {
        entry: [
            `webpack-dev-server/client?http://${DEMO_HOST}:${DEMO_PORT}`,
            'webpack/hot/only-dev-server',
            `${PATH_DEMO}/index`
        ],
        output: {
            path: PATH_DIST,
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.(css|less)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: BUILD_SOURCE_MAP,
                            minimize: MINIMIZE_CSS
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')],
                            sourceMap: BUILD_SOURCE_MAP
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: BUILD_SOURCE_MAP
                        }
                    }
                ]
            }]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CopyPlugin([
                { from: PATH_ASSETS, to: PATH_DIST },
            ]),
            new HtmlWebpackPlugin({
                hash: true,
                inject: 'body',
                template: path.resolve(PATH_DEMO, 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            })
        ],
        devServer: {
            host: DEMO_HOST,
            port: DEMO_PORT,
            hot: true,
            compress: true,
            historyApiFallback: true,
            watchContentBase: true,
            contentBase: PATH_DIST,
            stats: {
                assets: true,
                colors: true,
                children: false,
                entrypoints: false,
                modules: false
            }
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devtool: 'source-map'
    }]);
};