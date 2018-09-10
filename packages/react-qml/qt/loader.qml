import QtQuick 2.10
import QtQuick.Controls 2.3
import QtQuick.Controls.Material 2.3
import QtQuick.Layouts 1.0
import QtWebSockets 1.0

Loader {
  property string devServerHost: "localhost"
  property int devServerPort: 8081
  property string qmlFileName: "index.qml"
  property bool hotReload: true

  source: 'http://'+devServerHost+':'+devServerPort+'/'+qmlFileName+'?t='+Date.now()
  asynchronous: false

  // websocket for HMR
  WebSocket {
    id: hotws
    url: 'ws://'+devServerHost+':'+devServerPort+'/hot'
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
