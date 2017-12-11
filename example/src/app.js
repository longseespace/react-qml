require('es6-map/implement');
require('es6-set/implement');

var React = require('react');

function create() {
  return React.createElement(App);
}

function App (props) {
  return <rectangle x={100} y={100} width={500} height={500} color="red">
    <rectangle x={110} y={110} width={100} height={100} color="blue"/>
  </rectangle>
}

exports.create = create;
exports.App = App;
