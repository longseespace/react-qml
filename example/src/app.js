import Item from 'qtquick-react/QtQuick/2.7/Item';
import ColumnLayout from 'qtquick-react/QtQuick/Layouts/1.2/ColumnLayout';
import Popup from 'qtquick-react/QtQuick/Controls/2.2/Popup';
import ProgressBar from 'qtquick-react/QtQuick/Controls/2.2/ProgressBar';
import Label from 'qtquick-react/QtQuick/Controls/2.2/Label';
import TextField from 'qtquick-react/QtQuick/Controls/2.2/TextField';
import Button from 'qtquick-react/QtQuick/Controls/2.2/Button';

import * as React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenVisible: true,
    };

    this.onSubmit = (email, password) => {
      console.log('onSubmit', email, password);
    };

    this.onEmailChanged = (email) => {
      console.log('onEmailChanged', email);
    };
  }

  render() {
    const { greenVisible } = this.state;
    return (
      <Item>
        <Popup x={300} y={300} width={320} modal={false} visible padding={0}
          contentItem={
            <ColumnLayout>
              <ProgressBar indeterminate visible Layout={{ fillWidth: true }} />
              <ColumnLayout Layout={{ margins: 32 }} spacing={16}>
                <Label color="red" Layout={{ fillWidth: true }} />
                <TextField placeholderText={qsTr("Email")} Layout={{ fillWidth: true }}  />
                <TextField placeholderText={qsTr("Password")} Layout={{ fillWidth: true }}  />
                <Button Layout={{ fillWidth: true }} text="Login"  />
              </ColumnLayout>
            </ColumnLayout>
          }
        />
      </Item>
    );
  }
}

export default App;
