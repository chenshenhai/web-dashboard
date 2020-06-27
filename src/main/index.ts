import { loadDeps, loadLayout } from './lib/loader';
console.log('hello main.js');


// loadJs('/dep_antd.js').then(() => {
//   console.log('load js success!');
// })
// loadCss('/dep_antd.css');
loadDeps(['react', 'react-dom', 'antd'], ['antd']).then(() => {
  console.log('[Web-Dashboard] deps loaded successfully!');
  loadLayout('dark').then((Layout) => {
    console.log('Layout =', Layout);
  }).catch(console.log);

}).catch(console.log);

