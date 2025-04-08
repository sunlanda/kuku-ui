/*
 * @Date: 2025-03-28 19:34:15
 * @LastEditTime: 2025-04-01 21:37:19
 * @FilePath: /kuku-ui/src/index.ts
 */
import type { App } from 'vue'

// 导入组件
import KButton from './button'
import KTable from './table'
import KCard from './card'
import KSelect from './select'
import KCharts from './charts'
import KForm from './form'

// 组件列表
const components = [
  KButton,
  KTable,
  KCard,
  KSelect,
  KCharts,
  KForm,
]

// 定义 install 方法
const install = (app: App) => {
  // 注册所有组件
  components.forEach(component => {
    app.component(component.name, component)
  })
  
  return app
}

// 导出组件库
export {
  KButton,
  KTable,
  KCard,
  KSelect,
  KCharts,
  KForm,
  install
}

// 导出默认对象
export default {
  install
}