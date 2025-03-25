import type { App } from 'vue'
import KTable from './src/table.vue'

// 定义 install 方法
KTable.install = (app: App) => {
  app.component(KTable.name, KTable)
  return app
}

export default KTable