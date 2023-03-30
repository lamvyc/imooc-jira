import "./wdyr";//一定要在第一句引用
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { loadDevTools } from "jira-dev-tool";
import { DevTools, loadServer } from "jira-dev-tool";
//务必在jira-dev-tool后面引入
import 'antd/dist/antd.less'//import时，放在后面的import能覆盖前面的import；比如antd覆盖loadDevTools的样式
import { AppProviders } from 'context';



// eslint-disable-next-line no-lone-blocks
{/* 
<DevTools /> 
开发者控制台面板
*/}



loadServer(() => ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
)
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
