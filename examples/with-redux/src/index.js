import '@react-qml/cli/hot';

import { render } from 'react-qml';
import * as React from 'react';

import App from './App';
import makeStore from './makeStore';

const store = makeStore();

export function init(root) {
  render(<App store={store} />, root);

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(<NextApp store={store} />, root);
    });
  }
}
