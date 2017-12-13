import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.1
import QtQuick.Window 2.2
import QtWebSockets 1.0

Item {
  // this is set from main.cpp
  property bool _DEBUG_MODE

  // main application content
  // in debug mode fetched from http, in production, builtin version is used
  Loader {
    id: loader
    // source: _DEBUG_MODE ? "http://127.0.0.1:44333/index.qml" : "qrc:/index.qml"
    source: "qrc:/index.qml"
    anchors.fill: parent
    asynchronous: false

    function reload() {
      if (loader.status === Loader.Loading) {
        return console.log("Ignoring reload request, reload in progress");
      }

      console.log("application reload");

      var src = source;
      source = "";
      __platform.clearCache();
      source = src;

      // restart websocket debug server
      wsDebugServer.active = false;
      wsDebugServer.active = true;
    }
  }
}
