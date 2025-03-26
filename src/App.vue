<template>
  <a-config-provider :theme="currentTheme">
    <div class="app-container">
      <div class="theme-switch">
        <a-switch
          :checked="isDarkMode"
          @change="toggleTheme"
          checked-children="🌙"
          un-checked-children="☀️"
        />
      </div>
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
      
      <section class="component-section">
        <h2>Card 卡片</h2>
        <div class="card-demo">
          <k-card title="标准卡片">
            <p>卡片内容</p>
            <p>这是一个可以全屏的卡片组件</p>
            <p>点击右上角的按钮可以切换全屏/缩小状态</p>
          </k-card>
        </div>
      </section>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ConfigProvider, Switch as ASwitch } from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import { ref, reactive, computed } from 'vue'
import KButton from './button'
import KTable from './table'
import KCard from './card'

const { defaultAlgorithm, darkAlgorithm } = theme

const isDarkMode = ref(false)

const columns = [
  {
    title: '姓名',
    label: '姓名', // th表头
    dataIndex: 'name',
    name: 'name',
    type: 'link',
    key: 'name',
  },
  {
    title: '年龄',
    label: '年龄', // th表头
    dataIndex: 'age',
    name: 'age',
    type: 'link',
    key: 'age',
  },
  {
    title: '地址',
    label: '地址', // th表头
    dataIndex: 'address',
    name: 'address',
    key: 'address',
  },
  {
    title: '操作',
    label: '操作', // th表头
    name: 'action',
    type: 'link',
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

// 基础主题配置
const baseToken = {
  colorPrimary: '#1890ff',
  borderRadius: 4,
}

// 计算当前主题
const currentTheme = computed(() => ({
  algorithm: isDarkMode.value ? darkAlgorithm : defaultAlgorithm,
  token: baseToken,
}))

// 切换主题
const toggleTheme = (checked: boolean) => {
  isDarkMode.value = checked
}
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.theme-switch {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.component-section {
  margin-bottom: 40px;
}

.component-demo {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.card-demo {
  margin-bottom: 16px;
}
</style>