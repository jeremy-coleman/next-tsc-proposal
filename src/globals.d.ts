// NOTE: this is the global app config type definition
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