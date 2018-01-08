import { connect } from 'react-redux';
import { flow, path } from 'lodash/fp';
import Button from 'qt-react/QtQuick/Controls/2.2/Button';
import ColumnLayout from 'qt-react/QtQuick/Layouts/1.1/ColumnLayout';
import Label from 'qt-react/QtQuick/Controls/2.2/Label';
import Popup from 'qt-react/QtQuick/Controls/2.2/Popup';
import ProgressBar from 'qt-react/QtQuick/Controls/2.2/ProgressBar';
import Image from 'qt-react/QtQuick/2.7/Image';
import React from 'react';

import {
  authenticate,
  authenticationErrorSelector,
  isAuthenticatingSelector,
} from './authentication.state';
import { centerInWindow } from '../util/binding';
import TextField from './TextField';
import lockSvg from '../assets/lock.svg';

const connectToRedux = connect(
  state => ({
    isProcessing: isAuthenticatingSelector(state),
    submissionError: flow(authenticationErrorSelector, path('message'))(state),
    errorCode: flow(authenticationErrorSelector, path('code'))(state),
  }),
  {
    onSubmit: (email, password) => authenticate({ email, password }),
  },
);

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationError: props.validationError,
    };

    this.emailRef = inst => {
      this.emailField = inst.qmlObject;
    };

    this.passwordRef = inst => {
      this.passwordField = inst.qmlObject;
    };

    this.updateEmail = email => {
      this.email = email;
    };

    this.updatePassword = password => {
      this.password = password;
    };

    this.submit = () => {
      if (!this.email || !this.password) {
        this.setState({
          validationError: 'Email and Password are required',
        });
        return;
      }
      this.setState({
        validationError: '',
      });
      this.props.onSubmit && this.props.onSubmit(this.email, this.password);
    };
  }

  render() {
    const { submissionError = '', isProcessing = false } = this.props;
    const { validationError = '' } = this.state;
    return (
      <Popup
        closePolicy={0}
        visible
        width={320}
        modal={false}
        padding={0}
        Material={{ elevation: 1 }}
        {...centerInWindow}
      >
        <ColumnLayout>
          <ProgressBar
            Layout={{ fillWidth: true }}
            indeterminate
            opacity={isProcessing ? 1 : 0}
          />
          <ColumnLayout Layout={{ margins: 32 }} spacing={16}>
            <Image
              Layout={{ fillWidth: true }}
              source={lockSvg}
              fillMode="PreserveAspectFit"
              sourceSize={{
                width: 32,
                height: 32,
              }}
            />
            <Label
              visible={submissionError && submissionError.length > 0}
              text={submissionError}
              color="red"
              Layout={{ fillWidth: true }}
              font={{
                family: 'Roboto',
              }}
            />
            <Label
              visible={validationError && validationError.length > 0}
              text={validationError}
              color="red"
              Layout={{ fillWidth: true }}
              font={{
                family: 'Roboto',
              }}
            />
            <TextField
              placeholderText={qsTr('Email')}
              Layout={{ fillWidth: true }}
              onTextEdited={this.updateEmail}
              font={{
                family: 'Roboto',
              }}
            />
            <TextField
              placeholderText={qsTr('Password')}
              Layout={{ fillWidth: true }}
              echoMode={2}
              onTextEdited={this.updatePassword}
              font={{
                family: 'Roboto',
              }}
            />
            <Button
              Layout={{ fillWidth: true }}
              highlighted
              text="Login"
              onClicked={this.submit}
              font={{
                family: 'Roboto',
              }}
            />
          </ColumnLayout>
        </ColumnLayout>
      </Popup>
    );
  }
}

export default connectToRedux(LoginPopup);
