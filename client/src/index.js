import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Web3ContextProvider from './context/web3Context';
import ToDoContextProvider from './context/todoContext';

ReactDOM.render(
  <Web3ContextProvider>
    <ToDoContextProvider>
      <App />
    </ToDoContextProvider>
  </Web3ContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
