# Button 按钮

基于 ant-design-vue 的 Button 组件进行二次封装，提供更符合业务需求的按钮组件。

## 基础用法

基础的按钮用法。

<Demo title="基础用法">
  <template #preview>
    <div class="button-demo">
      <k-button>默认按钮</k-button>
      <k-button type="primary">主要按钮</k-button>
      <k-button type="dashed">虚线按钮</k-button>
      <k-button type="text">文本按钮</k-button>
      <k-button type="link">链接按钮</k-button>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div class="button-demo">
    <k-button>默认按钮</k-button>
    <k-button type="primary">主要按钮</k-button>
    <k-button type="dashed">虚线按钮</k-button>
    <k-button type="text">文本按钮</k-button>
    <k-button type="link">链接按钮</k-button>
  </div>
</template>

<style>
.button-demo {
  display: flex;
  gap: 8px;
}
</style>
```

  </template>
</Demo>

## 按钮尺寸

按钮有大、中、小三种尺寸。

<Demo title="按钮尺寸">
  <template #preview>
    <div class="button-demo">
      <k-button size="large">大型按钮</k-button>
      <k-button>默认按钮</k-button>
      <k-button size="small">小型按钮</k-button>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div class="button-demo">
    <k-button size="large">大型按钮</k-button>
    <k-button>默认按钮</k-button>
    <k-button size="small">小型按钮</k-button>
  </div>
</template>
```

  </template>
</Demo>

## 加载状态

添加 `loading` 属性即可让按钮处于加载状态。

<Demo title="加载状态">
  <template #preview>
    <div class="button-demo">
      <k-button type="primary" loading>加载中</k-button>
      <k-button type="primary" :loading="loading" @click="toggleLoading">点击切换</k-button>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div class="button-demo">
    <k-button type="primary" loading>加载中</k-button>
    <k-button type="primary" :loading="loading" @click="toggleLoading">点击切换</k-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const toggleLoading = () => {
  loading.value = !loading.value
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
```
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const toggleLoading = () => {
  loading.value = !loading.value
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

  </template>
</Demo>

## 禁用状态

添加 `disabled` 属性即可让按钮处于禁用状态。

<Demo title="禁用状态">
  <template #preview>
    <div class="button-demo">
      <k-button disabled>默认按钮</k-button>
      <k-button type="primary" disabled>主要按钮</k-button>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div class="button-demo">
    <k-button disabled>默认按钮</k-button>
    <k-button type="primary" disabled>主要按钮</k-button>
  </div>
</template>
```

  </template>
</Demo>

## 按钮形状

通过设置 `shape` 属性为 `circle` 或 `round` 来改变按钮形状。

<Demo title="按钮形状">
  <template #preview>
    <div class="button-demo">
      <k-button type="primary" shape="circle">A</k-button>
      <k-button type="primary" shape="round">圆角按钮</k-button>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div class="button-demo">
    <k-button type="primary" shape="circle">A</k-button>
    <k-button type="primary" shape="round">圆角按钮</k-button>
  </div>
</template>
```

  </template>
</Demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'primary' \| 'ghost' \| 'dashed' \| 'link' \| 'text' \| 'default'` | `'default'` |
| size | 按钮大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| loading | 是否加载中状态 | `boolean` | `false` |
| disabled | 是否禁用状态 | `boolean` | `false` |
| block | 将按钮宽度调整为其父宽度 | `boolean` | `false` |
| shape | 按钮形状 | `'circle' \| 'round'` | - |
| customClass | 自定义CSS类名 | `string` | `''` |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时的回调 | `(event: MouseEvent) => void` |