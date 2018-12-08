const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');
const path = require('path');

const globalStyles = /(vendor\.scss|main\.scss)/;

module.exports = {
    entry: {
        polyfills: './src/app/polyfills.ts',
        vendor: './src/app/vendor.ts',
        app: './src/app/app.main.ts',
        appStyle: './src/assets/scss/app/main.scss'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loaders: 'tslint-loader',
                exclude: ['node_modules', new RegExp('reflect-metadata\\' + path.sep + 'Reflect\\.ts')],
                options: {
                    emitErrors: false,
                    failOnHint: false
                }
            },
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: utils.root('src', 'tsconfig.json')}
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot|cur)$/i,
                loaders: ['url-loader?limit=10000']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
                exclude: globalStyles
            },
            {
                test: globalStyles,
                loaders: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                }, 'resolve-url-loader', 'sass-loader?sourceMap']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'resolve-url-loader', 'css-loader'],
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            utils.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
