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
      
      <section class="component-section dn">
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
      
      <section class="component-section">
        <h2>Select 选择器</h2>
        <div class="component-demo">
          <k-select 
            v-model:value="selectedValue" 
            :options="selectOptions" 
            placeholder="请选择一个选项"
            style="width: 200px"
          />
          <k-select 
            v-model:value="selectedMultipleValue" 
            :options="selectOptions" 
            mode="multiple"
            placeholder="请选择多个选项"
            style="width: 300px"
          />
          <k-select 
            v-model:value="selectedLoadMoreValue" 
            :options="initialOptions" 
            :load-more="loadMoreOptions"
            placeholder="滚动加载更多"
            style="width: 200px"
          />
        </div>
      </section>

      <section class="component-section">
        <h2>Charts 图表</h2>
        <div class="component-demo">
          <k-charts
            type="line"
            :option="chartOption"
            :width="600"
            :height="400"
            :loading="isLoading"
            @chartClick="handleChartClick"
            >
          </k-charts>
          <k-charts
            type="line"
            :option="pieChartOption"
            :width="600"
            :height="400"
            :loading="isLoading"
            @chartClick="handleChartClick"
            >
          </k-charts>
        </div>
      </section>

   

    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ConfigProvider, Switch as ASwitch } from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import { ref, reactive, computed } from 'vue'
import {PIE,LINE} from "../config/mock"

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

// Select组件相关数据
const selectedValue = ref<string | undefined>(undefined)
const selectedMultipleValue = ref<string[]>([])
const selectedLoadMoreValue = ref<string | undefined>(undefined)

const selectOptions = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' },
]

const _page = 1
const initialOptions = Array.from({ length: 12 }, (_, i) => ({
    value: `page${_page}-${i + 1}`,
    label: `第${_page}页-选项${i + 1}`
  }))
// [
//   { value: 'page1-1', label: '第1页-选项1' },
//   { value: 'page1-2', label: '第1页-选项2' },
//   { value: 'page1-3', label: '第1页-选项3' },
// ]

// 模拟加载更多数据的函数
const loadMoreOptions = async (page: number) => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟数据，第4页后返回空数组表示没有更多数据
  if (page > 3) {
    return []
  }
  
  // 返回模拟的下一页数据
  return Array.from({ length: 3 }, (_, i) => ({
    value: `page${page}-${i + 1}`,
    label: `第${page}页-选项${i + 1}`
  }))
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
// loading
const isLoading = true
// line option
const chartOption = LINE
// pie option
const pieChartOption = PIE
const handleChartClick = (e)=>{
  console.log("🚀 ~ e:", e)
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
.dn{
  display: none;
}
</style>