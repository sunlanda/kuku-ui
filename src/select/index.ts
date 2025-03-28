import type { App } from 'vue'
import KSelect from './src/select.vue'

// 定义 install 方法
KSelect.install = (app: App) => {
  app.component(KSelect.name, KSelect)
  return app
}

export default KSelect