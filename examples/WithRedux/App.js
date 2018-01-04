import { Provider } from 'react-redux';
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
        <Counter />
      </Provider>
    )
  }
}

export default App;
