// const path = require('path');
const { createWebpackConfig, srcResolve, distResolve } = require('./common');
const config = require('./../src/config.json');

const depsKeys = Object.keys(config.deps);
const pageKeys = Object.keys(config.pages);
const layoutKeys = Object.keys(config.layouts);

const depsExternals = {};
const depsEntry = {};
const pagesEntry = {};
const layoutsEntry = {};

depsKeys.forEach((key) => {
  depsExternals[`${key}`] = `window._$WebDashboard$_dep_${config.deps[key]}`;
  depsEntry[`dep_${config.deps[key]}`] = srcResolve(`dep/${key}.js`);
});
pageKeys.forEach(key => {
  pagesEntry[`page_${config.pages[key]}`] = srcResolve(`page/${key}/index.tsx`);
})
layoutKeys.forEach(key => {
  layoutsEntry[`layout_${config.layouts[key]}`] = srcResolve(`layout/${key}/index.tsx`);
})


module.exports = [
  createWebpackConfig({
    entry: {
      'main': srcResolve('main/index.ts'),
    },
    externals: depsExternals,
  }),
  createWebpackConfig({
    entry: {
      ...depsEntry,
      ...layoutsEntry,
      ...pagesEntry,
    },
    externals: depsExternals,
  }),
]