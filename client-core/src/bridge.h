#pragma once
#include <QObject>
#include <QDebug>
#include <QMessageBox>

class Bridge : public QObject {
    Q_OBJECT
public:
    explicit Bridge(QObject *parent = nullptr);

    // Q_INVOKABLE 使这个函数可以在 JS 中被调用
    Q_INVOKABLE void showMessage(const QString &msg);
    Q_INVOKABLE QString getSystemTime();
};
