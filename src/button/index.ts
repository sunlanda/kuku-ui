import type { App } from 'vue'
import KButton from './src/button.vue'

// 定义 install 方法
KButton.install = (app: App) => {
  app.component(KButton.name, KButton)
  return app
}

export default KButton