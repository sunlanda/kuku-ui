import type { App } from 'vue'

// 导入组件
import KButton from './button'
import KTable from './table'
import KCard from './card'

// 组件列表
const components = [
  KButton,
  KTable,
  KCard
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
  install
}

// 导出默认对象
export default {
  install
}