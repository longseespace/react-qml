import { Label } from 'react-qml';
import * as React from 'react';

class MainPage extends React.Component {
  render() {
    return (
      <Label
        text="Qt Quick Controls 2 provides a set of controls that can be used to build complete interfaces in Qt Quick."
        elide={Label.ElideRight}
        horizontalAlignment={Qt.AlignHCenter}
      />
    );
  }
}

export default MainPage;
