<template>
  <div
    ref="chartRef"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    }"
    class="k-chart-container"
  >
    <div v-if="loading" class="k-chart-loading">
      <a-spin />
      <span class="loading-text">{{ loadingText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    watch,
    PropType,
    nextTick,
  } from "vue";
  import { Spin as ASpin } from 'ant-design-vue'
  import * as echarts from "echarts";
  import type { EChartsType } from "echarts";
  import { ChartType } from "./types";

  export default defineComponent({
    name: "KCharts",
    components: {
      ASpin
    },
    props: {
      type: {
        type: String as PropType<ChartType>,
        required: true,
      },
      option: {
        type: Object as PropType<echarts.EChartsOption>,
        required: true,
      },
      width: {
        type: [String, Number] as PropType<string | number>,
        default: "100%",
      },
      height: {
        type: [String, Number] as PropType<string | number>,
        default: "300px",
      },
      autoResize: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: [String, Object] as PropType<string | object>,
        default: undefined,
      },
      initOptions: {
        type: Object as PropType<object>,
        default: () => ({}),
      },
      animation: {
        type: Boolean,
        default: true,
      },
      animationDuration: {
        type: Number,
        default: 300,
      },
      animationEasing: {
        type: String,
        default: "linear",
      },
      loading: {
        type: Boolean,
        default: false,
      },
      loadingText: {
        type: String,
        default: "加载中...",
      },
      enableMouseEvent: {
        type: Boolean,
        default: true,
      },
    },
    emits: [
      "chartReady",
      "chartClick",
      "chartDblClick",
      "chartMouseOver",
      "chartMouseOut",
    ],
    setup(props, { emit }) {
      const chartRef = ref<HTMLElement | null>(null);
      let chartInstance: EChartsType | null = null;

      // 初始化图表
      const initChart = () => {
        if (!chartRef.value) return;

        // 销毁已存在的实例
        if (chartInstance) {
          chartInstance.dispose();
        }

        // 创建新实例
        chartInstance = echarts.init(
          chartRef.value,
          props.theme,
          props.initOptions
        );

        // 设置动画配置
        if (!props.animation) {
          chartInstance.setOption({
            animation: props.animation,
            animationDuration: props.animationDuration,
            animationEasing: props.animationEasing,
          });
        }

        // 应用图表配置
        updateChart();

        // 绑定事件
        if (props.enableMouseEvent) {
          bindEvents();
        }

        // 通知图表已准备好
        emit("chartReady", chartInstance);
      };

      // 更新图表配置
      const updateChart = () => {
        if (!chartInstance) return;

        // 应用图表配置
        chartInstance.setOption(props.option, true);
      };

      // 绑定事件
      const bindEvents = () => {
        if (!chartInstance) return;

        // 点击事件
        chartInstance.on("click", (params) => {
          emit("chartClick", params);
        });

        // 双击事件
        chartInstance.on("dblclick", (params) => {
          emit("chartDblClick", params);
        });

        // 鼠标悬停事件
        chartInstance.on("mouseover", (params) => {
          emit("chartMouseOver", params);
        });

        // 鼠标离开事件
        chartInstance.on("mouseout", (params) => {
          emit("chartMouseOut", params);
        });
      };

      // 解绑事件
      const unbindEvents = () => {
        if (!chartInstance) return;

        chartInstance.off("click");
        chartInstance.off("dblclick");
        chartInstance.off("mouseover");
        chartInstance.off("mouseout");
      };

      // 调整图表大小
      const resizeChart = () => {
        if (chartInstance) {
          chartInstance.resize();
        }
      };

      // 监听配置变化
      watch(
        () => props.option,
        () => {
          nextTick(() => {
            updateChart();
          });
        },
        { deep: true }
      );

      // 监听图表类型变化
      watch(
        () => props.type,
        () => {
          nextTick(() => {
            initChart();
          });
        }
      );

      // 监听主题变化
      watch(
        () => props.theme,
        () => {
          nextTick(() => {
            initChart();
          });
        }
      );

      // 监听容器尺寸变化
      watch([() => props.width, () => props.height], () => {
        nextTick(() => {
          resizeChart();
        });
      });

      // 组件挂载时初始化图表
      onMounted(() => {
        nextTick(() => {
          initChart();

          // 添加窗口大小变化监听
          if (props.autoResize) {
            window.addEventListener("resize", resizeChart);
          }
        });
      });

      // 组件卸载前清理资源
      onBeforeUnmount(() => {
        if (chartInstance) {
          unbindEvents();
          chartInstance.dispose();
          chartInstance = null;
        }

        // 移除窗口大小变化监听
        if (props.autoResize) {
          window.removeEventListener("resize", resizeChart);
        }
      });

      return {
        chartRef,
      };
    },
  });
</script>

<style scoped>
  .k-chart-container {
    position: relative;
    box-sizing: border-box;
  }

  .k-chart-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }

  .k-chart-loading .loading-text {
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.45);
  }
</style>
