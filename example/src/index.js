import 'es6-map/implement';
import 'es6-set/implement';

import * as React from 'react';
import App from './app';

export function init(render, root) {
  render(React.createElement(App), root);

  if (module.hot) {
    module.hot.accept('./app', () => {
      // eslint-disable-next-line
      console.log('App hot reloaded');
      // eslint-disable-next-line global-require
      const NextApp = require('./app').default;

      render(React.createElement(NextApp), root);
    });
  }
}
