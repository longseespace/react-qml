import Item from 'qt-react/QtQuick/2.7/Item';
import ColumnLayout from 'qt-react/QtQuick/Layouts/1.1/ColumnLayout';
import Popup from 'qt-react/QtQuick/Controls/2.2/Popup';
import ProgressBar from 'qt-react/QtQuick/Controls/2.2/ProgressBar';
import Label from 'qt-react/QtQuick/Controls/2.2/Label';
import TextField from 'qt-react/QtQuick/Controls/2.2/TextField';
import Button from 'qt-react/QtQuick/Controls/2.2/Button';
import Rectangle from 'qt-react/QtQuick/2.9/Rectangle';
import Text from 'qt-react/QtQuick/2.8/Text';

import * as React from 'react';

const View = ({ backgroundColor, children }) => (
  <ColumnLayout>
    <Rectangle
      color="red"
      anchors={{
        fill: Qt.binding(function() {
          return parent;
        }),
      }}
    />
    {children}
  </ColumnLayout>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenVisible: true,
    };

    this.toggle = () => {
      this.setState({ greenVisible: !this.state.greenVisible });
      // console.log(require('util').inspect(this.popup.background, { depth: 0 }));
    };

    this.onSubmit = (email, password) => {
      console.log('onSubmit', email, password);
    };

    this.onEmailChanged = email => {
      console.log('onEmailChanged', email);
    };

    this.getRef = inst => {
      this.popup = inst.qmlObject;
    };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    console.error(error);
    console.error(error.stack);
    this.setState({ error: error });
    // You can also log the error to an error reporting service
  }

  render() {
    console.log('this.state.error', this.state.error);
    console.log('this.state.greenVisible', this.state.greenVisible);
    if (this.state.error) {
      return (
        <Rectangle
          color="#8AFF0000"
          x={10}
          y={10}
          width={Qt.binding(function() {
            return window.width - 20;
          })}
          height={Qt.binding(function() {
            return window.height - 20;
          })}
        >
          <ColumnLayout>
            <Text text={this.state.error.message} />
            <Text text={this.state.error.stack} />
          </ColumnLayout>
        </Rectangle>
      );
    }

    const contentItem = (
      <ColumnLayout>
        <View backgroundColor="blue">
          <ProgressBar indeterminate visible Layout={{ fillWidth: true }} />

          <ColumnLayout Layout={{ margins: 32 }} spacing={16}>
            <TextField
              placeholderText={qsTr('Email')}
              Layout={{ fillWidth: true }}
            />
            <TextField
              placeholderText={qsTr('Password')}
              Layout={{ fillWidth: true }}
            />
            <Button Layout={{ fillWidth: true }} text="Login" />
          </ColumnLayout>
        </View>
      </ColumnLayout>
    );

    return (
      <ColumnLayout>
        <Popup
          objectName="Popup"
          x={300}
          y={300}
          width={320}
          modal={false}
          visible
          padding={0}
          closePolicy={0}
          ref={this.getRef}
        >
          {contentItem}
        </Popup>

        <Button onClicked={this.toggle} text="toggle" />
      </ColumnLayout>
    );
  }
}

export default App;
