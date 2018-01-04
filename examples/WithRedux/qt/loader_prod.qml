import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtQuick.Window 2.2
import Qt.labs.settings 1.0

Item {

  Settings {
    id: __settings__

    property alias windowX: __window__.x
    property alias windowY: __window__.y

    Component.onCompleted: {
      __app_loader__.source = 'main.qml'
    }
  }

  ApplicationWindow {
    id: __window__

    visible: true
    width: 1024
    height: 768

    // __app_loader__
    Loader {
      id: __app_loader__
      asynchronous: false
    }
  }

}
