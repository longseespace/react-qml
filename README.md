# ReactQML

Build native, high-performance, cross-platform universal applications (desktop **and** mobile) through a React (and/or QML) syntax

🚧 **NOTE:** ReactQML is a work-in-progress! 🚧

# Features

- Native components: no Electron
- Batteries included: access to full webpack ecosystem and wide sets of [QML modules][qml_module_list]
- Cross platform: macOS/Windows/Linux/Android/iOS/tvOS/watchOS (see [Qt supported platforms][suported_platforms]).
- Write codes in modern Javascript (ES2016+) or TypeScript (transpiling with babel, bundling with webpack, highly customizable)
- Works with existing front-end libraries such as redux, lodash, rxjs, redux-observable etc.
- Supports Hot Module Reloading
- Supports react-devtools & redux-devtools (Time Travel Debugging possible)
- New in v0.5: supports React Hooks!

# Quickstart

See [react-qml-quickstart](https://github.com/longseespace/react-qml-quickstart) and [Ben](https://github.com/longseespace/ben)

# API Example

You can build UI components using JSX syntax and/or QML syntax.

### React Component

```jsx
import React from "react";
import { render, Window, ColumnLayout, Text } from "react-qml";

const styles = {
  window: {
    width: 400,
    height: 500
  },
  title: {
    fontSize: 20
  },
  subtitle: {
    color: "#333"
  }
};

const App = () => (
  <Window visible style={styles.window}>
    <ColumnLayout width={200} anchors={{ centerIn: "parent" }}>
      <Text
        text="Welcome to React QML"
        Layout={{ fillWidth: true }}
        style={styles.title}
      />
      <Text
        text="To get started, edit index.js"
        Layout={{ fillWidth: true }}
        style={styles.subtitle}
      />
    </ColumnLayout>
  </Window>
);

export default () => render(<App />);
```

### QML Components

`App.qml`

```qml
import QtQuick 2.7
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.0
import QtQuick.Window 2.2

Window {
  width: 400
  height: 500
  visible: true

  ColumnLayout {
    width: 200
    x: (Window.width - width) / 2
    y: (Window.height - height) / 2

    Text {
      text: "Welcome to React QML"
      Layout.fillWidth: true
      font.pointSize: 20
    }

    Text {
      text: "To get started, edit App.qml"
      color: "#333333"
      Layout.fillWidth: true
    }
  }
}
```

`index.js`

```jsx
import React from "react";
import { render } from "react-qml";

import App from "./App.qml";

export default () => render(<App />);
```

# Other Awesome Projects

- [Haul][haul]: A command line tool for developing React Native apps
- [Revery][revery]: ⚡️ Native, high-performance, cross-platform desktop apps - built with Reason!
- [Proton Native][pn]: Create native desktop applications through a React syntax, on all platforms
- [React Native][rn]: Build native mobile apps using JavaScript and React
- [React Native Desktop][rnd]: A Desktop port of React Native, driven by Qt, forked from Canonical
- [React Native macOS][rnm]: React Native for macOS is an experimental fork for writing desktop apps using Cocoa

# License

- ReactQML is available under [MIT license][license]
- Qt is available under different licensing options. See [here][qt_licensing] and [here][qt5_licensing]

Copyright for portions of project React QML are held by [Mike Grabowski][mg] as part of project [Haul][haul].
All other copyright for project React QML are held by [Long Nguyen][ln].

[mg]: https://github.com/grabbou
[haul]: https://callstack.github.io/haul/
[revery]: https://github.com/revery-ui/revery
[pn]: https://github.com/kusti8/proton-native
[rn]: https://facebook.github.io/react-native/
[rnd]: https://github.com/status-im/react-native-desktop
[rnm]: https://github.com/ptmt/react-native-macos
[qt_licensing]: https://www.qt.io/licensing/
[qt5_licensing]: http://doc.qt.io/qt-5/licensing.html
[license]: https://github.com/longseespace/react-qml/blob/master/LICENSE
[suported_platforms]: http://doc.qt.io/archives/qt-5.10/supported-platforms.html
[qml_module_list]: http://doc.qt.io/archives/qt-5.10/modules-qml.html
[qt5_lang_binding]: https://en.wikipedia.org/wiki/List_of_language_bindings_for_Qt_5
[branch_next]: https://github.com/longseespace/react-qml/tree/next
[ln]: https://github.com/longseespace
[qml_app]: http://doc.qt.io/qt-5.10/qmlapplications.html
