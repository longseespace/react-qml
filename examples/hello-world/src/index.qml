import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtQuick.Window 2.2

import "macos.bundle.js" as JS;

ApplicationWindow {
  id: root
  
  visible: true
  width: 400
  height: 500

  Component.onCompleted: {
    try {
      JS.Bundle.default(root);
    } catch (ex) {
      console.log(ex);
      Qt.quit();
    }
  }
}
