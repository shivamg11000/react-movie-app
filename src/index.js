import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let flag;
if (window.innerWidth>725)
  flag = 1   // width in grt than 725px domain
else
  flag = 2   // width in less than 725px domain


window.addEventListener('resize',() => {
  if(window.innerWidth>725 && flag===2){
    ReactDOM.render(<App />, document.getElementById('root'))
    flag = 1
  }
  else if(window.innerWidth<725 && flag===1){
    ReactDOM.render(<App />, document.getElementById('root'))
    flag = 2
  }
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
