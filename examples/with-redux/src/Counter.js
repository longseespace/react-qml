import { connect } from 'react-redux';
import * as React from 'react';

import Button from './components/Button';
import ColumnLayout from './components/ColumnLayout';
import Text from './components/Text';

const connectToRedux = connect(
  state => ({
    value: state.counter,
  }),
  {
    onIncrement: () => ({ type: 'INCREMENT' }),
    onDecrement: () => ({ type: 'DECREMENT' }),
  }
);

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement();
    }
  }

  incrementAsync() {
    console.log('incrementAsync');
    setTimeout(this.props.onIncrement, 1000);
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <ColumnLayout Layout={{ row: 1, column: 1 }}>
        <Text
          text={`Clicked: ${value} times`}
          font={{ pointSize: 20 }}
          horizontalAlignment={Text.AlignJustify}
          Layout={{ fillWidth: true }}
        />
        <Button text="Increment" onClicked={onIncrement} />
        <Button text="Decrement" onClicked={onDecrement} />
        <Button text="Increment if odd" onClicked={this.incrementIfOdd} />
        <Button text="Increment async" onClicked={this.incrementAsync} />
      </ColumnLayout>
    );
  }
}

export default connectToRedux(Counter);
