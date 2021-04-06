import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/App';
import reducers from './reducers';

//redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//redux store
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  //redux store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
