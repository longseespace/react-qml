import * as React from 'react';
import { render } from 'qml-renderer';
import App from './app';

export function init(root) {
  render(React.createElement(App), root);
}
