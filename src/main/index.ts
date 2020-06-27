import { loadCss, loadJs, loadJsList } from './util/loader';
console.log('hello main.js');


// loadJs('/dep_antd.js').then(() => {
//   console.log('load js success!');
// })
loadCss('/dep_antd.css').then(() => {
  console.log('load css success!');
})


loadJsList([
  '/dep_react.js',
  // '/dep_reactDOM.js',
  // '/dep_antd.js'
]).then(() => {
  console.log('load js success!');
})

setTimeout(() => {
  loadJsList([
    // '/dep_react.js',
    '/dep_reactDOM.js',
    // '/dep_antd.js'
  ]).then(() => {
    console.log('load js success!');
  })
  
}, 2000);

