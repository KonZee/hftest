// webpack.config.js
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const outputDir = 'dist';

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: [path.resolve(__dirname, 'src/main.js')],
  },
  output: {
    path: path.resolve(__dirname, outputDir),
    publicPath: '',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      // Templates
      {
        test: /\.(pug|jade)$/,
        loader: ['html-loader', 'pug-html-loader']
      },
      // JS
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      },
      // Vue components
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      },
      // CSS
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers:['ie >= 10', 'last 4 version']
                })
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // Fonts
      {
        test: /\.(woff|woff2|otf|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
        }
      },
      // Images
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      inject: false
    }),
  ],
}

module.exports = config
