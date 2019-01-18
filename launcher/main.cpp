#include "qtquickcontrolsapplication.h"
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

int main(int argc, char *argv[]) {
  QtQuickControlsApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QApplication app(argc, argv);
  app.setQuitOnLastWindowClosed(false);

  // setup app basic metadata
  app.setOrganizationName("Podzim");
  app.setOrganizationDomain("podzim.co");
  app.setApplicationName("Launcher");

  QQmlApplicationEngine engine;
  engine.addImportPath(QStringLiteral("qrc:/"));
  engine.load(QUrl(QLatin1String("qrc:/main.qml")));

  return app.exec();
}
