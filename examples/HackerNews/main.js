import 'react-qml-cli/hot';

import './main.qml';

import { render } from 'react-qml-renderer';
import * as React from 'react';

import { getItem } from './src/util/localStorage';
import App from './App';
import makeStore, { history } from './src/state/makeStore';

const store = makeStore({
  authentication: {
    accessToken: getItem('accessToken'),
  },
});

export function init(root) {
  render(<App store={store} history={history} />, root);

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(<NextApp store={store} history={history} />, root);
    });
  }
}
