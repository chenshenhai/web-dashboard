const loadAttrKey = 'data-webdashboard-async-load';

export function loadJs(url: string): Promise<void>{
  if (document.querySelectorAll(`script[${loadAttrKey}="${url}"]`).length > 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    let $script = document.createElement('script');
    $script.src = url;
    $script.setAttribute(loadAttrKey, url)
    $script.onload = function(){
      resolve();
      this.onload = null;
    }
    document.getElementsByTagName('head')[0].appendChild($script);
  });
}

export function loadJsList(urls: string[]): Promise<any[]>{
  const promiseList = urls.map((url) => {
    return loadJs(url);
  });
  return Promise.all(promiseList);
}

export function loadCss(url: string): Promise<void>{
  if (document.querySelectorAll(`link[${loadAttrKey}="${url}"]`).length > 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    let $link = document.createElement('link');
    $link.setAttribute('ref', 'stylesheet')
    $link.setAttribute(loadAttrKey, url)
    $link.href = url;
    $link.onload = function(){
      resolve();
      this.onload = null;
    }
    document.getElementsByTagName('head')[0].appendChild($link);
  });
}

export function removeJs(url: string) {
  const $doms = document.querySelectorAll(`script[${loadAttrKey}="${url}"]`);
  for(let i = 0; i < $doms.length; i++) {
    $doms[i].parentNode?.removeChild($doms[i]);
  }
}

export function removeCss(url: string) {
  const $doms = document.querySelectorAll(`link[${loadAttrKey}="${url}"]`);
  for(let i = 0; i < $doms.length; i++) {
    $doms[i].parentNode?.removeChild($doms[i]);
  }
}