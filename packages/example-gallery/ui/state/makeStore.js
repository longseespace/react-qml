import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import {
  connectRouter,
  routerMiddleware as createRouterMiddleware,
} from 'connected-react-router';
import createHistory from 'history/createMemoryHistory';
import reduxThunk from 'redux-thunk';

// import rootEpic from './rootEpic';
import rootReducer from './rootReducer';

const history = createHistory();
// const epicMiddleware = createEpicMiddleware(rootEpic);
const routerMiddleware = createRouterMiddleware(history);

// dev tools
// to use custom remote-dev server, uncomment the first 2 options
const composeEnhancers = composeWithDevTools({
  // hostname: process.env.DEV_SERVER_HOST || 'localhost',
  // port: 8000,
  suppressConnectErrors: false,
  realtime: process.env.NODE_ENV !== 'production',
});

// then router
const rootReducerWithRouter = connectRouter(history)(rootReducer);

// finally composeEnhancers
const enhancers = composeEnhancers(
  applyMiddleware(
    reduxThunk,
    // epicMiddleware,
    routerMiddleware
  )
);

export { history };
export default initialState => {
  const store = createStore(rootReducerWithRouter, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(connectRouter(history)(nextReducer));
    });
    // module.hot.accept('./rootEpic', () => {
    //   const rootEpic = require('./rootEpic').default;
    //   epicMiddleware.replaceEpic(rootEpic);
    // });
  }

  return store;
};
