import { Label, Window, ColumnLayout, Rectangle } from 'react-qml';
import * as React from 'react';

import ErrorBoundary from './ErrorBoundary';

class MainWindow extends React.Component {
  onWindowClosing = e => {
    console.log('window closing');
  };

  render() {
    return (
      <window
        width={600}
        height={400}
        title={qsTr('Gallery')}
        visible
        onClosing={this.onWindowClosing}
      >
        <rectangle anchors={{ fill: 'parent' }} color="#fefefe">
          <ErrorBoundary>
            <rectangle
              width={200}
              height={200}
              color="red"
              anchors={{
                horizontalCenter: 'parent.horizontalCenter',
                bottom: 'parent.bottom',
              }}
            />
            <label
              anchors={{ fill: 'parent' }}
              text={
                'Qt Quick Controls 2 provides a set of controls that can be used to build complete interfaces in Qt Quick.\n\n' +
                'This example also demonstrates how Drawer can be used as a non-closable persistent side panel. ' +
                'When the application is in portrait mode, the drawer is an interactive side panel that can ' +
                'be swiped open from the left edge. When the application is in landscape mode, the drawer ' +
                'and the content are laid out side by side.'
              }
              elide="ElideRight"
              wrapMode="WordWrap"
              horizontalAlignment={Qt.AlignHCenter}
              verticalAlignment={Qt.AlignVCenter}
            />
          </ErrorBoundary>
        </rectangle>
      </window>
    );
  }
}

export default MainWindow;
