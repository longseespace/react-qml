/* @flow */
import { reducers as apiReducers } from 'redux-api-call';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import story from '../components/StoryState';

export default combineReducers({
  routerReducer,
  ...apiReducers,
  story,
});
