var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
const port = process.env.PORT || 9000
console.log(port)
const dashboard = new Dashboard()

module.exports = {
  context: __dirname +'/app',
  entry: './index.js',
  output: {
    path : __dirname +'/app',
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    inline:true,
    contentBase: 'app',
    quiet: true,
    host:'0.0.0.0',
    port: port,
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loaders: ['ng-annotate','babel'] },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loaders: ['style-loader','css-loader']},
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname,'index.html')}),
    new DashboardPlugin(dashboard.setData)
  ]
}
