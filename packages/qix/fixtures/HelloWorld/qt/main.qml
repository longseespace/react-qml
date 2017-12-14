import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0

import "dist/bundle.js" as AppPkg;

Item {
  id: root

  Component.onCompleted: {
    AppPkg.Bundle.init(root);
  }
}
