import { createStore } from "redux";
import { Provider } from "react-redux";
import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './components/App'

import reducers from "./reducers";

const store = createStore(reducers);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
