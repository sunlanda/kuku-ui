import type { TableColumnType } from 'ant-design-vue'

// 扩展的列类型定义
export interface KTableColumnType extends Omit<TableColumnType, 'dataIndex'> {
  // 列字段名
  name: string
  // 列标题
  label: string
  // 列类型：text(文本)、link(链接)、status(状态)、time(时间)、money(金额)等
  type: 'text' | 'link' | 'status' | 'time' | 'money' | 'custom'
  // 列分组
  group?: string
  // 是否显示
  checked?: boolean
  // 列样式
  style?: {
    width?: string
    align?: 'left' | 'center' | 'right'
    [key: string]: any
  }
  // 列属性，用于不同类型列的特殊配置
  props?: {
    // 状态类型的映射
    map?: Record<string | number, string>
    // 链接类型的点击事件
    onClick?: (record: any) => void
    // 其他属性
    [key: string]: any
  }
  // 自定义渲染函数
  customRender?: (text: any, record: any, index: number) => any
}

// 表格配置接口
export interface KTableConfig {
  // 表格列配置
  columns: KTableColumnType[]
  // 是否启用列设置
  enableColumnsSetting?: boolean
  // 本地存储的键名
  storageKey?: string
}