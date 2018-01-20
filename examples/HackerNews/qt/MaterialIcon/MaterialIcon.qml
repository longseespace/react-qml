import QtQuick 2.7

import "MaterialIcons.js" as Code

Text
{
    property string source: ""
    property int size: 30
    property alias style: text.style

    id: text
    font.pixelSize: size
    font.family: "Material Icons"
    height: size
    width: size
    text: Code.img[source] || ""
    color: "#FFFFFF"
    verticalAlignment: Text.AlignVCenter
    horizontalAlignment: Text.AlignHCenter
}
