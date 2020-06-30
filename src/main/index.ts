import { loadDeps, loadLayout, loadPage, getDep } from './lib/loader';
import { TypeLayoutProps } from './../layout/type';
import config from './../config.json';


loadDeps(['react', 'react-dom', 'antd'], ['antd']).then(() => {
  console.log('[Web-Dashboard] deps loaded successfully!');
  loadLayout('dark').then((Layout) => {
    const React = getDep('react');
    const ReactDOM = getDep('react-dom');
    const props:TypeLayoutProps  = {
      $extends: {
        goToPage(path: string, params: {[key: string]: string}) {
          const url = `${path}?page=${params.page || ''}&tab=${params.tab || ''}`;
          history.pushState({
            url,
            timestamp: new Date().getTime(),
          }, '', url);
        },
        getPage(name: string) {
          return loadPage(name);
        }
      }
    }
    ReactDOM.render(
      React.createElement(Layout, props, null),
      document.querySelector('#web-dashboard'),
    )
  }).catch(console.log);
}).catch(console.log);

