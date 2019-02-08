#include "qtquickcontrolsapplication.h"
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

int main(int argc, char *argv[]) {
  // Disable qml cache, or it would crash in development
  qputenv("QML_DISABLE_DISK_CACHE", "true");

  // This has the app draw at HiDPI scaling on HiDPI displays, usually two
  // pixels for every one logical pixel
  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);

  // This has QPixmap images use the @2x images when available
  // See this bug for more details on how to get this right:
  // https://bugreports.qt.io/browse/QTBUG-44486#comment-327410
  QCoreApplication::setAttribute(Qt::AA_UseHighDpiPixmaps);

  // QtQuickControlsApplication is basically an alias of
  // - <QWidget/QApplication> (on desktop)
  // - <QtGui/QGuiApplication> (on other platform)
  QtQuickControlsApplication app(argc, argv);

  // Do not automatically quit on last window closed
  // We need this for hot-reloading
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
