import QtQuick 2.10
import QtQuick.Controls 2.3
import QtQuick.Layouts 1.0
import QtQuick.Window 2.3
import Qt.labs.settings 1.0

ApplicationWindow {

  id: __window__
  visible: true
  width: 400
  height: 500

  Settings {
    id: __settings__

    property alias windowX: __window__.x
    property alias windowY: __window__.y

    Component.onCompleted: {
      __app_loader__.source = 'main.qml'
    }
  }

  // __app_loader__
  Loader {
    id: __app_loader__
    asynchronous: false
  }

}
