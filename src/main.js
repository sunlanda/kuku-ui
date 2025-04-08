/*
 * @Date: 2025-03-28 19:34:15
 * @LastEditTime: 2025-04-08 14:44:36
 * @FilePath: /kuku-ui/src/main.js
 */
import Vue from 'vue'

// import { createApp } from 'vue'
import App from './App.vue'
import KukuUI from './index'


// 新的样式导入
import 'ant-design-vue/dist/antd.css'

Vue.use(KukuUI)
// const app = createApp(App)
var vm = new Vue({
render: (h) => h(App)
})

vm.$mount('#app')



// app.mount('#app')