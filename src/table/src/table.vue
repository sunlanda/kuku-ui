<template>
  <div class="k-table-container">
    <div class="k-table-header" v-if="$slots.header || showHeader">
      <slot name="header">
        <div class="k-table-title" v-if="title">{{ title }}</div>
        <div class="k-table-actions">
          <slot name="actions"></slot>
          <a-button v-if="enableColumnsSetting" @click="openColumnsSetting">
            <template #icon><setting-outlined /></template>
            {{ "列设置" }}
          </a-button>
        </div>
      </slot>
    </div>

    <a-table
      :columns="processedColumns"
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

      <!-- 自定义列渲染 -->
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.customType">
          <div
            v-if="column.customType === 'link'"
            class="column-custom-item link"
          >
            <a @click="handleLinkClick(record, column)">{{
              record[column.dataIndex]
            }}</a>
          </div>
          <div
            v-else-if="column.customType === 'status'"
            class="column-custom-item"
          >
            <span>{{
              getStatusText(record[column.dataIndex], column.statusMap)
            }}</span>
          </div>
          <div
            v-else-if="column.customType === 'time'"
            class="column-custom-item"
          >
            {{ formatTime(record[column.dataIndex]) }}
          </div>
          <div
            v-else-if="column.customType === 'money'"
            class="column-custom-item price-light-red"
          >
            {{ formatCurrency(record[column.dataIndex]) }}
          </div>
          <div
            v-else-if="column.customType === 'custom'"
            class="column-custom-item"
          >
            <slot
              :name="`column-${column.dataIndex}`"
              :record="record"
              :index="index"
            ></slot>
          </div>
        </template>
      </template>

      <template v-for="slot in Object.keys($slots)" #[slot]="data" :key="slot">
        <slot :name="slot" v-bind="data"></slot>
      </template>
    </a-table>

    <!-- 列设置对话框 -->
    <a-modal
      v-model:visible="columnsSettingVisible"
      :title="'列设置'"
      @ok="handleColumnsSettingConfirm"
      @cancel="columnsSettingVisible = false"
    >
      <columns-setting-dialog
        ref="columnsSettingDialog"
        :all-columns="originalKColumns"
        @success="handleColumnsSettingSuccess"
        @close="columnsSettingVisible = false"
      />
    </a-modal> 
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    computed,
    ref,
    onMounted,
    watch,
  } from "vue";
  import {
    Table as ATable,
    Modal as AModal,
    Button as AButton,
  } from "ant-design-vue";
  import { SettingOutlined } from "@ant-design/icons-vue";
  import type {
    TableProps,
    TablePaginationConfig,
    TableColumnType,
  } from "ant-design-vue";
  import { KTableColumnType } from "./types";
  import ColumnsSettingDialog from "./components/columnsSettingDialog.vue";

  export default defineComponent({
    name: "KTable",
    components: {
      ATable,
      AModal,
      AButton,
      SettingOutlined,
      ColumnsSettingDialog,
    },
    props: {
      // 支持两种列定义方式：原生TableColumnType和扩展的KTableColumnType
      columns: {
        type: Array as PropType<TableColumnType[] | KTableColumnType[]>,
        required: true,
      },
      dataSource: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
      loading: {
        type: Boolean,
        default: false,
      },
      pagination: {
        type: [Object, Boolean] as PropType<TablePaginationConfig | false>,
        default: () => ({
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => `共 ${total} 条`,
        }),
      },
      rowKey: {
        type: [String, Function] as PropType<
          string | ((record: any) => string)
        >,
        default: "id",
      },
      rowSelection: {
        type: Object as PropType<TableProps["rowSelection"]>,
        default: undefined,
      },
      scroll: {
        type: Object as PropType<TableProps["scroll"]>,
        default: undefined,
      },
      bordered: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String as PropType<"large" | "middle" | "small">,
        default: "middle",
      },
      title: {
        type: String,
        default: "",
      },
      showHeader: {
        type: Boolean,
        default: false,
      },
      // 是否启用列设置功能
      enableColumnsSetting: {
        type: Boolean,
        default: true,
      },
      // 本地存储的键名
      storageKey: {
        type: String,
        default: "",
      },
    },
    emits: ["change", "pageChange", "sizeChange"],
    setup(props, { emit }) {
      // 列设置对话框显示状态
      const columnsSettingVisible = ref<boolean>(false);
      // 原始KTableColumnType列配置
      const originalKColumns = ref<KTableColumnType[]>([]);
      console.log("🚀 ~ setup ~ originalKColumns:", originalKColumns.value)
      // 当前选中的列配置
      const filteredColumns = ref<KTableColumnType[]>([]);
      // 列设置对话框引用
      const columnsSettingDialog = ref();

      // 判断是否使用扩展的KTableColumnType
      const isUsingKTableColumnType = computed(() => {
        console.log("🚀 ~ isUsingKTableColumnType ~ props?.columns:", props?.columns)
        if (!props?.columns?.length) return false;
        return "name" in props.columns[0] && "type" in props.columns[0];
      });

      // 将KTableColumnType转换为TableColumnType
      const convertKColumnToTableColumn = (
        kColumn: KTableColumnType
      ): TableColumnType => {
        const {
          name,
          label,
          type,
          style,
          props: columnProps,
          ...rest
        } = kColumn;

        // 基本列配置
        const tableColumn: TableColumnType = {
          ...rest,
          dataIndex: name,
          title: label,
          key: name,
          customType: type, // 自定义属性，用于标识列类型
          width: style?.width,
          align: style?.align || "left",
        };

        // 根据列类型添加特殊配置
        if (type === "status" && columnProps?.map) {
          tableColumn.statusMap = columnProps.map;
        } else if (type === "link" && columnProps?.onClick) {
          tableColumn.onLinkClick = columnProps.onClick;
        }

        return tableColumn;
      };

      // 处理后的表格列
      const processedColumns = computed(() => {
        console.log("🚀 ~ processedColumns ~ isUsingKTableColumnType.value:", isUsingKTableColumnType.value)
        if (!isUsingKTableColumnType.value) {
          return props.columns as TableColumnType[];
        }

        // 使用过滤后的列或原始列
        const columnsToProcess =
          filteredColumns.value.length > 0
            ? filteredColumns.value
            : (props.columns as KTableColumnType[]);

        // 过滤出选中的列并转换为TableColumnType
        return columnsToProcess
          .filter((col) => col.checked !== false)
          .map(convertKColumnToTableColumn);
      });

      // 初始化列配置
      const initColumns = () => {
        if (!isUsingKTableColumnType.value) return;

        // 转换为KTableColumnType并设置默认选中状态
        const kColumns = (props.columns as KTableColumnType[]).map((col) => ({
          ...col,
          checked: col.checked !== false,
        }));

        originalKColumns.value = kColumns;
        console.log("🚀 ~ initColumns ~ originalKColumns.value:", originalKColumns.value)

        // 如果有存储键名，尝试从本地存储加载列配置
        if (props.storageKey) {
          try {
            const storedColumns = localStorage.getItem(
              `k-table-columns-${props.storageKey}`
            );
            if (storedColumns) {
              const parsedColumns = JSON.parse(
                storedColumns
              ) as KTableColumnType[];
              // 合并存储的列配置和当前列配置
              filteredColumns.value = mergeColumns(kColumns, parsedColumns);
              return;
            }
          } catch (error) {
            console.error("Failed to load columns from storage:", error);
          }
        }

        // 默认使用原始列配置
        filteredColumns.value = kColumns;
      };

      // 合并列配置
      const mergeColumns = (
        originColumns: KTableColumnType[],
        newColumns: KTableColumnType[]
      ) => {
        const mergedColumns = [...originColumns];

        // 更新已存在的列配置
        for (let i = 0; i < mergedColumns.length; i++) {
          const oldColumn = mergedColumns[i];
          const newColumnIndex = newColumns.findIndex(
            (col) => col.name === oldColumn.name
          );

          if (newColumnIndex !== -1) {
            mergedColumns[i] = { ...oldColumn, ...newColumns[newColumnIndex] };
          }
        }

        // 添加新增的列
        for (const newColumn of newColumns) {
          if (!mergedColumns.some((col) => col.name === newColumn.name)) {
            mergedColumns.push(newColumn);
          }
        }

        return mergedColumns;
      };

      // 打开列设置对话框
      const openColumnsSetting = () => {
        columnsSettingVisible.value = true;
        console.log("🚀 ~ openColumnsSetting ~ columnsSettingVisible:", columnsSettingVisible.value,originalKColumns.value)
      };

      // 列设置确认
      const handleColumnsSettingConfirm = () => {
        console.log("🚀 ~ handleColumnsSettingConfirm ~ handleColumnsSettingConfirm:")
        columnsSettingDialog.value?.handleConfirm();
      };

      // 列设置成功回调
      const handleColumnsSettingSuccess = (columns: KTableColumnType[]) => {
        filteredColumns.value = columns;

        // 保存到本地存储
        if (props.storageKey) {
          try {
            localStorage.setItem(
              `k-table-columns-${props.storageKey}`,
              JSON.stringify(columns)
            );
          } catch (error) {
            console.error("Failed to save columns to storage:", error);
          }
        }

        columnsSettingVisible.value = false;
      };

      // 处理链接点击
      const handleLinkClick = (record: any, column: any) => {
        if (column.onLinkClick) {
          column.onLinkClick(record);
        }
      };

      // 获取状态文本
      const getStatusText = (
        value: string | number,
        statusMap?: Record<string | number, string>
      ) => {
        if (!statusMap) return value;
        return statusMap[value] || value;
      };

      // 格式化时间
      const formatTime = (time: string) => {
        if (!time) return "";
        // 这里可以根据实际需求实现时间格式化
        return time;
      };

      // 格式化货币
      const formatCurrency = (value: number) => {
        if (value === undefined || value === null) return "";
        // 这里可以根据实际需求实现货币格式化
        return value.toLocaleString("zh-CN", {
          style: "currency",
          currency: "CNY",
        });
      };

      // 计算分页配置
      const paginationConfig = computed(() => {
        if (props.pagination === false) return false;

        return {
          ...props.pagination,
          onChange: (page: number, pageSize: number) => {
            emit("pageChange", { page, pageSize });
          },
          onShowSizeChange: (current: number, size: number) => {
            emit("sizeChange", { current, size });
          },
        };
      });

      // 表格变化事件
      const handleTableChange = (
        pagination: any,
        filters: any,
        sorter: any
      ) => {
        emit("change", { pagination, filters, sorter });
      };

      // 监听列配置变化
      watch(
        () => props.columns,
        () => {
          initColumns();
        },
        { deep: true }
      );

      // 组件挂载时初始化列配置
      onMounted(() => {
        initColumns();
      });

      return {
        columnsSettingVisible,
        originalKColumns,
        filteredColumns,
        columnsSettingDialog,
        processedColumns,
        paginationConfig,
        handleTableChange,
        openColumnsSetting,
        handleColumnsSettingConfirm,
        handleColumnsSettingSuccess,
        handleLinkClick,
        getStatusText,
        formatTime,
        formatCurrency,
      };
    },
  });
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

  /* 自定义列样式 */
  .column-custom-item {
    display: inline-block;
  }

  .column-custom-item.link {
    color: #1890ff;
    cursor: pointer;
  }

  .column-custom-item.link:hover {
    color: #40a9ff;
  }

  .price-light-red {
    color: #f5222d;
  }
</style>
