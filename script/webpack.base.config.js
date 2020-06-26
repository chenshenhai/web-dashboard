const path = require('path');
const { createWebpackConfig, srcResolve, distResolve } = require('./common');
const merge = require('webpack-merge');

module.exports = [
  createWebpackConfig({
    entry: {
      'home' : srcResolve('page/home/index.tsx'),
      'my' : srcResolve('page/my/index.tsx'),
    }
  }),
]