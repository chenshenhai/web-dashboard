import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './../layout/index';

import { loadPage } from './lib/loader';
import { TypeLayoutProps } from './../layout/type';

import 'antd/dist/antd.css';

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

console.log('Layout ======', Layout);

ReactDOM.render(
  React.createElement(Layout, props, null),
  document.querySelector('#web-dashboard'),
)

