import {h, render} from 'preact'


const App = () =>  {
    return  <div><iframe width={window.innerWidth - 15} height={window.innerHeight - 25} src="http://localhost:3000"></iframe></div>
}

render((<App />), document.getElementById("app"))

//@ts-ignore
if(module.hot){module.hot.accept()}