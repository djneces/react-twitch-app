import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//redux store
const store = createStore(
  reducers,
  //redux thunk
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  //redux store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
