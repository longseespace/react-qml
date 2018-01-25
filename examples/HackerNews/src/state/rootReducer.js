/* @flow */
import { reducers as apiReducers } from 'redux-api-call';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import storyReducers from '../components/StoryState';
import webviewReducers from '../components/WebViewState';

export default combineReducers({
  routerReducer,
  ...apiReducers,
  ...storyReducers,
  ...webviewReducers,
});
