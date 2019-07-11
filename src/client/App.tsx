
import React from "react";
import {Home} from './Home'
const AppConfig = {
  production: false,
  publicPath: "/",
  buildEnv: "development",
  buildVersion: "DEV",
  buildDate: new Date().toString(),
  env: {
    fabricFontBasePath: "/",
    fabricIconBasePath: "/icons/fabric/",
    configId: "mock"
  }
}



function App(){
    const [initialized, setInitialized] = React.useState(false)
    React.useEffect(() => {
      if(!initialized){
        // @ts-ignore
        window.AppConfig = AppConfig
        setInitialized(true)
      }
  })
    return (<Home/>)
}

export default App
