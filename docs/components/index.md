# 组件

Kuku UI 提供了一系列基于 ant-design-vue 封装的业务组件，帮助你快速构建企业级应用。

## 组件列表

### 基础组件

- [Button 按钮](/components/button) - 基于 ant-design-vue 的 Button 组件进行二次封装
- [Table 表格](/components/table) - 基于 ant-design-vue 的 Table 组件进行二次封装
- [Card 卡片](/components/card) - 基于 ant-design-vue 的 card 组件进行二次封装

## 使用方式

### 完整引入

```ts
import { createApp } from 'vue'
import KukuUI from 'kuku-ui'
import 'kuku-ui/es/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(KukuUI)
app.mount('#app')
```

### 按需引入

```ts
import { createApp } from 'vue'
import { KButton, KTable,KCard } from 'kuku-ui'
import 'kuku-ui/es/button/style.css'
import 'kuku-ui/es/table/style.css'
import 'kuku-ui/es/card/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('KButton', KButton)
app.component('KTable', KTable)
app.component('KCard', KCard)
app.mount('#app')
```

## 开发计划

我们计划在未来添加更多的业务组件，如：

- Form 表单
- Modal 对话框
- Drawer 抽屉
- Upload 上传
- Chart 图表
- ...