import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.1
import QtQuick.Window 2.2

import "ReactQML.build.js" as ReactPkg;
import "App.build.js" as AppPkg;

ApplicationWindow {
  visible: true
  title: qsTr("BodiData Scanner")

  width: 1024
  height: 768

  Item {
    id: root

    Item {}

    Component.onCompleted: {
      var app = AppPkg.App.create();
      ReactPkg.ReactQML.render(app, root);
    }
  }
}
