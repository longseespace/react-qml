import * as React from 'react';
import * as ReactQML from 'qml-react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Counter from './Counter';
import reducers from './reducers';

import ApplicationWindow from 'qt-react/QtQuick/Controls/2.2/ApplicationWindow';

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <ApplicationWindow title="WithRedux" visible width={600} height={400} x={100} y={100} color="#F5FCFF">
      <Counter />
    </ApplicationWindow>
  </Provider>
);

export function init(root) {
  ReactQML.render(<App />, root)
}
