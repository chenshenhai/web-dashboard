const path = require('path');
const { createWebpackConfig, srcResolve, distResolve } = require('./common');
const merge = require('webpack-merge');
const config = require('./../src/config.json');

const depsKeys = Object.keys(config.deps);
const pageKeys = Object.keys(config.pages);


const depsExternals = {};
const depsEntry = {};
const pagesEntry = {};
depsKeys.forEach((key) => {
  depsExternals[`${key}`] = `_$WebDashboard$_deps_${config.deps[key]}}`;
  depsEntry[`dep_${config.deps[key]}`] = srcResolve(`dep/${key}.js`);
});
pageKeys.forEach(key => {
  pagesEntry[`page_${config.pages[key]}`] = srcResolve(`page/${key}/index.tsx`);
})


module.exports = [
  createWebpackConfig({
    entry: {
      ...depsEntry,
      ...pagesEntry, 
    },
    externals: depsExternals,
  }),
]