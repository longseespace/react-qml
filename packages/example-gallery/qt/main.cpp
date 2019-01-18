#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickStyle>

int main(int argc, char *argv[])
{
  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QGuiApplication app(argc, argv);

  QQmlApplicationEngine engine;
  engine.addImportPath(QStringLiteral("qrc:/"));
#ifdef DEBUG
  engine.rootContext()->setContextProperty("DEV_MODE", true);
#else
  engine.rootContext()->setContextProperty("DEV_MODE", false);
#endif
  engine.load(QUrl(QLatin1String("qrc:/main.qml")));

  return app.exec();
}
