import React from 'react';

import QtQuickWindow from '../../QtQuickWindow';

const NativeWindow = QtQuickWindow.Window;

export type CloseEvent = {
  accepted: boolean;
};

export type WindowProps = {
  visible?: boolean;
  onClosing?: (ev: CloseEvent) => void;
  forwardedRef?: any;
};

class WindowWrapper extends React.Component<WindowProps> {
  onClosing = (ev: CloseEvent) => {
    ev.accepted = false;
    if (this.props.onClosing) {
      this.props.onClosing(ev);
    }
  };

  render() {
    const {
      onClosing,
      visible = true,
      forwardedRef,
      ...otherProps
    } = this.props;
    return (
      <NativeWindow
        ref={forwardedRef}
        onClosing={this.onClosing}
        visible={visible}
        visibility={visible ? 'AutomaticVisibility' : 'Hidden'}
        {...otherProps}
      />
    );
  }
}

const Window = React.forwardRef((props, ref) => (
  <WindowWrapper forwardedRef={ref} {...props} />
));

export default Window;
