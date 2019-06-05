import React, { Component } from 'react';
import { render } from 'react-qml';

// TODO: move to react-qml instead of cli
import '@react-qml/cli/hot';

import App from './App.qml';

export default root => {
  render(<App />, root);

  if (module.hot) {
    module.hot.accept('./App.qml', () => {
      const NextApp = require('./App.qml');
      console.log('NextApp', Object.keys(NextApp));
      render(<NextApp />, root);
    });
  }
};
