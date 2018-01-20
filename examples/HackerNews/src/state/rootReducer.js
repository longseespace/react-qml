/* @flow */
import { reducers as apiReducers } from 'redux-api-call';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  routerReducer,
  ...apiReducers,
});
