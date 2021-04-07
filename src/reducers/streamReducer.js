import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // payload is [streams], we use lodash to convert [] to {} and use id as keys in the new obj, we adding obj => ...
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      //single record from the APP => added to the state object
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      //single record from the APP => added to the state object
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      //single record from the APP => updates a property (existing) in the state object
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      //in payload we getting already id => no need to action.payload.id
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
