import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtWebSockets 1.0

ApplicationWindow {
  visible: true
  width: 1
  height: 1
  x: 0
  y: 0

  // loader
  property int devServerPort: 8081
  property string bundleFileName: "main.qml"

  Loader {
    source: 'http://localhost:'+devServerPort+'/'+bundleFileName+'?t='+Date.now()
    id: loader
    asynchronous: false

    function reload() {
      if (loader.status === Loader.Loading) {
        return console.log("Ignoring reload request, reload in progress");
      }

      source = "";
      __platform.clearCache();
      source = 'http://localhost:'+devServerPort+'/'+bundleFileName+'?t='+Date.now()

      console.log("application reload", source);

      // restart websocket
      ws.active = false;
      ws.active = true;
    }
  }

  Shortcut {
    enabled: true
    sequence: StandardKey.Refresh
    context: Qt.ApplicationShortcut
    onActivated: loader.reload()
  }

  // websocket client used for development
  WebSocket {

    property int msgId: 10000

    id: ws
    url: 'ws://localhost:'+devServerPort+'/debugger-proxy?role=client'
    active: true

    onStatusChanged: {
      if (status === WebSocket.Error) {
        console.log("WebSocker error:", errorString)
        return;
      }
      if (status === WebSocket.Open) {
        console.log("WebSocker connected:", url)
        prepareJSRuntime();
      }
    }

    onTextMessageReceived: {
      console.log("WebSocket message:", message)
    }

    function prepareJSRuntime() {
      ws.sendTextMessage(JSON.stringify({ id: msgId, "method": "prepareJSRuntime" }));
      msgId++;
    }
  }

}
