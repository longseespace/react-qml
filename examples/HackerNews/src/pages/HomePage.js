import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ColumnLayout from 'qt-react/QtQuick/Layouts/1.0/ColumnLayout';
import * as React from 'react';
import Rectangle from 'qt-react/QtQuick/2.7/Rectangle';

import { fillWindow } from '../util/binding';
import AppBar from '../components/AppBar';

const connectToRedux = connect(null, {
  calibrate: () => push('/calibration'),
  scan: () => push('/scan'),
});

class HomePage extends React.Component {
  render() {
    return (
      <Rectangle color="#f5f5f6" {...fillWindow}>
        <ColumnLayout {...fillWindow}>
          <AppBar Layout={{ fillWidth: true, alignment: 'AlignTop' }} z={1} />
        </ColumnLayout>
      </Rectangle>
    );
  }
}

export default connectToRedux(HomePage);
