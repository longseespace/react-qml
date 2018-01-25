import { connect } from 'react-redux';
import React from 'react';

import { currentUrlSelector } from './WebViewState';
import createQMLComponent from '../util/createQMLComponent';
import qmlSource from './WebView.qml';

const WebViewQML = createQMLComponent(qmlSource, 'App.WebView');

const connectToRedux = connect(state => ({
  url: currentUrlSelector(state),
}));

class WebView extends React.Component {
  componentWillMount() {}

  render() {
    // eslint-disable-next-line no-unused-vars
    const { url } = this.props;
    return <WebViewQML url={url} />;
  }
}

export default connectToRedux(WebView);
