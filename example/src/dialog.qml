import QtQuick 2.7
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.1
import QtQuick.Controls.Material 2.0

Item {

  // props and signal
  property alias errorMessage: errorLabel.text
  property alias errorVisible: errorLabel.visible
  default property bool processing: false
  property alias email: emailField.text
  property alias password: passwordField.text
  signal submit(string email, string password)
  // ----------------

  Popup {

    closePolicy: Popup.NoAutoClose
    width: 320
    modal: false

    visible: true

    Material.elevation: 1
    padding: 0

    contentItem: ColumnLayout {
      id: loginColumn

      ProgressBar {
        Layout.fillWidth: true
        indeterminate: true
        visible: processing
      }

      ColumnLayout {
        Layout.margins: 32
        spacing: 16

        Label {
          id: errorLabel
          color: 'red'
          Layout.fillWidth: true
          horizontalAlignment: Text.AlignHCenter
        }

        TextField {
          id: emailField
          placeholderText: qsTr("Email")
          font.family: "Roboto"
          Layout.preferredWidth: 0
          Layout.fillWidth: true
          anchors.horizontalCenter: parent.horizontalCenter
          text: ""
          enabled: !processing
        }

        TextField {
          id: passwordField
          placeholderText: qsTr("Password")
          font.family: "Roboto"
          Layout.preferredWidth: 0
          Layout.fillWidth: true
          text: ""
          anchors.horizontalCenter: parent.horizontalCenter
          echoMode: TextInput.Password
          enabled: !processing
        }

        Button {
          id: loginButton
          height: 32
          Layout.preferredWidth: 0
          Layout.fillWidth: true
          anchors.horizontalCenter: parent.horizontalCenter
          highlighted: true

          enabled: emailField.acceptableInput && passwordField.acceptableInput && !processing

          onClicked: {
            submit(emailField.text, passwordField.text);
          }

          contentItem: Text {
            text: qsTr("Login")
            font.capitalization: Font.AllUppercase
            font.family: "Roboto"
            color: 'white'
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            elide: Text.ElideRight
          }
        }

      }

    }
  }

}
