/* @flow */
import { reducers as apiReducers } from 'redux-api-call';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import authentication from '../components/authentication.state';

export default combineReducers({
  routerReducer,
  ...apiReducers,
  ...authentication,
});
