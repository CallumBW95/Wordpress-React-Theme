const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_DIR = path.resolve(__dirname, './');
const APP_DIR = path.resolve(__dirname, './src/');
const DEV_MODE = process.env.NODE_ENV !== 'production';

const config = {
  mode: 'development',
  entry: {
    main: APP_DIR + '/index.js'
  },
  output: {
    filename: 'app.js',
    path: BUILD_DIR
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: DEV_MODE ? '[id].css' : '[id].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jsx|js)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'es2015'] // Transpiles JSX and ES6
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;