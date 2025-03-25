# 快速开始

本节将介绍如何在项目中使用 Kuku UI。

## 安装

### 使用包管理器

```bash
# 使用 npm
npm install kuku-ui --save

# 使用 yarn
yarn add kuku-ui

# 使用 pnpm
pnpm add kuku-ui
```

## 完整引入

如果你对打包后的文件大小不是很在意，那么使用完整导入会更方便。

```ts
import { createApp } from 'vue'
import KukuUI from 'kuku-ui'
import 'kuku-ui/es/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(KukuUI)
app.mount('#app')
```

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式。

### 手动引入

```ts
import { createApp } from 'vue'
import { KButton, KTable } from 'kuku-ui'
import 'kuku-ui/es/button/style.css'
import 'kuku-ui/es/table/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('KButton', KButton)
app.component('KTable', KTable)
app.mount('#app')
```

### 使用自动导入插件

我们推荐使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)