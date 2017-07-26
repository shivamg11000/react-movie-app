import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.addEventListener('resize',() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
