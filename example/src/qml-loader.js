module.exports = function (qmlContent) {
  return `
  var React = require('react');
  var qmlContent = ${JSON.stringify(qmlContent)};
  function CustomQMLComponent(props) {
    var nextProps = {};

    for (var key in props) {
      nextProps[key] = props[key];
    }

    nextProps.__qmlRawContent = qmlContent;
    return React.createElement(
      'qml',
      nextProps,
      null
    );
  }

  module.exports = CustomQMLComponent;
  `
}
