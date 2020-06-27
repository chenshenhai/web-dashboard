import config from './../../config.json';
import { loadJs, loadCss, loadCssList, loadJsList } from './../util/load';

export function loadDeps(jsNames: string[], cssNames: string[]): Promise<any[]> {
  const jsUrls = jsNames.map((name) => {
    return `/dep_${config.deps[name]}.js`
  })
  const cssUrls = cssNames.map((name) => {
    return `/dep_${config.deps[name]}.css`
  });
  loadCssList(cssUrls);
  return loadJsList(jsUrls);
}


export function loadPage(name: string): Promise<any> {
  const jsUrl: string = `/page_${config.pages[name]}.js`;
  const cssUrl: string = `/page_${config.pages[name]}.css`;
  const objName: string = `${config.globalPrefix}${config.pages[name]}`;
  loadCss(cssUrl);
  return new Promise((resolve, reject) => {
    loadJs(jsUrl).then(() => {
      resolve((window as any)[objName].default);
    }).then(reject);
  });
}


export function loadLayout(name: string): Promise<any> {
  const jsUrl: string = `/layout_${config.layouts[name]}.js`;
  const cssUrl: string = `/layout_${config.layouts[name]}.css`;
  const objName: string = `${config.globalPrefix}layout_${config.layouts[name]}`;
  loadCss(cssUrl);
  return new Promise((resolve, reject) => {
    loadJs(jsUrl).then(() => {
      resolve((window as any)[objName].default);
    }).then(reject);
  });
}