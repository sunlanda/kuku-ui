/*
 * @Date: 2025-03-25 13:25:12
 * @LastEditTime: 2025-03-28 16:03:21
 * @FilePath: /kuku-ui/docs/.vitepress/theme/index.ts
 */
import DefaultTheme from 'vitepress/theme'
import Demo from '../components/Demo.vue'
import { defineAsyncComponent } from 'vue'
// import 'ant-design-vue/es/button/style/css'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册Demo组件
    app.component('Demo', Demo)
    
    // 注册Kuku UI组件，使用异步组件避免SSR问题
    app.component('KButton', defineAsyncComponent(() => 
      import('@/button')
    ))
    app.component('KTable', defineAsyncComponent(() => 
      import('@/table')
    ))
    app.component('KCard', defineAsyncComponent(() => 
      import('@/card')
    ))
    app.component('KSelect', defineAsyncComponent(() => 
      import('@/Select')
    ))
  }
}