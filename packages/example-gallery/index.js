import 'react-qml-cli/hot';

import './index.qml';

import { render } from 'react-qml-renderer';
import * as React from 'react';

import App from './App';

export function init(root) {
  render(<App />, root);

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(<NextApp />, root);
    });
  }
}
