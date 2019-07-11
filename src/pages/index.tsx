import React from "react";
import App from "../client/App";

//import App from '../client/main'
import {NoSSR} from '../common/ssr/NoSSR'

let IndexPage = (props) => {
  return (
    <NoSSR>
       <App/>
  </NoSSR>
  )
}

export default IndexPage;