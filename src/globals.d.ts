/// <reference types="react" />

declare var AppConfig : {
  production?: boolean;
  configName?: string;
  basePath?: string;
  fabricFontBasePath?: string;
  fabricIconBasePath?: string;
  buildVersion: string;
  buildDate: Date;
  env?: any;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

//type NestedSelectors = React.CSSProperties["&"] & React.CSSProperties["selectors"] & React.CSSProperties["$nest"]

interface CSSProperties extends React.CSSProperties {
    '&'?: {
      [selector: string]: Omit<React.CSSProperties, '&'>
    },
    selectors?: {
      [selector: string]: Omit<React.CSSProperties, '&'>
    },
    $nest?: {
      [selector: string]: Omit<React.CSSProperties, '&'>
    }
}


declare module "file-loader?!*" {
  const value : string;
  export default value;
}

declare module "url-loader?!*" {
  const value : string;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "package.json" {
  const value: any;
  export default value;
}