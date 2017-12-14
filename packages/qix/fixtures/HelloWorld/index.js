import * as React from 'react';
import { render } from 'qml-renderer';
import App from './App';

export function init(root) {
  render(React.createElement(App), root);
}
