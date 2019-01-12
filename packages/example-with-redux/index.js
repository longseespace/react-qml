import '@react-qml/cli/hot';

import './index.qml';

import { render } from '@react-qml/renderer';
import * as React from 'react';

import App from './src/App';
import makeStore from './src/makeStore';

const store = makeStore();

export function init(root) {
  render(<App store={store} />, root);

  if (module.hot) {
    module.hot.accept('./src/App', () => {
      const NextApp = require('./src/App').default;
      render(<NextApp store={store} />, root);
    });
  }
}
