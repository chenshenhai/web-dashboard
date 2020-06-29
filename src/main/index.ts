import { loadDeps, loadLayout, getDep } from './lib/loader';
console.log('hello main.js');


loadDeps(['react', 'react-dom', 'antd'], ['antd']).then(() => {
  console.log('[Web-Dashboard] deps loaded successfully!');
  loadLayout('dark').then((Layout) => {
    const React = getDep('react');
    const ReactDOM = getDep('react-dom');
    const props = {
      $extends: {
        goToPage(page: string) {
          // console.log('goToPage =', page);
          const path = `?page=${page}`;
          history.pushState({
            path,
            timestamp: new Date().getTime(),
          }, '', path);
        }
      }
    }
    ReactDOM.render(
      React.createElement(Layout, props, null),
      document.querySelector('#web-dashboard'),
    )
  }).catch(console.log);
}).catch(console.log);

