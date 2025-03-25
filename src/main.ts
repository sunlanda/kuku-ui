import { createApp } from 'vue'
import App from './App.vue'
import KukuUI from './index'

// 引入样式
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

// 注册组件库
app.use(KukuUI)

app.mount('#app')