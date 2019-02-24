import React from 'react';

import QtQuickWindow from '../../QtQuickWindow';

const NativeWindow = QtQuickWindow.Window;

export type CloseEvent = {
  accepted: boolean;
};

export type WindowProps = {
  visible?: boolean;
  onClosing?: (ev: CloseEvent) => void;
};

class Window extends React.Component<WindowProps> {
  onClosing = (ev: CloseEvent) => {
    ev.accepted = false;
    if (this.props.onClosing) {
      this.props.onClosing(ev);
    }
  };

  render() {
    const { onClosing, visible = true, ...otherProps } = this.props;
    return (
      <NativeWindow
        onClosing={this.onClosing}
        visible={visible}
        visibility={visible ? 'AutomaticVisibility' : 'Hidden'}
        {...otherProps}
      />
    );
  }
}

export default Window;
