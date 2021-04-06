import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

//redux store
const store = createStore(reducers);

ReactDOM.render(
  //redux store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
