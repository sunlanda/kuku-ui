# Form 表单

k-form 组件是基于 ant-design-vue 的表单组件进行二次封装，通过配置化的方式快速生成表单，简化表单开发流程。

## 基础用法

通过配置 `items` 数组来定义表单项，每个表单项包含 `name`、`label`、`type` 等属性。

```vue
<template>
  <k-form
    v-model="formData"
    :items="formItems"
    @finish="handleFinish"
  />
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({});

const formItems = [
  {
    name: 'username',
    label: '用户名',
    type: 'input',
    rules: [{ required: true, message: '请输入用户名' }],
    props: {
      placeholder: '请输入用户名',
      allowClear: true
    }
  },
  {
    name: 'gender',
    label: '性别',
    type: 'radio',
    defaultValue: 'male',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  },
  {
    name: 'role',
    label: '角色',
    type: 'select',
    props: {
      placeholder: '请选择角色',
      allowClear: true
    },
    options: [
      { label: '管理员', value: 'admin' },
      { label: '操作员', value: 'operator' },
      { label: '访客', value: 'guest' }
    ]
  }
];

const handleFinish = (values) => {
  console.log('表单提交:', values);
};
</script>
```

## 表单布局

通过 `formLayout` 属性配置表单的布局，包括每行显示的列数、标签宽度、标签对齐方式等。

```vue
<template>
  <k-form
    v-model="formData"
    :items="formItems"
    :form-layout="{ cols: 2, labelAlign: 'left', gutter: 24 }"
  />
</template>
```

## 表单项类型

### 输入框 (input)

```js
{
  name: 'username',
  label: '用户名',
  type: 'input',
  props: {
    placeholder: '请输入用户名',
    allowClear: true,
    maxLength: 20
  }
}
```

### 选择框 (select)

```js
{
  name: 'status',
  label: '状态',
  type: 'select',
  props: {
    placeholder: '请选择状态',
    allowClear: true
  },
  options: [
    { label: '启用', value: 'enabled' },
    { label: '禁用', value: 'disabled' }
  ]
}
```

### 单选框组 (radio)

```js
{
  name: 'gender',
  label: '性别',
  type: 'radio',
  defaultValue: 'male',
  options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ]
}
```

### 日期选择器 (date-picker)

```js
{
  name: 'birthday',
  label: '出生日期',
  type: 'date-picker',
  props: {
    placeholder: '请选择日期',
    format: 'YYYY-MM-DD'
  }
}
```

### 自定义表单项 (custom)

通过 `slotName` 属性指定插槽名称，实现自定义表单项。

```vue
<template>
  <k-form
    v-model="formData"
    :items="formItems"
  >
    <template #custom-upload="{ formData, item }">
      <a-upload
        v-model:file-list="formData[item.name]"
        :action="uploadAction"
        list-type="picture-card"
      >
        <div>
          <plus-outlined />
          <div style="margin-top: 8px">上传</div>
        </div>
      </a-upload>
    </template>
  </k-form>
</template>

<script setup>
const formItems = [
  {
    name: 'avatar',
    label: '头像',
    type: 'custom',
    slotName: 'custom-upload',
    defaultValue: []
  }
];
</script>
```

## API

### KForm Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 表单项配置数组 | KFormItem[] | [] |
| modelValue (v-model) | 表单数据对象 | object | {} |
| layout | 表单布局方式 | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' |
| labelCol | 标签列布局 | object | { span: 6 } |
| wrapperCol | 包装列布局 | object | { span: 18 } |
| name | 表单名称 | string | 'k-form' |
| validateTrigger | 验证触发方式 | string \| string[] | 'change' |
| scrollToFirstError | 是否滚动到第一个错误 | boolean | true |
| formLayout | 表单布局配置 | object | { cols: 3, labelAlign: 'right', gutter: 16 } |
| showButtons | 是否显示提交和重置按钮 | boolean | true |
| submitText | 提交按钮文本 | string | '提交' |
| resetText | 重置按钮文本 | string | '重置' |

### KFormItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 表单项字段名 | string | - |
| label | 表单项标签 | string | - |
| type | 表单项类型 | 'input' \| 'select' \| 'radio' \| 'date-picker' \| 'custom' | - |
| span | 表单项占据的列数 | number | 1 |
| visible | 是否显示 | boolean | true |
| rules | 表单项验证规则 | Rule[] | - |
| defaultValue | 表单项默认值 | any | - |
| props | 表单项属性 | object | - |
| options | 选项数据（用于select、radio等） | { label: string, value: string \| number, disabled?: boolean }[] | - |
| slotName | 自定义渲染函数的名称（用于custom类型） | string | - |

### KForm Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 表单数据变化时触发 | (formData: object) => void |
| finish | 表单提交且验证通过时触发 | (values: object) => void |
| finishFailed | 表单提交且验证失败时触发 | ({ values, errorFields, outOfDate }) => void |
| validate | 表单验证时触发 | (name, status, errorMsgs) => void |
| reset | 表单重置时触发 | () => void |