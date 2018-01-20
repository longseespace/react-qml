import React from 'react';

import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './AppBar.qml';

const ToolBarQML = createQMLComponent(qmlSource, 'App.AppBar');

const CalibrationToolBar = props => <ToolBarQML {...props} />;

export default CalibrationToolBar;
