import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.0
import QtQuick.Controls.Material 2.2
import QtQuick.Window 2.2
import QtWebSockets 1.0
import Qt.labs.settings 1.0

ApplicationWindow {

  // props
  property string devServerHost: 'localhost'
  property int devServerPort: 8081
  property string entry: 'index.qml'
  // -----

  id: __window__

  visible: true
  width: 400
  height: 500

  flags: Qt.Window

  Settings {
    id: __settings__

    property alias windowX: __window__.x
    property alias windowY: __window__.y
    property alias windowWidth: __window__.width
    property alias windowHeight: __window__.height
  }

  Loader {
     id: __app_loader__
     asynchronous: true

     source: DEV_MODE ? 'http://'+devServerHost+':'+devServerPort+'/'+entry : 'qrc:/' + entry

     onStatusChanged: {
       if (__app_loader__.status === Loader.Error) {
         console.error("Failed to load main.qml");
         Qt.quit();
       }
     }
   }

   // websocket for HMR
   WebSocket {
     id: __hot_ws__
     url: 'ws://'+devServerHost+':'+devServerPort+'/hot'
     active: DEV_MODE

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
