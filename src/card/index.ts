import type { App } from 'vue'
import KCard from './src/card.vue'

// 定义 install 方法
KCard.install = (app: App) => {
  app.component(KCard.name, KCard)
  return app
}

export default KCard