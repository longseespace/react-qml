import QtQuick 2.10
import QtQuick.Controls 2.3
import QtQuick.Layouts 1.0
import QtQuick.Controls.Material 2.3
import QtQuick.Controls.Universal 2.3
import QtQuick.Window 2.3
import Qt.labs.settings 1.0

import "macos.bundle.js" as JS;

Item {
  id: root

  Component.onCompleted: {
    try {
      JS.Bundle.init(root);
    } catch (ex) {
      console.log(ex);
      Qt.quit();
    }
  }
}
