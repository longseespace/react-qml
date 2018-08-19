import QtQuick 2.10
import QtQuick.Controls 2.3
import QtQuick.Controls.Material 2.3
import QtQuick.Layouts 1.0
import QtWebSockets 1.0
import QtQuick.Window 2.3
import Qt.labs.settings 1.0

ApplicationWindow {

  // public props and signals
  id: __window__

  property int devServerPort: 8081
  property string qmlFileName: "main.qml"
  property bool hotReload: true
  // -----------------

  visible: true
  width: 1024
  height: 768

  Settings {
    id: __settings__

    property alias windowX: __window__.x
    property alias windowY: __window__.y
  }

  // __app_loader__
  Loader {
    source: 'http://localhost:'+devServerPort+'/'+qmlFileName+'?t='+Date.now()
    id: __app_loader__
    asynchronous: false
  }

  // websocket for HMR
  WebSocket {

    id: hotws
    url: 'ws://localhost:'+devServerPort+'/hot'
    active: hotReload

    onStatusChanged: {
      if (status === WebSocket.Error) {
        console.log("HMR WebSocker error:", errorString)
        return;
      }
      if (status === WebSocket.Open) {
        console.log("HMR WebSocker connected:", url)
      }
    }

    onTextMessageReceived: {
      console.log("HMR WebSocket message:", message)
    }
  }

}
