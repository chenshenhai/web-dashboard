const path = require('path');
const { createWebpackConfig, srcResolve, distResolve } = require('./common');
const merge = require('webpack-merge');

module.exports = [
  createWebpackConfig({
    entry: {
      'deps_react' : srcResolve('deps/react.js'),
      'deps_reactDOM' : srcResolve('deps/react-dom.js'),
    },
    // externals: {},
  }),
  // createWebpackConfig({
  //   entry: {
  //     'core/main' : srcResolve('core/main.js'),
  //   }
  // }),
  // createWebpackConfig({
  //   entry: {
  //     'page_home' : srcResolve('page/home/index.tsx'),
  //     'page_my' : srcResolve('page/my/index.tsx'),
  //   }
  // }),
]