// const path = require('path');
const { createWebpackConfig, srcResolve, distResolve } = require('./common');
const srcConfig = require('./../src/config.json');

const depsKeys = Object.keys(srcConfig.deps);
const pageKeys = Object.keys(srcConfig.pages);
const layoutKeys = Object.keys(srcConfig.layouts);

const depsExternals = {};
const depsEntry = {};
const pagesEntry = {};
const layoutsEntry = {};

depsKeys.forEach((key) => {
  depsExternals[`${key}`] = `window.${srcConfig.globalPrefix}dep_${srcConfig.deps[key]}`;
  depsEntry[`dep_${srcConfig.deps[key]}`] = srcResolve(`dep/${key}.js`);
});
pageKeys.forEach(key => {
  pagesEntry[`page_${srcConfig.pages[key]}`] = srcResolve(`page/${key}/index.tsx`);
})
layoutKeys.forEach(key => {
  layoutsEntry[`layout_${srcConfig.layouts[key]}`] = srcResolve(`layout/${key}/index.tsx`);
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