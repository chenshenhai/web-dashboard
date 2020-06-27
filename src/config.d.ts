declare module "*.json" {
  const value: {
    globalPrefix: string,
    pages: {
      [key: string]: string;
    },
    deps: {
      [key: string]: string;
    },
    layouts: {
      [key: string]: string;
    }
  };
  export default value;
}