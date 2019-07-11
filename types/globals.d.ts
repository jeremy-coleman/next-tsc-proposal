declare module 'file-loader?!*';
declare module 'url-loader?!*';
declare module '*.json';
declare module '*.png';

// NOTE: this is the global app config type definition
declare var AppConfig: any;


interface HotNodeModule extends NodeModule {
  hot: any
}

declare var module: HotNodeModule

import 'react'
// Augmentation of React
declare module "react" {
  interface HTMLProps {
    jsx?: boolean;
    global?: boolean;
  }
}