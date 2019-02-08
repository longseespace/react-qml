import { Rectangle, Text, Window } from 'react-qml';
import * as React from 'react';

import ErrorBoundary from './ErrorBoundary';

const windowStyle = {
  backgroundColor: '#fefefe',
};

class MainWindow extends React.Component {
  onWindowClosing = e => {
    console.log('window closing');
  };

  componentDidMount() {
    // debugger;
  }

  render() {
    return (
      <Window
        width={600}
        height={400}
        title={qsTr('Gallery')}
        visible
        onClosing={this.onWindowClosing}
        color="#fefefe"
        style={windowStyle}
      >
        <ErrorBoundary>
          <Rectangle
            width={200}
            height={200}
            color="red"
            anchors={{
              horizontalCenter: 'parent.horizontalCenter',
              bottom: 'parent.bottom',
            }}
            style={windowStyle}
          />
          <Text
            anchors={{ fill: 'parent' }}
            text={
              'Qt Quick Controls 2 provides a set of controls that can be used to build complete interfaces in Qt Quick.'
            }
            elide="ElideRight"
            wrapMode="WordWrap"
            horizontalAlignment="AlignHCenter"
            verticalAlignment="AlignVCenter"
          />
        </ErrorBoundary>
      </Window>
    );
  }
}

export default MainWindow;
