import ApplicationWindow from 'qt-react/QtQuick/Controls/2.2/ApplicationWindow';
import GridLayout from 'qt-react/QtQuick/Layouts/1.0/GridLayout';
import ColumnLayout from 'qt-react/QtQuick/Layouts/1.0/ColumnLayout';
import Text from 'qt-react/QtQuick/2.7/Text';
import Item from 'qt-react/QtQuick/2.7/Item';
import * as React from 'react';

class App extends React.Component {
  render() {
    return (
      <ApplicationWindow visible width={800} height={600} x={100} y={100} color="#F5FCFF">
        <GridLayout Layout={{ fillWidth: true, fillHeight: true }} columns={3} rows={3}>
          <ColumnLayout Layout={{ row: 1, column: 1 }}>
            <Text
              text="Welcome to Qix"
              font={{ pointSize: 20 }}
              horizontalAlignment={Text.AlignJustify}
              Layout={{ fillWidth: true }}
            />
            <Text
              text="To get started, edit App.js"
              color="#333333"
              horizontalAlignment={Text.AlignJustify}
              Layout={{ fillWidth: true }}
            />
            <Text
              text="Press Cmd+R to reload,<br/>Cmd+D for dev menu"
              color="#333333"
              horizontalAlignment={Text.AlignJustify}
              Layout={{ fillWidth: true }}
            />
          </ColumnLayout>
        </GridLayout>
      </ApplicationWindow>
    );
  }
}

export default App;
