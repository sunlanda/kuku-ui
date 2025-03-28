# Card 卡片

基于 ant-design-vue 的 Card 组件进行二次封装，提供更符合业务需求的卡片组件，支持全屏展示功能。

## 基础用法

基础的卡片用法。

<Demo title="基础用法">
  <template #preview>
    <k-card title="基础卡片">
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </k-card>
  </template>
  <template #code>

```vue
<template>
  <k-card title="基础卡片">
    <p>卡片内容</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </k-card>
</template>
```
  </template>
</Demo>

## 带额外操作的卡片

通过 `extra` 插槽可以添加额外的操作按钮，卡片右上角默认有全屏/缩小按钮。

<Demo title="带额外操作的卡片">
  <template #preview>
    <k-card title="带额外操作的卡片">
      <template #extra>
        <a-button type="link">更多</a-button>
      </template>
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </k-card>
  </template>
  <template #code>

```vue
<template>
  <k-card title="带额外操作的卡片">
    <template #extra>
      <a-button type="link">更多</a-button>
    </template>
    <p>卡片内容</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </k-card>
</template>
```

  </template>
</Demo>

## 全屏功能

点击卡片右上角的全屏按钮，可以将卡片全屏展示，再次点击可以退出全屏。

<Demo title="全屏功能">
  <template #preview>
    <div>
      <p>点击右上角的全屏按钮，体验全屏效果</p>
      <k-card title="全屏功能演示">
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </k-card>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div>
    <p>点击右上角的全屏按钮，体验全屏效果</p>
    <k-card title="全屏功能演示">
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </k-card>
  </div>
</template>
```

  </template>
</Demo>

## 不同尺寸的卡片

通过设置 `size` 属性可以使用不同尺寸的卡片。

<Demo title="不同尺寸的卡片">
  <template #preview>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <k-card title="默认尺寸" size="default">
        <p>卡片内容</p>
      </k-card>
      <k-card title="小尺寸" size="small">
        <p>卡片内容</p>
      </k-card>
    </div>
  </template>
  <template #code>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <k-card title="默认尺寸" size="default">
      <p>卡片内容</p>
    </k-card>
    <k-card title="小尺寸" size="small">
      <p>卡片内容</p>
    </k-card>
  </div>
</template>
```

  </template>
</Demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| hoverable | 鼠标移过时可浮起 | `boolean` | `false` |
| size | 卡片尺寸 | `'default' \| 'small'` | `'default'` |
| headStyle | 标题区域样式 | `object` | - |
| bodyStyle | 内容区域样式 | `object` | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| - | - | - |

### 插槽

| 插槽名称 | 说明 |
| --- | --- |
| title | 卡片标题 |
| extra | 卡片右上角的操作区域，在全屏按钮之后 |
| cover | 卡片封面 |
| default | 卡片内容 |