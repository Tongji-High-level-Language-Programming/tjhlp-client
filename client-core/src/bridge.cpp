#include "Bridge.h"
#include <QDateTime>

Bridge::Bridge(QObject *parent) : QObject(parent) {}

void Bridge::showMessage(const QString &msg) {
  qDebug() << "JS called C++:" << msg;
  QMessageBox::information(nullptr, "Message from JS", msg);
}

QString Bridge::getSystemTime() {
  return QDateTime::currentDateTime().toString();
}