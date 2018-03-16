const path = require('path')
const configs = require('./config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SentryPlugin = require('webpack-sentry-plugin')
const DefinePlugin = webpack.DefinePlugin


const toDefine = (configs) => {
  const option = {}
  for (let key in configs) {
    option[key] = JSON.stringify(configs[key])
  }
  return option
}

const configSentrySourceMap = (config) => {
  return {
    baseSentryURL: config.SENTRYBASEURL,
    organization: config.SENTRYORGANIZATION,
    project: config.SENTRYPROJECT,
    apiKey: config.SENTRYAPIKEY,

    release: config.VERSION,
    deleteAfterCompile: true
  }
}

module.exports = {
  entry: {
    main: path.join(__dirname, '../src'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 4
    }),
    new HtmlWebpackPlugin({
      template: '../index.html',
      inject: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new SentryPlugin(configSentrySourceMap(configs)),
    new DefinePlugin(toDefine(configs)),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../src'),
        ]
      }
    ]
  },
  devtool: 'source-map',
}
