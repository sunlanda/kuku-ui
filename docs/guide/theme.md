# 主题定制

Kuku UI 支持主题定制，你可以根据自己的需求修改组件的样式。

## 基础定制

由于 Kuku UI 是基于 ant-design-vue 开发的，你可以使用 ant-design-vue 提供的主题定制方案来修改基础组件的样式。

### 使用 CSS 变量

ant-design-vue 3.x 版本支持使用 CSS 变量来定制主题，你可以在项目的入口文件中添加以下代码：

```css
:root {
  --ant-primary-color: #1890ff;
  --ant-primary-color-hover: #40a9ff;
  --ant-success-color: #52c41a;
  --ant-warning-color: #faad14;
  --ant-error-color: #f5222d;
  --ant-font-size-base: 14px;
  --ant-heading-color: rgba(0, 0, 0, 0.85);
  --ant-text-color: rgba(0, 0, 0, 0.65);
  --ant-text-color-secondary: rgba(0, 0, 0, 0.45);
  --ant-disabled-color: rgba(0, 0, 0, 0.25);
  --ant-border-radius-base: 2px;
  --ant-border-color-base: #d9d9d9;
  --ant-box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
```

### 使用 ConfigProvider

你也可以使用 ant-design-vue 提供的 ConfigProvider 组件来定制主题：

```vue
<template>
  <a-config-provider :theme="theme">
    <app />
  </a-config-provider>
</template>

<script setup>
import { defineComponent, reactive } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

const theme = reactive({
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
  },
})
</script>
```

## Kuku UI 组件定制

### 自定义样式

Kuku UI 的组件都提供了自定义 class 的支持，你可以通过传入 `customClass` 属性来添加自定义样式：

```vue
<template>
  <k-button custom-class="my-button">自定义按钮</k-button>
</template>

<style>
.my-button {
  /* 自定义样式 */
  font-weight: bold;
  border-radius: 8px;
}
</style>
```

### 覆盖默认样式

你也可以通过 CSS 选择器覆盖 Kuku UI 组件的默认样式：

```css
/* 覆盖 KButton 组件的默认样式 */
.k-button {
  font-weight: bold;
  border-radius: 8px;
}

/* 覆盖 KTable 组件的默认样式 */
.k-table-container .k-table-header {
  background-color: #f5f5f5;
  padding: 16px;
}
```

## 创建自定义主题

如果你需要在多个项目中使用相同的主题，可以创建一个主题文件：

```ts
// theme.ts
export default {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    fontSize: 14,
    borderRadius: 4,
  },
}
```

然后在项目中引入：

```vue
<template>
  <a-config-provider :theme="theme">
    <app />
  </a-config-provider>
</template>

<script setup>
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import theme from './theme'
</script>
```

## 暗黑模式

Kuku UI 支持暗黑模式，你可以通过 ConfigProvider 组件的 `theme` 属性来启用暗黑模式：

```vue
<template>
  <a-config-provider :theme="darkTheme">
    <app />
  </a-config-provider>
</template>

<script setup>
import { defineComponent, reactive } from 'vue'
import { ConfigProvider, theme } from 'ant-design-vue'

const { darkAlgorithm } = theme

const darkTheme = reactive({
  algorithm: darkAlgorithm,
})
</script>
```

你也可以添加一个切换按钮来切换明暗模式：

```vue
<template>
  <a-config-provider :theme="currentTheme">
    <div>
      <a-switch
        :checked="isDarkMode"
        @change="toggleTheme"
        checked-children="🌙"
        un-checked-children="☀️"
      />
      <app />
    </div>
  </a-config-provider>
</template>

<script setup>
import { defineComponent, reactive, ref, computed } from 'vue'
import { ConfigProvider, Switch, theme } from 'ant-design-vue'

const { defaultAlgorithm, darkAlgorithm } = theme

const isDarkMode = ref(false)

const currentTheme = computed(() => ({
  algorithm: isDarkMode.value ? darkAlgorithm : defaultAlgorithm,
}))

const toggleTheme = (checked) => {
  isDarkMode.value = checked
}
</script>
```