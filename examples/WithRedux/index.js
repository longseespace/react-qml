import 'qix/hot';
import { render } from 'qml-react';
import * as React from 'react';

import App from './App';
import makeStore from './makeStore';

const store = makeStore();

export function init(root) {
  render(<App store={store} />, root)
}
