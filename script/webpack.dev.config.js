process.env.NODE_ENV = 'development';

const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname, '..'),
    // compress: true,
    port: 9000,
    hot: false,
    inline: false,
  }
});