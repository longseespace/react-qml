import React from 'react';

import backSvg from '../assets/back.svg';
import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './AppBar.qml';

const ToolBarQML = createQMLComponent(qmlSource, 'App.AppBar');

const CalibrationToolBar = props => (
  <ToolBarQML backIcon={backSvg} {...props} />
);

export default CalibrationToolBar;
