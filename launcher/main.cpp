#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

int main(int argc, char *argv[]) {
  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QGuiApplication app(argc, argv);

  // setup app basic metadata
  app.setOrganizationName("Podzim");
  app.setOrganizationDomain("podzim.co");
  app.setApplicationName("Launcher");

  QQmlApplicationEngine engine;
  engine.addImportPath(QStringLiteral("qrc:/"));
  engine.load(QUrl(QLatin1String("qrc:/main.qml")));

  return app.exec();
}
