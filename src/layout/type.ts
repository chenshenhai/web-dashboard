export interface TypeLayoutExtends {
  goToPage(name: string): void;
}


export interface TypeLayoutProps {
  $extends: TypeLayoutExtends
}