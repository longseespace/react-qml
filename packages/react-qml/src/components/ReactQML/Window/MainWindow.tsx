import React from 'react';

import { QQuickWindow, QWindow_Visibility } from '../../QtQuickWindow';
import { QQuickCloseEvent } from '../../QtQuick';
import RQElementContainer from '../../../renderer/RQElementContainer';

declare const __mainWindow: QQuickWindow;

let container: RQElementContainer;
try {
  container = new RQElementContainer(__mainWindow, { defaultProp: 'data' });
} catch (error) {
  console.error('__mainWindow not found');
}

type Props = {
  forwardedRef?: any;
  visible?: boolean;
  onClosing?: (ev: QQuickCloseEvent) => void;
  visibility?: QWindow_Visibility | string;
} & { [key: string]: any };

type PlainObject = { [key: string]: any };

const omit = (props: Array<string>) => (source: PlainObject) =>
  Object.keys(source).reduce((target: PlainObject, key) => {
    if (props.indexOf(key) === -1) {
      target[key] = source[key];
    }
    return target;
  }, {});

const omitNonNativeProps = omit(['children', 'ref', 'forwardedRef', 'key']);

class MainWindowWrapper extends React.Component<Props> {
  onClosing = (ev: QQuickCloseEvent) => {
    ev.accepted = false;
    if (this.props.onClosing) {
      this.props.onClosing(ev);
    }
  };

  componentDidMount() {
    const {
      // onClosing, // unused
      visible,
      visibility,
      forwardedRef,
      children,
      ...otherProps
    } = this.props;

    try {
      forwardedRef.current = __mainWindow;
    } catch (e) {
      // no mainwindow
      console.error('__mainWindow not found');
    }

    const defaultVisibility = visible ? 'AutomaticVisibility' : 'Hidden';
    const nextProps = {
      // onClosing: this.onClosing,
      visible: visible,
      visibility: visibility ? visibility : defaultVisibility,
      ...otherProps,
    };

    container.updateNativeProps({}, nextProps);
  }

  componentDidUpdate(prevProps: any) {
    const { forwardedRef } = this.props;

    try {
      forwardedRef.current = __mainWindow;
    } catch (e) {
      // no mainwindow
      console.error('__mainWindow not found');
    }

    container.updateNativeProps(
      omitNonNativeProps(prevProps),
      omitNonNativeProps(this.props)
    );
  }

  componentWillUnmount() {
    const { forwardedRef } = this.props;
    if (forwardedRef) {
      forwardedRef.current = null;
    }

    // reset props
    container.updateNativeProps(omitNonNativeProps(this.props), {});
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const MainWindow = React.forwardRef<QQuickWindow, Props>((props, ref) => (
  <MainWindowWrapper forwardedRef={ref} {...props} />
));

export default MainWindow;
