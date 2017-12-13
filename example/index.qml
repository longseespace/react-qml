import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Window 2.2

import "dist/bundle.js" as AppPkg;

ApplicationWindow {
  visible: true
  title: qsTr("BodiData Scanner")

  width: 1024
  height: 768

  Item {
    id: root

    Component.onCompleted: {
      AppPkg.Bundle.init(root);
    }
  }
}
