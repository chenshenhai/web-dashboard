import config from './../../config.json';
import { loadJs, loadCss, loadCssList, loadJsList } from './../util/load';
import { getParam } from './../util/page';


export async function loadPage(name: string): Promise<any> {
  const page = getParam('page') || 'home';
  const module = await import(`./../../page/${page}`);
  return module.default;
}

