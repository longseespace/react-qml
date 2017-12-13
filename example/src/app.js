import * as React from 'react';

import Frame from 'qtquick-react/QtQuick/Controls/2.2/Frame';
import Button20 from 'qtquick-react/QtQuick/Controls/2.0/Button';
import Button22 from 'qtquick-react/QtQuick/Controls/2.2/Button';

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
      <Frame>
        <Button20 x={200} y={200} text="Click 1" />
        <Button22 x={300} y={300} text="Click 2" />
      </Frame>
    );
  }
}

export default App;
