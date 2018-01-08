/* @flow */
import localStorage from '../util/localStorage';

const SET = '@@storage/SET';
const REMOVE = '@@storage/REMOVE';

type CookieAction = {
  type: string,
  payload: {
    key: string,
    value?: string,
  },
};

export default () => (next: Function) => (action: CookieAction) => {
  if (action.type === SET) {
    localStorage.setItem(action.payload.key, action.payload.value);
  }
  if (action.type === REMOVE) {
    localStorage.removeItem(action.payload.key);
  }

  return next(action);
};

export const setItem = (key: string, value: string) => ({
  type: SET,
  payload: {
    key,
    value,
  },
});

export const removeItem = (key: string) => ({
  type: REMOVE,
  payload: {
    key,
  },
});
