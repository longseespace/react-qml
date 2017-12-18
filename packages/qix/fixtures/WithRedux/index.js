import { createStore } from 'redux';
import * as React from 'react';
import { render } from 'qml-react';

import App from './App';
import reducers from './reducers';

const store = createStore(reducers);

export function init(root) {
  render(<App store={store} />, root)
}
