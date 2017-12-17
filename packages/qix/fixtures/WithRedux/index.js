import * as React from 'react';
import * as ReactQML from 'qml-react';

import { createStore } from 'redux';
import Counter from './Counter';
import reducers from './reducers';

import ApplicationWindow from 'qt-react/QtQuick/Controls/2.2/ApplicationWindow';
const store = createStore(reducers);

export function init(root) {
  const render = () => ReactQML.render(
    <ApplicationWindow title="WithRedux" visible width={600} height={400} x={100} y={100} color="#F5FCFF">
      <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
      />
    </ApplicationWindow>
  , root);

  render();
  store.subscribe(render);
}
