const path = require('path');

const PATH_ROOT = path.resolve(__dirname);
const PATH_MODULES = path.resolve(PATH_ROOT, 'src', 'module');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = function () {
    return {
        entry: 'override',
        output: {
            path: 'override',
            filename: 'override',
            libraryTarget: 'umd',
            library: '[name]'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                    loaders: {
                        ts: 'ts-loader'
                    },
                    esModule: true
                }
            }, {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    onlyCompileBundledFiles: true,
                    appendTsSuffixTo: [/\.vue$/]
                }
            }, {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: [PATH_MODULES],
                exclude: /node_modules/
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        name: '[name].[ext]',
                        publicPath: '/fonts'
                    }
                }
            }]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            modules: [
                path.resolve(__dirname, 'node_modules')
            ],
            extensions: ['.tsx', '.ts', '.js', '.vue']
        },
        plugins: [
            new VueLoaderPlugin()
        ]
    }
};
