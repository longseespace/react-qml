import React from 'react';

import TextField from 'qt-react/QtQuick/Controls/2.2/TextField';

class TextFieldWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.getRef = inst => {
      if (inst) {
        this.textField = inst.qmlObject;
      }
    };

    this.notifyTextEdited = () => {
      if (this.textField && this.props.onTextEdited) {
        this.props.onTextEdited(this.textField.text);
      }
    };
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { onTextEdited, ref, ...otherProps } = this.props;
    return (
      <TextField
        ref={this.getRef}
        onTextEdited={this.notifyTextEdited}
        {...otherProps}
      />
    );
  }
}

export default TextFieldWrapper;
