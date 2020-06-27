import { loadDeps } from './lib/loader';
console.log('hello main.js');


// loadJs('/dep_antd.js').then(() => {
//   console.log('load js success!');
// })
// loadCss('/dep_antd.css');
loadDeps(['react', 'react-dom', 'antd'], ['antd']).then(() => {
  console.log('[Web-Dashboard] deps loaded successfully!');
}).catch(console.log);

