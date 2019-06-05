#ifndef RQNETWORKACCESSMANAGERFACTORY_H
#define RQNETWORKACCESSMANAGERFACTORY_H

#include <QQmlNetworkAccessManagerFactory>

class RQNetworkAccessManagerFactory : public QQmlNetworkAccessManagerFactory {
public:
  QNetworkAccessManager *create(QObject *parent);
};

#endif // RQNETWORKACCESSMANAGERFACTORY_H
