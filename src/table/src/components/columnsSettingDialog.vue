<template>
  <div class="columns-setting-dialog">
    <div class="dialog-header">
      <h3>{{ '列设置' }}</h3>
    </div>
    <div class="dialog-content">
      <div class="columns-list">
        <div
          v-for="(item, index) in columnsList"
          :key="index"
          class="column-item"
        >
          <a-checkbox v-model:checked="item.checked" @change="handleCheckChange">
            {{ item.label || item.title }}
          </a-checkbox>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <a-button @click="handleCancel">{{ '取消' }}</a-button>
      <a-button type="primary" @click="handleConfirm">{{ '确定' }}</a-button>
    </div>
  </div>
</template>

<script>
import { Checkbox as ACheckbox, Button as AButton } from 'ant-design-vue'
import 'ant-design-vue/es/checkbox/style/css'
import 'ant-design-vue/es/button/style/css'

export default {
  name: 'ColumnsSettingDialog',
  components: {
    ACheckbox,
    AButton
  },
  props: {
    allColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnsList: []
    }
  },
  created() {
    // 深拷贝列配置，避免直接修改props
    this.columnsList = JSON.parse(JSON.stringify(this.allColumns))
  },
  methods: {
    handleCheckChange() {
      // 列选中状态变化时的处理
    },
    handleCancel() {
      this.$emit('close')
    },
    handleConfirm() {
      // 过滤出选中的列
      const filteredColumns = this.columnsList.filter(item => item.checked)
      this.$emit('success', filteredColumns)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.columns-setting-dialog {
  padding: 16px;
}

.dialog-header {
  margin-bottom: 16px;
}

.dialog-content {
  max-height: 400px;
  overflow-y: auto;
}

.columns-list {
  display: flex;
  flex-wrap: wrap;
}

.column-item {
  width: 33.33%;
  margin-bottom: 12px;
}

.dialog-footer {
  margin-top: 16px;
  text-align: right;
}

.dialog-footer button {
  margin-left: 8px;
}
</style>