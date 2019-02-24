#include "rqnetworkaccessmanagerfactory.h"

#include <QNetworkAccessManager>
#include <QNetworkDiskCache>

QNetworkAccessManager *RQNetworkAccessManagerFactory::create(QObject *parent) {
  QNetworkAccessManager *nam = new QNetworkAccessManager(parent);
  auto cache = new QNetworkDiskCache(parent);
  cache->setCacheDirectory("react-qml-httpcache");
  nam->setCache(cache);
  return nam;
}
