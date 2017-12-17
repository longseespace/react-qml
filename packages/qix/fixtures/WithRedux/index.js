// import 'qix/hot';
import { createStore } from 'redux';
import * as React from 'react';
import { render } from 'qml-react';

import App from './App';
import reducers from './reducers';

const store = createStore(reducers);

export function init(root) {
  render(<App store={store} />, root)

  if (module.hot) {
    console.log('module.hot');
    module.hot.accept('./App', () => {
      console.log('App hot reloaded');
      // eslint-disable-next-line global-require
      const NextApp = require('./App').default;

      render(<NextApp store={store} />, root);
    });
  }
}
