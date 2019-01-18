import '@react-qml/cli/hot';

import './index.qml';

import { render } from 'react-qml';
import * as React from 'react';

import App from './ui/App';

import makeStore, { history } from './ui/state/makeStore';

const store = makeStore();

export function init(root) {
  render(<App store={store} history={history} />, root);

  if (module.hot) {
    module.hot.accept('./ui/App', () => {
      const NextApp = require('./ui/App').default;
      render(<NextApp store={store} history={history} />, root);
    });
  }
}
