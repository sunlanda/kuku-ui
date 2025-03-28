# Select 选择器

基于 ant-design-vue 的 Select 组件封装，扩展了滚动加载更多数据的功能，适用于大数据量的选择场景，提供了更好的用户体验。

## 基础用法

基础的选择器用法。

<Demo title="基础用法">
  <template #preview>
    <k-select v-model:value="value1" :options="options1" placeholder="请选择" style="width: 200px" />
  </template>
  <template #code>

```vue
<template>
  <k-select v-model:value="value" :options="options" placeholder="请选择" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(undefined)
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
```
</template>

</Demo>

<script setup>
import { ref } from 'vue'

const value1 = ref(undefined)
const options1 = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

## 多选模式

支持多选的选择器模式。

<Demo title="多选模式">
  <template #preview>
    <k-select 
      v-model:value="value2" 
      :options="options1" 
      mode="multiple" 
      placeholder="请选择多个选项" 
      style="width: 300px"
    />
  </template>
  <template #code>

```vue
<template>
  <k-select 
    v-model:value="value" 
    :options="options" 
    mode="multiple" 
    placeholder="请选择多个选项" 
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
```
</template>
</Demo>

const value2 = ref([])

## 可搜索模式

通过设置 `showSearch` 属性为 `true`，可以启用搜索功能，方便用户在大量选项中快速找到所需选项。

<Demo title="可搜索模式">
  <template #preview>
    <k-select 
      v-model:value="value3" 
      :options="options3" 
      show-search
      placeholder="请输入搜索" 
      style="width: 200px"
    />
  </template>
  <template #code>

```vue
<template>
  <k-select 
    v-model:value="value" 
    :options="options" 
    show-search
    placeholder="请输入搜索" 
    style="width: 200px"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(undefined)
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' },
]
</script>
```
  </template>
</Demo>


const value3 = ref(undefined)
const options3 = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' },
]

## 可清除选择

通过设置 `allow-clear` 属性为 `true`，可以启用清除功能，方便用户快速清除已选内容。

<Demo title="可清除选择">
  <template #preview>
    <k-select 
      v-model:value="value4" 
      :options="options1" 
      allow-clear
      placeholder="可清除选择" 
      style="width: 200px"
    />
  </template>
  <template #code>

```vue
<template>
  <k-select 
    v-model:value="value" 
    :options="options" 
    allow-clear
    placeholder="可清除选择" 
    style="width: 200px"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('option1')
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
```

  </template>
</Demo>

const value4 = ref('option1')

## 不同尺寸

通过设置 `size` 属性可以使用不同尺寸的选择器，有 `large`、`middle`、`small` 三种尺寸可选。

<Demo title="不同尺寸">
  <template #preview>
    <div style="display: flex; gap: 16px; align-items: flex-end;">
      <k-select 
        v-model:value="value5" 
        :options="options1" 
        size="large"
        placeholder="大尺寸" 
        style="width: 200px"
      />
      <k-select 
        v-model:value="value5" 
        :options="options1" 
        placeholder="默认尺寸" 
        style="width: 200px"
      />
      <k-select 
        v-model:value="value5" 
        :options="options1" 
        size="small"
        placeholder="小尺寸" 
        style="width: 200px"
      />
    </div>
  </template>
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: flex-end;">
    <k-select 
      v-model:value="value" 
      :options="options" 
      size="large"
      placeholder="大尺寸" 
      style="width: 200px"
    />
    <k-select 
      v-model:value="value" 
      :options="options" 
      placeholder="默认尺寸" 
      style="width: 200px"
    />
    <k-select 
      v-model:value="value" 
      :options="options" 
      size="small"
      placeholder="小尺寸" 
      style="width: 200px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(undefined)
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
```

  </template>
</Demo>

const value5 = ref(undefined)

## 滚动加载更多

当下拉列表滚动到底部时，会自动调用 `loadMore` 函数加载下一页数据。这个功能特别适合处理大量数据的场景，避免一次性加载所有数据导致性能问题。

<Demo title="滚动加载更多">
  <template #preview>
    <k-select 
      v-model:value="value6" 
      :options="options6" 
      :load-more="loadMoreData"
      placeholder="滚动加载更多" 
      style="width: 250px"
    />
  </template>
  <template #code>

```vue
<template>
  <k-select 
    v-model:value="value" 
    :options="options" 
    :load-more="loadMoreData"
    placeholder="滚动加载更多" 
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(undefined)
const options = ref([
  { value: 'initial1', label: '初始选项1' },
  { value: 'initial2', label: '初始选项2' },
])

// 加载更多数据的函数
const loadMoreData = async (page) => {
  // 模拟接口请求
  const res = await fetchMoreOptions(page)
  if (res.length === 0) {
    // 返回空数组表示没有更多数据
    return []
  }
  return res
}

// 模拟接口请求函数
const fetchMoreOptions = async (page) => {
  // 这里替换为实际的接口请求
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟第3页后没有更多数据
  if (page > 3) return []
  
  return Array.from({ length: 5 }, (_, i) => ({
    value: `page${page}-${i}`,
    label: `第${page}页-选项${i}`,
  }))
}
</script>
```

  </template>
</Demo>

const value6 = ref(undefined)
const options6 = ref([
  { value: 'initial1', label: '初始选项1' },
  { value: 'initial2', label: '初始选项2' },
])

// 加载更多数据的函数
const loadMoreData = async (page) => {
  // 模拟接口请求
  const res = await fetchMoreOptions(page)
  if (res.length === 0) {
    // 返回空数组表示没有更多数据
    return []
  }
  return res
}

// 模拟接口请求函数
const fetchMoreOptions = async (page) => {
  // 这里替换为实际的接口请求
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟第3页后没有更多数据
  if (page > 3) return []
  
  return Array.from({ length: 5 }, (_, i) => ({
    value: `page${page}-${i}`,
    label: `第${page}页-选项${i}`,
  }))
}

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value(v-model) | 当前选中的值 | `string \| number \| string[] \| number[]` | - |
| options | 选项数据 | `array` | `[]` |
| placeholder | 选择框默认文本 | `string` | `请选择` |
| mode | 设置 Select 的模式 | `'multiple' \| 'tags'` | - |
| showSearch | 是否支持搜索 | `boolean` | `false` |
| allowClear | 是否支持清除 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 选择框大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| customClass | 自定义类名 | `string` | - |
| loadMore | 加载更多数据的函数，传入页码，返回Promise。当返回空数组时表示没有更多数据 | `(page: number) => Promise<any[]>` | - |
| initialPage | 初始页码 | `number` | `1` |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中 option 变化时触发 | 选中的选项值 |
| update:value | 组件值更新时触发 | 更新后的值 |
| dropdown-visible-change | 下拉框展示状态变化时触发 | 是否展示 |

### 插槽

| 插槽名称 | 说明 |
| --- | --- |
| notFoundContent | 当下拉列表为空时显示的内容，默认会根据加载状态显示不同内容 |

此外，组件还支持 ant-design-vue Select 组件的所有其他插槽。