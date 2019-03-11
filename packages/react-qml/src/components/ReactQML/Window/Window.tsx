import React from 'react';

import QtQuickWindow, { QQuickWindow } from '../../QtQuickWindow';
import { QQuickCloseEvent } from '../../QtQuick';

const NativeWindow = QtQuickWindow.Window;

type Props = {
  forwardedRef?: any;
  visible?: boolean;
  onClosing?: (ev: QQuickCloseEvent) => void;
} & { [key: string]: any };

class WindowWrapper extends React.Component<Props> {
  onClosing = (ev: QQuickCloseEvent) => {
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

const Window = React.forwardRef<QQuickWindow, Props>((props, ref) => (
  <WindowWrapper forwardedRef={ref} {...props} />
));

export default Window;
