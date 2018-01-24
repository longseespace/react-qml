import QtQuick 2.7
import QtQuick.Layouts 1.3
import QtQuick.Controls 2.0
import QtQuick.Controls.Material 2.0

ListView {
  id: listView

  property bool loading: false
  property var stories: []
  property string hash

  signal loadMoreClicked();

  onHashChanged: {
    var count = model.count;
    if (stories.length > count) {
      var appendedStories = stories.slice(count, stories.length);
      appendedStories.forEach(model.appendStory);
    }
  }

  width: 360
  Layout.fillHeight: true
  anchors.fill: parent

  ScrollIndicator.vertical: ScrollIndicator {
    active: true
  }

  model: ListModel {
    id: model

    function appendStory(story) {
      append({
        title: story.title,
        by: story.by,
        comments: story.descendants || 0,
        time: story.time,
        score: story.score,
        text: story.text,
        url: story.url
      })
    }

    Component.onCompleted: {
      stories.forEach(appendStory);
    }
  }

  delegate: Component {
    Column {

      Column {
        padding: 12
        spacing: 5

        Text {
          text: title

          width: 336
          font.family: "Roboto"
          font.pointSize: 16
          wrapMode: Text.WordWrap
        }
        Row {
          width: 336
          spacing: 12

          Text {
            text: score + ' points by ' + by

            font.family: "Roboto"
            font.pointSize: 12
            color: '#888'
            wrapMode: Text.WordWrap
          }

          Text {
            text: comments + ' comments'
            visible: comments > 0

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

          width: 336
          font.family: "Roboto"
          font.pointSize: 12
          color: '#888'
          elide: Text.ElideRight
        }
      }

      Rectangle {
        width: 360
        height: 1
        color: '#ddd'
      }
    }
  }

  footer: Component {
    Button {
      onClicked: loadMoreClicked()

      text: listView.loading ? 'Loading...' : 'Load More...'
      enabled: !listView.loading
      visible: model.count > 0
      width: 360
      height: 40
      flat: true
    }
  }
}
