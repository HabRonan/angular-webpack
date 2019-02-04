const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const commonConfig = require('./webpack.common.js');
const utils = require('./utils');
const PROXY_PORT = 10600;
const PROXY_CONFIG_PATH = './test/proxy-server/config-java.json';
const PROXY_MOCK_CONFIG_PATH = './test/proxy-server/config-mock.json';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let proxyConfigPath = PROXY_CONFIG_PATH;

function conf() {
   return webpackMerge(commonConfig, {
       entry: './src/main.ts',
       output: {
           path: __dirname + '/dist',
           filename: '[name].js'
       },

       plugins: [
           new ExtractTextPlugin('[name].css'),
           new WebpackShellPlugin({
               onBuildEnd: [
                   `nodemon ./test/proxy-server/proxy.js --watch ./test/proxy-server --port ${PROXY_PORT} --cfg ${proxyConfigPath}`,
                   'nodemon ./test/mock-server/server.js --watch ./test/mock-server'
               ]
           })
       ],

       // plugins: [
       //     new ExtractTextPlugin('[name].css'),
       //     new CopyWebpackPlugin([
       //         { from: 'src/assets', to: 'assets'}
       //     ]),
       //     new HtmlWebpackPlugin({
       //         template: __dirname + '/src/index.html',
       //         output: __dirname + '/dist',
       //         inject: 'head'
       //     })
       // ]
   });
}

module.exports = function (env) {
    if(env && env.mock === 'true') {
        proxyConfigPath = PROXY_MOCK_CONFIG_PATH;
    }
    return conf();
};




// const webpackMerge = require('webpack-merge');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const WebpackShellPlugin = require('webpack-shell-plugin');
// const commonConfig = require('./webpack.common.js');
// const utils = require('./utils');

// const PROXY_PORT = 10500;
// const PROXY_CONFIG_PATH = './test/proxy-server/config-java.json';
// const PROXY_MOCK_CONFIG_PATH = './test/proxy-server/config-mock.json';

// let proxyConfigPath = PROXY_CONFIG_PATH;

// function conf() {
//     return webpackMerge(commonConfig, {
//         devtool: 'source-map',
//
//         output: {
//             path: utils.root('dist'),
//             publicPath: '/',
//             filename: '[name].js',
//             chunkFilename: '[id].chunk.js'
//         },
//
//         plugins: [
//             new ExtractTextPlugin('[name].css'),
//             new WebpackShellPlugin({
//                 onBuildEnd: [
//                     `nodemon ./test/proxy-server/proxy.js --watch ./test/proxy-server --port ${PROXY_PORT} --cfg ${proxyConfigPath}`,
//                     'nodemon ./test/mock-server/server.js --watch ./test/mock-server'
//                 ]
//             })
//         ],
//
//         devServer: {
//             historyApiFallback: true,
//             stats: 'minimal',
//             proxy:{
//                 '/api': `http://localhost:${PROXY_PORT}`
//             }
//         }
//     });
// };


// module.exports = function (env) {
//     if(env && env.mock === 'true') {
//         proxyConfigPath = PROXY_MOCK_CONFIG_PATH;
//     }
//     return conf();
// };
