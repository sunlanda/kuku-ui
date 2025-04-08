import type { App } from 'vue'
import KForm from './src/form.vue'

// 定义 install 方法
KForm.install = (app: App) => {
  app.component(KForm.name, KForm)
  return app
}

export default KForm