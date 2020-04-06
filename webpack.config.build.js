const path = require('path');
const merge = require('webpack-merge');

const PATH_ROOT = path.resolve(__dirname);
const PATH_ASSETS = path.resolve(PATH_ROOT, 'assets');
const PATH_NPM_DIST = path.resolve(PATH_ROOT, 'dist');
const PATH_DEMO = path.resolve(PATH_ROOT, 'demo');
const PATH_SRC = path.resolve(PATH_ROOT, 'src');
const PATH_CONFIG_WEBPACK_BASE = path.resolve(__dirname, 'webpack.config.base.js');

const MINIMIZE_CSS = true;
const BUILD_SOURCE_MAP = true;

const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {

    const {module} = env;
    const baseConfig = require(PATH_CONFIG_WEBPACK_BASE);

    return merge([baseConfig(), {
        entry: path.resolve(PATH_SRC, 'index.ts'),
        output: {
            path: PATH_NPM_DIST,
            filename: `${module}.bundle.js`
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
            new CleanWebpackPlugin([`${PATH_NPM_DIST}`], {
                root: PATH_ROOT,
                verbose: false,
                dry: false
            }),
            new HtmlWebpackPlugin({
                hash: false,
                inject: 'body',
                template: path.resolve(PATH_DEMO, 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: `${module}.min.css`,
            }),
            new CopyPlugin([
                { from: PATH_ASSETS, to: PATH_NPM_DIST },
            ]),
        ],
        devtool: 'source-map'
    }]);
};