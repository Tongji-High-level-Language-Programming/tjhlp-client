#include <QApplication>

#include <QWebEngineView>
#include <QWebChannel>
#include <QVBoxLayout>
#include <QWidget>
#include "Bridge.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    // 1. 创建主窗口
    QWidget window;
    window.setWindowTitle("Qt Hybrid Hello World");
    window.resize(800, 600);

    QVBoxLayout *layout = new QVBoxLayout(&window);

    // 2. 创建 WebEngineView
    QWebEngineView *view = new QWebEngineView(&window);
    layout->addWidget(view);

    // 3. 设置 WebChannel
    QWebChannel *channel = new QWebChannel(view);
    Bridge *bridge = new Bridge(&window);
    
    // 注册名为 "core" 的对象，JS 中将通过 channel.objects.core 访问它
    channel->registerObject("core", bridge);
    view->page()->setWebChannel(channel);

    // 4. 加载资源文件中的 HTML
    view->setUrl(QUrl("qrc:/index.html"));

    window.show();
    return app.exec();
}