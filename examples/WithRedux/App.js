import { Provider } from 'react-redux';
import ApplicationWindow from 'qt-react/QtQuick/Controls/2.2/ApplicationWindow';
import * as React from 'react';

import Counter from './Counter';

class App extends React.Component {

  componentWillMount() {
    console.log('App', 'componentWillMount');
  }

  componentDidMount() {
    console.log('App', 'componentDidMount');
  }

  componentWillUnmount() {
    console.log('App', 'componentWillUnmount');
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ApplicationWindow title="WithRedux" visible width={600} height={400} x={100} y={100} color="#F5FCFF">
          <Counter />
        </ApplicationWindow>
      </Provider>
    )
  }
}

export default App;
