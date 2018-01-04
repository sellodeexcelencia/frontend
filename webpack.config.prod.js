var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')
const outputFileCss = 'assets/css/style.min.css'

const optionsDefinePLugin = {
  'process.env.NODE_ENV': JSON.stringify('production')
}

const optionsHtmlPlugin = {
  template: path.join(__dirname,'index.html')
}

const optionsUglifyPlugin = {
  compress: { warnings: false }
}

const optionsCopyPlugin = [
  {from : path.join(__dirname, 'app', 'assets'), to: path.join(__dirname,'dist','assets')}
]

module.exports = {
  context: __dirname +'/app',
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: __dirname+'/dist',
    filename: '[name].min.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loaders: ['ng-annotate','babel'] },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loaders: ['style-loader','css-loader']},
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(optionsDefinePLugin),
    new HtmlWebpackPlugin(optionsHtmlPlugin),
    new CopyWebpackPlugin(optionsCopyPlugin),
    new ExtractTextPlugin(outputFileCss),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(optionsUglifyPlugin)
  ]
}
