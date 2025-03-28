import type { SelectProps, SelectValue } from 'ant-design-vue/es/select'

// 扩展的Select组件属性
export interface KSelectProps extends Omit<SelectProps, 'options'> {
  // 选项数据
  options: any[]
  // 加载更多数据的函数，传入页码，返回Promise<选项数组>
  loadMore?: (page: number) => Promise<any[]>
  // 初始页码
  initialPage?: number
  // 自定义类名
  customClass?: string
}