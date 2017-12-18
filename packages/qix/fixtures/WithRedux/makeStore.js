import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({ suppressConnectErrors: false });

const enhancers = composeEnhancers(
  applyMiddleware(
    reduxThunk
  )
);

export default (initialState) => {
  const store = createStore(rootReducer, initialState, enhancers);

  return store;
}
