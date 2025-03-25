# Table 表格

基于 ant-design-vue 的 Table 组件进行二次封装，提供更符合业务需求的表格组件。

## 基础用法

基础的表格用法。

<Demo title="基础用法">
  <template #preview>
    <k-table :columns="columns" :data-source="dataSource" />
  </template>
  <template #code>

```vue
<template>
  <k-table :columns="columns" :data-source="dataSource" />
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
]

const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
  },
]
</script>
```

  </template>
</Demo>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述 | `array` | `[]` |
| dataSource | 数据数组 | `array` | `[]` |
| loading | 页面是否加载中 | `boolean` | `false` |
| pagination | 分页器，参考 ant-design-vue 的 Pagination 文档 | `object` | `{}` |
| rowKey | 表格行 key 的取值 | `string` \| `function(record): string` | `key` |

基于 ant-design-vue 的 Table 组件进行二次封装，提供更符合业务需求的表格组件。

## 基础用法

基础的表格用法。

```vue
<template>
  <k-table :columns="columns" :data-source="dataSource" />
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
]

const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
  },
]
</script>
```

## 带标题和操作栏

通过设置 `title` 属性或使用 `header` 插槽来添加表格标题，使用 `actions` 插槽来添加操作按钮。

```vue
<template>
  <k-table 
    :columns="columns" 
    :data-source="dataSource" 
    title="用户列表"
    show-header
  >
    <template #actions>
      <k-button type="primary">新增</k-button>
      <k-button>导出</k-button>
    </template>
  </k-table>
</template>
```

## 自定义列渲染

通过插槽自定义列的渲染内容。

```vue
<template>
  <k-table :columns="columns" :data-source="dataSource">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a @click="edit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="remove(record)">删除</a>
      </template>
    </template>
  </k-table>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const columns = [
  // ... 其他列
  {
    title: '操作',
    key: 'action',
  },
]

const edit = (record) => {
  message.info(`编辑: ${record.name}`)
}

const remove = (record) => {
  message.info(`删除: ${record.name}`)
}
</script>
```

## 分页设置

通过 `pagination` 属性设置分页器。

```vue
<template>
  <k-table 
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="{
      current: current,
      pageSize: pageSize,
      total: total,
      showTotal: (total) => `共 ${total} 条记录`
    }"
    @pageChange="onPageChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)
const total = ref(100)

const onPageChange = ({ page, pageSize }) => {
  current.value = page
  // 这里可以请求新的数据
  console.log('页码变化:', page, pageSize)
}
</script>
```

## 加载状态

通过 `loading` 属性控制表格的加载状态。

```vue
<template>
  <div>
    <k-button @click="toggleLoading" style="margin-bottom: 16px">
      {{ loading ? '关闭加载' : '开启加载' }}
    </k-button>
    <k-table :columns="columns" :data-source="dataSource" :loading="loading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述 | `TableColumnType[]` | `[]` |
| dataSource | 数据数组 | `any[]` | `[]` |
| loading | 页面是否加载中 | `boolean` | `false` |
| pagination | 分页器，参考 ant-design-vue 的 pagination 文档，设为 false 时不展示分页 | `object \| false` | `{}` |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | `string \| function(record): string` | `'id'` |
| rowSelection | 表格行是否可选择，参考 ant-design-vue 的 rowSelection 文档 | `object` | - |
| scroll | 表格是否可滚动，也可以指定滚动区域的宽、高 | `object` | - |
| bordered | 是否展示外边框和列边框 | `boolean` | `false` |
| size | 表格大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| title | 表格标题 | `string` | `''` |
| showHeader | 是否显示表格头部区域 | `boolean` | `false` |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 分页、排序、筛选变化时触发 | `(pagination, filters, sorter) => void` |
| pageChange | 页码改变时触发 | `({ page, pageSize }) => void` |
| sizeChange | 每页条数改变时触发 | `({ current, size }) => void` |

### 插槽

| 插槽名称 | 说明 |
| --- | --- |
| header | 表格头部区域 |
| actions | 表格头部操作区域 |
| headerCell | 自定义表头单元格 |
| bodyCell | 自定义表格单元格 |