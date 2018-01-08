import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createEpicMiddleware } from 'redux-observable';
import reduxArrayMiddleware from 'redux-array-middleware';
import reduxThunk from 'redux-thunk';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';

import apiMiddleware from './apiMiddleware';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import storageMiddleware from './storageMiddleware';

const history = createHistory();
const epicMiddleware = createEpicMiddleware(rootEpic);
const routerMiddleware = createRouterMiddleware(history);

const composeEnhancers = composeWithDevTools({
  suppressConnectErrors: false,
  host: 'localhost',
  port: 8000,
  realtime: true,
});

const enhancers = composeEnhancers(
  applyMiddleware(
    reduxThunk,
    reduxArrayMiddleware,
    apiMiddleware,
    epicMiddleware,
    storageMiddleware,
    routerMiddleware
  )
);

export { history };
export default initialState => {
  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./rootEpic', () => {
      const rootEpic = require('./rootEpic').default;
      epicMiddleware.replaceEpic(rootEpic);
    });
  }

  return store;
};
