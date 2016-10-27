var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "eval",

  entry: {
    vendor: [__dirname + "/vendor.js", 'webpack-hot-middleware/client', 'webpack/hot/dev-server'], 
    app: [__dirname + "/app.js", 'webpack-hot-middleware/client', 'webpack/hot/dev-server']
  },

  output: {
    //path: __dirname + '/../../dist',
    path: '/',
    publicPath: 'http://localhost:3000/',
    filename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot-loader/webpack', 'babel?' + JSON.stringify({
           presets: ['es2015', 'react']
         })],
        exclude: /node_modules/
        // query: {
        //   presets: ['es2015', 'react']
        // }
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },

  plugins: [
    // webpack-hot-middleware
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    }),
    new ExtractTextPlugin('[name].css')
  ]

};