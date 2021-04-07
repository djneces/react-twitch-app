import { combineReducers } from 'redux';
//we rename it if we wish
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  //redux form reducer
  form: formReducer,
  streams: streamReducer,
});
