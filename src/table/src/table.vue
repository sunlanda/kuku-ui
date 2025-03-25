<template>
  <div class="k-table-container">
    <div class="k-table-header" v-if="$slots.header || showHeader">
      <slot name="header">
        <div class="k-table-title" v-if="title">{{ title }}</div>
        <div class="k-table-actions">
          <slot name="actions"></slot>
        </div>
      </slot>
    </div>
    
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="rowKey"
      :row-selection="rowSelection"
      :scroll="scroll"
      :bordered="bordered"
      :size="size"
      @change="handleTableChange"
    >
      <template #headerCell="{ column }">
        <slot name="headerCell" :column="column">
          {{ column.title }}
        </slot>
      </template>
      
      <template v-for="slot in Object.keys($slots)" #[slot]="data" :key="slot">
        <slot :name="slot" v-bind="data"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Table as ATable } from 'ant-design-vue'
import 'ant-design-vue/es/table/style/css'
import type { TableProps, TablePaginationConfig, TableColumnType } from 'ant-design-vue'

export default defineComponent({
  name: 'KTable',
  components: {
    ATable
  },
  props: {
    columns: {
      type: Array as PropType<TableColumnType[]>,
      required: true
    },
    dataSource: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: [Object, Boolean] as PropType<TablePaginationConfig | false>,
      default: () => ({
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `共 ${total} 条`
      })
    },
    rowKey: {
      type: [String, Function] as PropType<string | ((record: any) => string)>,
      default: 'id'
    },
    rowSelection: {
      type: Object as PropType<TableProps['rowSelection']>,
      default: undefined
    },
    scroll: {
      type: Object as PropType<TableProps['scroll']>,
      default: undefined
    },
    bordered: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'large' | 'middle' | 'small'>,
      default: 'middle'
    },
    title: {
      type: String,
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'pageChange', 'sizeChange'],
  setup(props, { emit }) {
    // 计算分页配置
    const paginationConfig = computed(() => {
      if (props.pagination === false) return false
      
      return {
        ...props.pagination,
        onChange: (page: number, pageSize: number) => {
          emit('pageChange', { page, pageSize })
        },
        onShowSizeChange: (current: number, size: number) => {
          emit('sizeChange', { current, size })
        }
      }
    })

    // 表格变化事件
    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
      emit('change', { pagination, filters, sorter })
    }

    return {
      paginationConfig,
      handleTableChange
    }
  }
})
</script>

<style scoped>
.k-table-container {
  width: 100%;
}

.k-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.k-table-title {
  font-size: 16px;
  font-weight: 500;
}

.k-table-actions {
  display: flex;
  gap: 8px;
}
</style>