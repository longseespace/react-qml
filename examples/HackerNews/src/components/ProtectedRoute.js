import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';

import { accessTokenSelector } from './authentication.state';
import Route from './Route';

const connectToRedux = connect(state => ({
  accessToken: accessTokenSelector(state),
}));

class ProtectedRoute extends React.Component {
  render() {
    const { accessToken, component: Component, ...props } = this.props;

    const isAuthenticated = accessToken && accessToken.length > 0;

    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

export default connectToRedux(ProtectedRoute);
