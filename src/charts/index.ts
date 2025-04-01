import type { App } from 'vue'
import KCharts from './src/charts.vue'

// 定义 install 方法
KCharts.install = (app: App) => {
  app.component(KCharts.name, KCharts)
  return app
}

export default KCharts