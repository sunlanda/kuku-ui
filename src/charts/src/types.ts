import { EChartsOption } from 'echarts'

// 图表类型定义
export type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'radar' | 'heatmap' | 'tree' | 'treemap' | 'sunburst' | 'boxplot' | 'candlestick' | 'gauge' | 'funnel' | 'sankey' | 'graph' | 'themeRiver' | 'custom'

// 图表组件属性定义
export interface ChartsProps {
  // 图表类型
  type: ChartType
  // 图表配置项
  option: EChartsOption
  // 图表宽度
  width?: string | number
  // 图表高度
  height?: string | number
  // 是否自动调整大小
  autoResize?: boolean
  // 主题
  theme?: string | object
  // 初始化附加参数
  initOptions?: object
  // 是否开启动画
  animation?: boolean
  // 动画时长
  animationDuration?: number
  // 动画缓动效果
  animationEasing?: string
  // 加载状态
  loading?: boolean
  // 加载文本
  loadingText?: string
  // 是否启用鼠标事件
  enableMouseEvent?: boolean
}