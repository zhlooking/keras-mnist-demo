const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


new WebpackDevServer(
  webpack({
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3009',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './src'
    ],
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: './index.html' }),
      new ExtractTextPlugin(`[name].css`),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.join(__dirname, './')
      }
    },
    node: {
      fs: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['next']
            }
          },
          include: [
            path.join(__dirname, './src'),
          ]
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader?-autoprefixer'],
        }, {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              'css-loader?-autoprefixer',
              'postcss-loader?sourceMap',
              'resolve-url-loader',
              'sass-loader?sourceMap',
            ],
            fallback: "style-loader",
          }),
        },
      ]
    }
  }),
  {
    publicPath: '/',
    hot: true,
    contentBase: './dist',
    historyApiFallback: true,
    stats: { colors: true }
  }
).listen(3009, 'localhost', error => {
  if (error) {
    throw error
  }
})
