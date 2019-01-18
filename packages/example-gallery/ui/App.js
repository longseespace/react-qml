import { Provider } from 'react-redux';
import * as React from 'react';

import MainWindow from './components/MainWindow';

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
        <MainWindow />
      </Provider>
    );
  }
}

export default App;
