import { composeAdapters, createAPIMiddleware } from 'redux-api-call';

import fetch from 'redux-api-call-adapter-fetch';
import json from 'redux-api-call-adapter-json';

import querify from './querify';
import stringify from './json-stringify';

export default createAPIMiddleware(
  composeAdapters(stringify, json, querify, fetch)
);
