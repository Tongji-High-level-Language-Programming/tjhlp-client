// 1. 定义 C++ 暴露给 JS 的接口类型
// 必须与 C++ Bridge.h 中的 set method 参数一致
interface BackendCore {
  showMessage(msg: string): void
  getSystemTime(callback: (time: string) => void): void
  // 后面可以在这里加 submitCode, runTest ...
}

declare global {
  interface Window {
    qt: any // 声明 qt 对象存在于 window 上
  }
}

export class QtBridge {
  private static instance: BackendCore | null = null

  // 获取 Core 对象
  static async getCore(): Promise<BackendCore> {
    if (this.instance) {
      return this.instance
    }

    return new Promise((resolve) => {
      // A. 真实 Qt 环境
      if (window.qt && window.qt.webChannelTransport) {
        // 动态加载 QWebChannel 脚本 (如果 index.html 没写 script标签)
        // 或者假设 index.html 已经加载了 qwebchannel.js
        // 这里我们假设 window.QWebChannel 已经准备好了
        // @ts-ignore
        new window.QWebChannel(window.qt.webChannelTransport, (channel: any) => {
          this.instance = channel.objects.core as BackendCore
          console.log('Qt Bridge Connected 🚀')
          resolve(this.instance)
        })
      }
      // B. 浏览器开发环境 (Mock)
      else {
        console.warn('Qt Environment NOT detected. Using Mock Bridge. ⚠️')
        this.instance = this.createMock()
        resolve(this.instance)
      }
    })
  }

  // 模拟 C++ 行为
  private static createMock(): BackendCore {
    return {
      showMessage: (msg: string) => {
        alert(`[MOCK C++] Received: ${msg}`)
      },
      getSystemTime: (callback: (time: string) => void) => {
        console.log('[MOCK C++] Calculating time...')
        setTimeout(() => {
          callback('2077-01-01 12:00:00 (Mock)')
        }, 500) // 模拟网络/处理延迟
      },
    }
  }
}
