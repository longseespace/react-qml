import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({
  suppressConnectErrors: false,
  host: 'localhost',
  port: 8000,
  realtime: true,
});

const enhancers = composeEnhancers(applyMiddleware(reduxThunk));

export default initialState => {
  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
