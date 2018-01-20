import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import * as React from 'react';

import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import ProtectedRoute from './src/components/ProtectedRoute';
import Route from './src/components/Route';

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

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('Error');
    console.log(error, info);
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/profile" component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
