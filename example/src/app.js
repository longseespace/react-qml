import * as React from 'react';

import Dialog from './dialog.qml';

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
      <item>
        <Dialog
          x={300}
          y={200}
          width={320}
          visible
          onSubmit={this.onSubmit}
          email="test@bodidata.com"
          password="12345678"
        />
        <textfield placeholderText="Email" width={320} x={300} y={160} onTextEdited={this.onEmailChanged} />
      </item>
    );
  }
}

export default App;
