import ApplicationWindow from 'qtquick-react/QtQuick/Controls/2.2/ApplicationWindow';
import ColumnLayout from 'qtquick-react/QtQuick/Layouts/1.0/ColumnLayout'
import Text from 'qtquick-react/QtQuick/2.7/Text';
import * as React from 'react';

class App extends React.Component {
  render() {
    return (
      <ApplicationWindow visible width={800} height={600} color="#F5FCFF">
        <ColumnLayout>
          <Text text="Welcome to Qix" font={{ pointSize: 20 }} />
          <Text text="To get started, edit App.js" color="#333333"/>
          <Text text="Press Cmd+R to reload,\nCmd+D for dev menu'" color="#333333" />
        </ColumnLayout>
      </ApplicationWindow>
    );
  }
}

export default App;
