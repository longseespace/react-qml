import React from 'react';
import QtQuick, { QQuickGrid, QQuickTransition } from '../../QtQuick';
const Positioner = QtQuick.Grid;

export type Props = {
  populate?: any;
  add?: any;
  move?: any;
} & { [key: string]: any };

// TODO: forwardedRef
class Grid extends React.Component<Props> {
  private controlRef = React.createRef<QQuickGrid>();
  private populateRef = React.createRef<QQuickTransition>();
  private addRef = React.createRef<QQuickTransition>();
  private moveRef = React.createRef<QQuickTransition>();

  componentDidUpdate() {
    const $control = this.controlRef.current;
    const $populate = this.populateRef.current;
    const $add = this.addRef.current;
    const $move = this.moveRef.current;

    if ($control) {
      $control.populate = $populate;
      $control.add = $add;
      $control.move = $move;
    }
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

export default Grid;
