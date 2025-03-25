import DefaultTheme from 'vitepress/theme'
import Demo from '../components/Demo.vue'
import { defineAsyncComponent } from 'vue'
import 'ant-design-vue/es/button/style/css'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册Demo组件
    app.component('Demo', Demo)
    
    // 注册Kuku UI组件，使用异步组件避免SSR问题
    app.component('KButton', defineAsyncComponent(() => 
      import('../../../src/button/src/button.vue')
    ))
    app.component('KTable', defineAsyncComponent(() => 
      import('../../../src/table/src/table.vue')
    ))
  }
}