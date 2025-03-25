<template>
  <div class="app-container">
    <h1>Kuku UI 组件示例</h1>
    
    <section class="component-section">
      <h2>Button 按钮</h2>
      <div class="component-demo">
        <k-button>默认按钮</k-button>
        <k-button type="primary">主要按钮</k-button>
        <k-button type="dashed">虚线按钮</k-button>
        <k-button type="link">链接按钮</k-button>
        <k-button type="text">文本按钮</k-button>
      </div>
      
      <div class="component-demo">
        <k-button size="large">大型按钮</k-button>
        <k-button>默认按钮</k-button>
        <k-button size="small">小型按钮</k-button>
      </div>
      
      <div class="component-demo">
        <k-button type="primary" loading>加载中</k-button>
        <k-button disabled>禁用按钮</k-button>
      </div>
    </section>
    
    <section class="component-section">
      <h2>Table 表格</h2>
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from './button'
import KTable from './table'

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
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
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

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.component-section {
  margin-bottom: 40px;
}

.component-demo {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>