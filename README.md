# Kuku UI

基于 ant-design-vue 的业务组件库

## 特性

- 🚀 基于 Vue 3、TypeScript 和 ant-design-vue 3.x
- 📦 开箱即用的高质量业务组件
- 🔨 支持按需引入和全量引入
- 📖 详细的文档和示例
- 🔧 支持 TypeScript，提供完整的类型定义
- 🌐 支持 ESM 和 CommonJS 模块格式

## 安装

```bash
npm install kuku-ui --save
# 或者
yarn add kuku-ui
# 或者
pnpm add kuku-ui
```

## 快速上手

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
import { KButton, KTable } from 'kuku-ui'
import 'kuku-ui/es/button/style.css'
import 'kuku-ui/es/table/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('KButton', KButton)
app.component('KTable', KTable)
app.mount('#app')
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发环境
npm run dev

# 构建组件库
npm run build:lib

# 启动文档开发服务
npm run docs:dev

# 构建文档
npm run docs:build
```

## 目录结构

```
├── docs                   # 文档目录
├── src                    # 组件源码
│   ├── button             # 按钮组件
│   ├── table              # 表格组件
│   └── ...                # 其他组件
├── vite.config.ts         # Vite 开发环境配置
├── vite.lib.config.ts     # 组件库打包配置
└── package.json           # 项目配置
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 `git checkout -b feature/your-feature`
3. 提交你的更改 `git commit -m 'Add some feature'`
4. 推送到分支 `git push origin feature/your-feature`
5. 提交 Pull Request

## 兼容性

- **浏览器支持**：Chrome 60+、Firefox 60+、Safari 12+、Edge 79+
- **Node.js 版本**：12.0.0 及以上
- **Vue 版本**：Vue 3.2.0 及以上
- **模块格式**：支持 ESM 和 CommonJS

## 许可证

[MIT](./LICENSE)
