import { combineReducers } from 'redux';
import { path } from 'lodash/fp';

import type { Item } from './StoryState';

// actions
// -------
export const LOAD_STORY = 'LOAD_STORY';

// action creators
// ---------------
export const loadStory = (payload: Item) => ({
  type: LOAD_STORY,
  payload,
});

// selectors
// ---------
export const currentUrlSelector = path('webview.currentUrl');

// reducers
// --------
const currentUrl = (
  state: string = 'about:blank',
  { type, payload }
): string => {
  if (type === LOAD_STORY) {
    return payload.url;
  }
  return state;
};

export default {
  webview: combineReducers({
    currentUrl,
  }),
};
