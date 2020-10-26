import config from './../../config.json';
import { loadJs, loadCss, loadCssList, loadJsList } from './../util/load';



export function loadPage(name: string): Promise<any> {
  const jsUrl: string = `/page_${config.pages[name]}.js`;
  const cssUrl: string = `/page_${config.pages[name]}.css`;
  const objName: string = `${config.globalPrefix}page_${config.pages[name]}`;
  loadCss(cssUrl);
  return new Promise((resolve, reject) => {
    loadJs(jsUrl).then(() => {
      resolve((window as any)[objName].default);
    }).then(reject);
  });
}

