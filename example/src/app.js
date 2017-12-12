import 'es6-map/implement';
import 'es6-set/implement';
import * as React from 'react';

import dialogQMLContent from './dialog.qml';

class Dialog extends React.Component {
  render() {
    return <item dangerouslySetInnerQML={{ __qml: dialogQMLContent }} {...this.props} />;
  }
}

export function create() {
  return React.createElement(App);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenVisible: true,
    };

    this.toggle = () => {
      console.log('toggle');
      this.setState({
        greenVisible: !this.state.greenVisible,
      });
    };
  }

  render() {
    const { greenVisible } = this.state;
    return (
      <Dialog
        x={30}
        y={30}
        width={320}
        height={300}
        visible
        onSubmit={this.toggle}
      />
    );
  }
}
