/* @flow */
import { ACTIONS, makeFetchAction } from 'redux-api-call';
import always from 'lodash/fp/always';
import contains from 'lodash/fp/contains';
import flow from 'lodash/fp/flow';
import path from 'lodash/fp/path';
import { combineReducers } from 'redux';
import md5 from 'md5';

// const API_ROOT = String(process.env.API_ROOT);
const API_ROOT = String('http://localhost:3000/api');

// API
// ---
export const getAuthHeader = flow(
  path('authentication.accessToken'),
  accessToken => ({
    Authorization: accessToken,
  })
);

export const AUTHENTICATE = 'AUTHENTICATE';
export const AuthenticateAPI = makeFetchAction(
  AUTHENTICATE,
  ({ email, password }) => ({
    endpoint: `${API_ROOT}/authentications`,
    method: 'POST',
    json: { email, password: md5(password), strategy: 'local' },
  })
);

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const RefreshTokenAPI = makeFetchAction(REFRESH_TOKEN, () => ({
  endpoint: `${API_ROOT}/authentications`,
  method: 'POST',
  headers: getAuthHeader,
}));

export const GET_AUTH_USER = 'GET_AUTH_USER';
export const GetAuthUserAPI = makeFetchAction(GET_AUTH_USER, () => ({
  endpoint: `${API_ROOT}/users/me`,
  method: 'GET',
  headers: getAuthHeader,
}));

// actions
// ---------------
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const LOGOUT = 'LOGOUT';

// action creators
// ---------------
export const setAccessToken = (token: string) => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});
export const logout = always({
  type: LOGOUT,
});
export const authenticate = AuthenticateAPI.actionCreator;
export const refreshToken = RefreshTokenAPI.actionCreator;
export const getAuthUser = GetAuthUserAPI.actionCreator;

// selectors
// ---------

// accessToken
export const accessTokenSelector = path('authentication.accessToken');

// authentication
export const isAuthenticatingSelector = AuthenticateAPI.isFetchingSelector;
export const authenticationErrorSelector = AuthenticateAPI.errorSelector;

// refresh token
export const isRefreshingTokenSelector = RefreshTokenAPI.isFetchingSelector;
export const refreshTokenErrorSelector = RefreshTokenAPI.errorSelector;

// auth user
export const isGettingAuthUserSelector = GetAuthUserAPI.isFetchingSelector;
export const getAuthUserErrorSelector = GetAuthUserAPI.errorSelector;
export const getAuthUserDataSelector = GetAuthUserAPI.dataSelector;

// reducer
// -------
const accessToken = (state: string = '', { type, payload }): string => {
  if (type === ACTIONS.COMPLETE && contains(payload.name, [AUTHENTICATE])) {
    return payload.json.accessToken;
  }
  if (type === LOGOUT) {
    return '';
  }
  if (type === SET_ACCESS_TOKEN) {
    return payload;
  }

  return state;
};

export default {
  authentication: combineReducers({
    accessToken,
  }),
};
