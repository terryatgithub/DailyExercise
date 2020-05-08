const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Handlebars = require('handlebars')

const devMode = process.env.NODE_ENv != 'production'

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //       styles: {
        //         name: 'styles',
        //         test: /\.css$/,
        //         chunks: 'all',
        //         enforce: true
        //       }
        //     }
        //   },
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ],
        usedExports: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[hash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.hbs$/i,
                loader: 'html-loader',
                options: {
                  preprocessor: (content, loaderContext) => {
                    let result;
        
                    try {
                      result = Handlebars.compile(content)({
                        firstname: 'Value',
                        lastname: 'OtherValue',
                      });
                    } catch (error) {
                      loaderContext.emitError(error);
        
                      return content;
                    }
        
                    return result;
                  },
                },
            },
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            //     options: {
            //         attributes: false,
            //         minimize: true,
            //         esModule: true
            //     }
            // },
            {
                test: /\.html$/i,
                use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
            },
            {
                test: /\.file.js$/i,
                loader: 'file-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /\.file\.css$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',
                    // 'sass-loader'
                ]
            },
            {
                test: /\.file.css$/i,
                loader: 'file-loader'
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/i,
                use: [
                    // 'file-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 18432
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // disable: true
                        }
                    }
                ]
            }
        ]
    }
}

