/* @flow */
import { ACTIONS, makeFetchAction } from 'redux-api-call';
import { combineReducers } from 'redux';
import { flow, last, map, path, slice } from 'lodash/fp';

export type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export type Item = {
  id: number,
  title: string,
  deleted?: boolean,
  type?: ItemType,
  by?: string,
  time?: number,
  text?: string,
  dead?: boolean,
  parent?: number,
  poll?: any,
  kids?: number[],
  url?: string,
  score?: number,
  descendants?: any,
};

export type StoryType =
  | 'askstories'
  | 'showstories'
  | 'jobstories'
  | 'newstories';

// API
// ---

const API_ROOT = String('https://hacker-news.firebaseio.com/v0');

// api to get story list (only IDs)
export const GET_STORY_LIST = 'GET_STORY_LIST';
export const GetStoryListAPI = makeFetchAction(
  GET_STORY_LIST,
  (type: StoryType) => ({
    endpoint: `${API_ROOT}/${type}.json`,
    method: 'GET',
    type,
  })
);

// api for getting single item
export const GET_STORY_ITEM = 'GET_STORY_ITEM';
export const GetStoryItemAPI = makeFetchAction(
  GET_STORY_ITEM,
  (id: number, type?: StoryType) => ({
    endpoint: `${API_ROOT}/item/${id}.json`,
    method: 'GET',
    type,
  })
);

// action creators
// ---------------
export const getStoryList = GetStoryListAPI.actionCreator;
export const getStoryItem = GetStoryItemAPI.actionCreator;

export const loadMoreTopStory = (howMany: number = 10) => (
  dispatch: Function,
  getState: Function
) => {
  const state = getState();
  const topStoryList = topStoryListSelector(state);
  const lastStory = flow(topStoryItemsSelector, last)(state);
  const lastStoryIndex = topStoryList.indexOf(lastStory.id);
  const newIds = slice(lastStoryIndex + 1, lastStoryIndex + howMany)(
    topStoryList
  );
  const actions = map(id => getStoryItem(id, 'topstories'))(newIds);
  return dispatch(actions);
};

// selectors
// ---------
export const topStoryItemsSelector = path('story.topStoryItems');
export const topStoryListSelector = path('story.topStoryList');

export const isGettingStoryListSelector = GetStoryListAPI.isFetchingSelector;
export const getStoryListErrorSelector = GetStoryListAPI.errorSelector;
export const getStoryListDataSelector = GetStoryListAPI.dataSelector;

export const isGettingStoryItemSelector = GetStoryItemAPI.isFetchingSelector;
export const getStoryItemErrorSelector = GetStoryItemAPI.errorSelector;
export const getStoryItemDataSelector = GetStoryItemAPI.dataSelector;

// reducer
// -------
// FIXME: store in a dictionary, not list
const topStoryItems = (state: Item[] = [], { type, payload }): Item[] => {
  if (
    type === ACTIONS.COMPLETE &&
    payload.name === GET_STORY_ITEM &&
    payload.type === 'topstories'
  ) {
    return [...state, payload.json];
  }
  return state;
};

const topStoryList = (state: number[] = [], { type, payload }): number[] => {
  if (
    type === ACTIONS.COMPLETE &&
    payload.name === GET_STORY_LIST &&
    payload.type === 'topstories'
  ) {
    return payload.json;
  }
  return state;
};

export default {
  story: combineReducers({
    topStoryItems,
    topStoryList,
  }),
};
