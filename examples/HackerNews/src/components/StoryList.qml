import QtQuick 2.7
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.0
import QtQuick.Controls.Material 2.0

ListView {

  width: 360
  Layout.fillHeight: true

  anchors.fill: parent

  model: ListModel {
      ListElement {
          title: "My YC app: Dropbox - Throw away your USB drive"
          by: "dhouston"
          url: "http://www.getdropbox.com/u/2/screencast.html"
          time: ""
      }
      ListElement {
          title: "Justin.tv is looking for a Lead Flash Engineer!"
          by: "justin"
          url: ""
          time: ""
      }
      ListElement {
          title: "Ask HN: The Arc Effect"
          by: "tel"
          url: ""
          time: ""
      }
      ListElement {
          title: "Clinical trial finds blood-plasma infusions for Alzheimer’s safe, promising"
          by: "monort"
          url: ""
          time: ""
      }
      ListElement {
          title: "How drug lords make billions smuggling gold to Miami for your jewelry and phones"
          by: "johnny313"
          url: ""
          time: ""
      }
      ListElement {
          title: "Brushing up on operating systems and C programming"
          by: "shbhrsaha"
          url: "http://www.shubhro.com/2018/01/20/brushing-up-os-c/"
          time: "3 hrs"
          descendants: 14
          score: 70
      }
  }

  delegate: Component {
    Column {

      Column {
        padding: 12
        spacing: 3

        Text {
          text: title

          width: 300
          font.family: "Roboto"
          font.pointSize: 16
          wrapMode: Text.WordWrap
        }
        Row {
          width: 300
          spacing: 12

          Text {
            text: by

            font.family: "Roboto"
            font.pointSize: 12
            color: '#888'
            wrapMode: Text.WordWrap
          }

          Text {
            text: time
            visible: time.length > 0

            font.family: "Roboto"
            font.pointSize: 12
            color: '#888'
            wrapMode: Text.WordWrap
          }
        }

        Text {
          text: url
          visible: url.length > 0

          width: 300
          font.family: "Roboto"
          font.pointSize: 12
          color: '#888'
          elide: Text.ElideRight
        }
      }

      Rectangle {
        width: 360
        height: 1
        color: '#ccc'
      }
    }
  }
}
