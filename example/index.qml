import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.2

import "dist/bundle.js" as AppPkg;

Item {
  visible: true
  id: root
  Component.onCompleted: {
    AppPkg.Bundle.init(root);
  }
}
