module.exports = function(qmlContent) {
  return `
  var React = require('react');
  var qmlContent = ${JSON.stringify(qmlContent)};

  class CustomQMLComponent extends React.Component {
    render() {
      var nextProps = {};

      for (var key in this.props) {
        nextProps[key] = this.props[key];
      }

      nextProps.__qmlRawContent = qmlContent;
      nextProps.ref = (qmlObject) => this.qmlObject = qmlObject;
      return React.createElement(
        'qml',
        nextProps,
        null
      );
    }
  }

  module.exports = CustomQMLComponent;
  `;
};
