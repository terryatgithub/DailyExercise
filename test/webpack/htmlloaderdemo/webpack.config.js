const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'js/bundle-[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
  module: {
    rules: [
        {
            test: /\.(html)$/,
            use: [
                // {
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name][hash].[ext]'
                //     }
                // },
                // 'extract-loader',
                {
                    loader: path.resolve('./src/loader.js'),
                    options: {
                        name: '<h1>Yuan Bo loader: </h1>'
                    }
                },
                {
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src'
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src'
                                },
                                {
                                    tag: 'audio',
                                    attribute: 'src',
                                    type: 'src'
                                }
                            ]
                        },
                        minimize: false
                    }
                }
        ]
        },
        {
            test: /\.(png|gif|svg|jpe?g)$/i,
            use: {
                loader: 'url-loader'
            }
        }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        // inject: 'head', //脚本注入到头部
        minify: {
            removeComments: true, //去除注释
            collapseWhitespace: false //去掉空格
        }
    }),
  ]
};
 