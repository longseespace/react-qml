import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtQuick.Controls.Material 2.0
import QtQuick.Controls.Universal 2.0
import QtQuick.Window 2.2
import Qt.labs.settings 1.0

import "macos.bundle.js" as JS;

Item {
  id: root

  // title: qsTr('ReactQML Gallery')
  // x: 200
  // y: 100
  // width: 800
  // height: 600
  // visible: true
  //
  // Settings {
  //   id: appSettings
  //   property alias x: mainWindow.x
  //   property alias y: mainWindow.y
  //   property alias width: mainWindow.width
  //   property alias height: mainWindow.height
  // }
  // 
  // Item {
  //   id: root
  //
  //   width: mainWindow.width
  //   height: mainWindow.height
  // }

  Component.onCompleted: {
    try {
      JS.Bundle.init(root);
    } catch (ex) {
      console.log(ex);
      Qt.quit();
    }
  }
}
