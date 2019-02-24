import React from 'react';
import QtQuick from '../../QtQuick';
const Positioner = QtQuick.Row;

export type QmlPositioner = {
  populate?: any;
  add?: any;
  move?: any;
};

export type PositionerProps = {
  populate: any;
  add: any;
  move: any;
};

class Row extends React.Component<PositionerProps> {
  controlRef = React.createRef();
  populateRef = React.createRef();
  addRef = React.createRef();
  moveRef = React.createRef();

  componentDidUpdate() {
    const $control = this.controlRef.current as QmlPositioner;
    const $populate = this.populateRef.current;
    const $add = this.addRef.current;
    const $move = this.moveRef.current;

    $control.populate = $populate;
    $control.add = $add;
    $control.move = $move;
  }

  render() {
    const { populate, add, move, children, ...otherProps } = this.props;

    // TODO: memoize
    let populateWithRef;
    if (populate) {
      populateWithRef = React.cloneElement(populate, {
        ref: this.populateRef,
      });
    }

    let addWithRef;
    if (add) {
      addWithRef = React.cloneElement(add, {
        ref: this.addRef,
      });
    }

    let moveWithRef;
    if (move) {
      moveWithRef = React.cloneElement(move, {
        ref: this.moveRef,
      });
    }

    return (
      <Positioner ref={this.controlRef} {...otherProps}>
        {populateWithRef}
        {addWithRef}
        {moveWithRef}
        {children}
      </Positioner>
    );
  }
}

export default Row;
