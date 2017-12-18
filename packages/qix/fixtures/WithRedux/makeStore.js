import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({ suppressConnectErrors: false })
    : compose;

const enhancers = composeEnhancers(applyMiddleware(reduxThunk));

export default initialState => {
  const store = createStore(rootReducer, initialState, enhancers);

  return store;
};
