<template>
  <a-select
    ref="selectRef"
    v-model:value="innerValue"
    :options="mergedOptions"
    :loading="loading"
    :placeholder="placeholder"
    :mode="mode"
    :show-search="showSearch"
    :allow-clear="allowClear"
    :disabled="disabled"
    :size="size"
    :class="customClass"
    @change="handleChange"
    @dropdown-visible-change="handleDropdownVisibleChange"
  >
    <template #notFoundContent>
      <div v-if="loading" class="k-select-loading">
        <a-spin size="small" />
        <span class="loading-text">加载中...</span>
      </div>
      <div v-else-if="noMoreData" class="k-select-no-more">
        <span>暂无其他数据</span>
      </div>
      <div v-else class="k-select-empty">
        <span>暂无数据</span>
      </div>
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick, onMounted, PropType } from 'vue'
import { Select as ASelect, Spin } from 'ant-design-vue'
import type { SelectProps, SelectValue } from 'ant-design-vue/es/select'

export default defineComponent({
  name: 'KSelect',
  components: {
    ASelect,
    ASpin: Spin
  },
  props: {
    value: {
      type: [String, Number, Array] as PropType<SelectValue>,
      default: undefined
    },
    options: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    mode: {
      type: String as PropType<'multiple' | 'tags' | undefined>,
      default: undefined
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'large' | 'middle' | 'small'>,
      default: 'middle'
    },
    customClass: {
      type: String,
      default: ''
    },
    // 加载更多数据的函数
    loadMore: {
      type: Function as PropType<(page: number) => Promise<any[]>>,
      default: null
    },
    // 初始页码
    initialPage: {
      type: Number,
      default: 1
    }
  },
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const selectRef = ref(null)
    const innerValue = ref(props.value)
    const loading = ref(false)
    const noMoreData = ref(false)
    const currentPage = ref(props.initialPage)
    const mergedOptions = ref([...props.options])
    
    // 监听value变化
    watch(
      () => props.value,
      (newVal) => {
        innerValue.value = newVal
      }
    )
    
    // 监听options变化
    watch(
      () => props.options,
      (newVal) => {
        mergedOptions.value = [...newVal]
        // 重置状态
        currentPage.value = props.initialPage
        noMoreData.value = false
      }
    )
    
    // 处理值变化
    const handleChange = (value: SelectValue) => {
      innerValue.value = value
      emit('update:value', value)
      emit('change', value)
    }
    
    // 处理下拉框显示/隐藏
    const handleDropdownVisibleChange = async (open: boolean) => {
      console.log("🚀 ~ handleDropdownVisibleChange ~ open:", open)
      if (open) {
        await nextTick()
        // 添加滚动监听
        addScrollListener()
      } else {
        // 移除滚动监听
        removeScrollListener()
      }
    }
    
    // 添加滚动监听
    const addScrollListener = () => {
      // 在ant-design-vue中，真正可滚动的元素是下拉框内的列表容器
      // 需要获取正确的可滚动元素
      setTimeout(() => {
        // 使用更精确的选择器，获取下拉框内的可滚动容器
        const dropdown = document.querySelector('.ant-select-dropdown .rc-virtual-list-holder')
        // console.log("🚀 ~ addScrollListener ~ dropdown:", dropdown)
        
        if (dropdown) {
          dropdown.addEventListener('scroll', handleScroll)
        } else {
          // 尝试获取备用的滚动容器
          const alternativeDropdown = document.querySelector('.ant-select-dropdown .rc-virtual-list') ||
                                     document.querySelector('.ant-select-dropdown .ant-select-item-list') ||
                                     document.querySelector('.ant-select-dropdown')
          // console.log("🚀 ~ addScrollListener ~ alternativeDropdown:", alternativeDropdown)
          
          if (alternativeDropdown) {
            alternativeDropdown.addEventListener('scroll', handleScroll)
          }
        }
      }, 100) // 添加短暂延时确保下拉框已完全渲染
    }
    
    // 移除滚动监听
    const removeScrollListener = () => {
      // 移除所有可能的滚动容器上的事件监听
      const possibleDropdowns = [
        document.querySelector('.ant-select-dropdown .rc-virtual-list-holder'),
        document.querySelector('.ant-select-dropdown .rc-virtual-list'),
        document.querySelector('.ant-select-dropdown .ant-select-item-list'),
        document.querySelector('.ant-select-dropdown')
      ]
      
      possibleDropdowns.forEach(dropdown => {
        if (dropdown) {
          dropdown.removeEventListener('scroll', handleScroll)
        }
      })
    }
    
    // 处理滚动事件
    const handleScroll = async (e: Event) => {
      const target = e.target as HTMLElement
      // 判断是否滚动到底部
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
        // 如果已经没有更多数据或者正在加载，则不处理
        if (noMoreData.value || loading.value || !props.loadMore) return
        
        try {
          loading.value = true
          // 加载下一页数据
          const nextPage = currentPage.value + 1
          const newData = await props.loadMore(nextPage)
          
          // 如果返回的数据为空数组，则标记为没有更多数据
          if (!newData || newData.length === 0) {
            noMoreData.value = true
          } else {
            // 更新页码和选项数据
            currentPage.value = nextPage
            mergedOptions.value = [...mergedOptions.value, ...newData]
          }
        } catch (error) {
          console.error('加载更多数据失败:', error)
        } finally {
          loading.value = false
        }
      }
    }
    
    // 组件卸载时移除监听器
    onMounted(() => {
      // 初始化时如果没有选项且有loadMore函数，则自动加载第一页
      if (props.options.length === 0 && props.loadMore) {
        handleScroll({ target: { scrollTop: 0, clientHeight: 1, scrollHeight: 0 } } as unknown as Event)
      }
    })
    
    return {
      selectRef,
      innerValue,
      loading,
      noMoreData,
      mergedOptions,
      handleChange,
      handleDropdownVisibleChange
    }
  }
})
</script>

<style scoped>
.k-select-loading,
.k-select-no-more,
.k-select-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  color: rgba(0, 0, 0, 0.45);
}

.k-select-loading .loading-text {
  margin-left: 8px;
}
</style>