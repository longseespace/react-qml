require('es6-map/implement');
require('es6-set/implement');

var React = require('react');

function create() {
  return React.createElement(App);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greenVisible: true
    }

    this.toggle = () => {
      console.log('------------- TOGGLE');
      this.setState({
        greenVisible: !this.state.greenVisible
      })
    }
  }

  render() {
    const {greenVisible} = this.state;
    return (
      <rectangle x={100} y={100} width={500} height={500} color="red">
        <rectangle x={10} y={10} width={100} height={100} color="blue"/>
        {greenVisible && <rectangle x={210} y={210} width={100} height={100} color="green"/>}
        <button x={300} y={300} width={100} height={44} text="Click Me" onClicked={this.toggle} />
      </rectangle>
    )
  }
}

exports.create = create;
exports.App = App;
