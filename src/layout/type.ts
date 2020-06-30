export interface TypeLayoutExtends {
  goToPage(path: string, params: {[key: string]: string}): void;
  getPage(name: string): Promise<any>;
}


export interface TypeLayoutProps {
  $extends: TypeLayoutExtends
}