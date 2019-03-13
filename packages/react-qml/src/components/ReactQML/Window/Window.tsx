import React from 'react';

import QtQuickWindow, {
  QQuickWindow,
  QWindow_Visibility,
} from '../../QtQuickWindow';
import { QQuickCloseEvent } from '../../QtQuick';

const NativeWindow = QtQuickWindow.Window;

type Props = {
  forwardedRef?: any;
  visible?: boolean;
  onClosing?: (ev: QQuickCloseEvent) => void;
  visibility?: QWindow_Visibility | string;
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
      onClosing, // unused
      visible,
      visibility,
      forwardedRef,
      ...otherProps
    } = this.props;
    const defaultVisibility = visible ? 'AutomaticVisibility' : 'Hidden';
    return (
      <NativeWindow
        ref={forwardedRef}
        onClosing={this.onClosing}
        visible={visible}
        visibility={visibility ? visibility : defaultVisibility}
        {...otherProps}
      />
    );
  }
}

const Window = React.forwardRef<QQuickWindow, Props>((props, ref) => (
  <WindowWrapper forwardedRef={ref} {...props} />
));

export default Window;
