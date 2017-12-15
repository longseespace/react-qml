import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtWebSockets 1.0

Item {
  // ugh
  id: blackhole

  // this is set from main.cpp
  property bool __DEBUG__

  Component.onCompleted: {
    if (__DEBUG__) {
      console.log("DEBUG MODE")
    }
  }

  // main application content
  // in debug mode fetched from http, in production, builtin version is used
  Loader {
    id: loader
    source: "qrc:/main.qml"
    asynchronous: false

    function reload() {
      if (loader.status === Loader.Loading) {
        return console.log("Ignoring reload request, reload in progress");
      }

      var src = source;
      loader.setSource("");
      __platform.clearCache();
      loader.setSource(src);

      console.log("application reload");

      // restart websocket debug server
      wsDebugServer.active = false;
      wsDebugServer.active = true;
    }
  }

}
