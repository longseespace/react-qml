import 'es6-map/implement';
import 'es6-set/implement';
import * as React from 'react';

const DialogQMLComponent = Qt.createComponent('./dialog.qml');
const elements = new Set();
const DialogJSComponent = props => DialogQMLComponent.createObject(null, props);

DialogQMLComponent.statusChanged.connect(() => {
  elements.forEach(element => element.forceUpdate());
});

class Dialog extends React.Component {
  componentWillMount() {
    elements.add(this);
  }

  componentWillUnmount() {
    elements.remove(this);
  }

  render() {
    // FIXME: READY?
    if (DialogQMLComponent.status === Component.ready) {
      console.log('objectName 2', this.props.objectName);
      return React.createElement(
        (props) => DialogQMLComponent.createObject(null, props),
        this.props,
        null
      );
    }

    return null;
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
      console.log('------------- TOGGLE');
      this.setState({
        greenVisible: !this.state.greenVisible,
      });
    };
  }

  render() {
    const { greenVisible } = this.state;
    return (
      <rectangle x={100} y={100} width={500} height={500}>
        <button
          x={300}
          y={300}
          width={100}
          height={44}
          text="Click Me"
          onClicked={this.toggle}
        />
        <popup x={30} y={30} width={320} height={300} visible closePolicy={Popup.NoAutoClose} modal={false} Material={{ elevation: 1 }} />
      </rectangle>
    );
  }
}
