import { createApp } from 'vue'
import App from './App.vue'
import KukuUI from './index'


// 新的样式导入
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(KukuUI)
app.mount('#app')