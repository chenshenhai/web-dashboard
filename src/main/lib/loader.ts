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