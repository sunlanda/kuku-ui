<template>
  <a-form
    ref="formRef"
    :model="formData"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :layout="layout"
    :rules="rules"
    :name="name"
    :validate-trigger="validateTrigger"
    :scroll-to-first-error="scrollToFirstError"
    @finish="handleFinish"
    @finish-failed="handleFinishFailed"
    @validate="handleValidate"
  >
    <a-row :gutter="formGutter">
      <a-col
        v-for="(item, index) in visibleItems"
        :key="item.name"
        :span="getItemSpan(item)"
      >
        <a-form-item
          :name="item.name"
          :label="item.label"
          :rules="item.rules"
        >
          <!-- 输入框 -->
          <a-input
            v-if="item.type === 'input'"
            v-model:value="formData[item.name]"
            v-bind="item.props"
          />

          <!-- 选择框 -->
          <a-select
            v-else-if="item.type === 'select'"
            v-model:value="formData[item.name]"
            v-bind="item.props"
          >
            <a-select-option
              v-for="option in item.options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>

          <!-- 单选框组 -->
          <a-radio-group
            v-else-if="item.type === 'radio'"
            v-model:value="formData[item.name]"
            v-bind="item.props"
          >
            <a-radio
              v-for="option in item.options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </a-radio>
          </a-radio-group>

          <!-- 日期选择器 -->
          <a-date-picker
            v-else-if="item.type === 'date-picker'"
            v-model:value="formData[item.name]"
            v-bind="item.props"
            style="width: 100%"
          />

          <!-- 自定义表单项 -->
          <slot
            v-else-if="item.type === 'custom' && item.slotName"
            :name="item.slotName"
            :form-data="formData"
            :item="item"
          ></slot>
        </a-form-item>
      </a-col>
    </a-row>

    <!-- 表单按钮 -->
    <div v-if="showButtons" class="k-form-buttons">
      <a-button type="primary" html-type="submit">{{ submitText }}</a-button>
      <a-button style="margin-left: 8px" @click="resetForm">{{ resetText }}</a-button>
    </div>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, PropType, onMounted } from 'vue';
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Select as ASelect,
  SelectOption as ASelectOption,
  Radio as ARadio,
  RadioGroup as ARadioGroup,
  DatePicker as ADatePicker,
  Button as AButton,
  Row as ARow,
  Col as ACol,
} from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue/es/form';
import type { KFormItem, KFormConfig } from './types';

export default defineComponent({
  name: 'KForm',
  components: {
    AForm,
    AFormItem,
    AInput,
    ASelect,
    ASelectOption,
    ARadio,
    ARadioGroup,
    ADatePicker,
    AButton,
    ARow,
    ACol,
  },
  props: {
    // 表单项配置
    items: {
      type: Array as PropType<KFormItem[]>,
      required: true,
    },
    // 表单数据模型
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    // 表单布局
    layout: {
      type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
      default: 'horizontal',
    },
    // 标签列布局
    labelCol: {
      type: Object as PropType<{ span: number; offset?: number }>,
      default: () => ({ span: 6 }),
    },
    // 包装列布局
    wrapperCol: {
      type: Object as PropType<{ span: number; offset?: number }>,
      default: () => ({ span: 18 }),
    },
    // 表单名称
    name: {
      type: String,
      default: 'k-form',
    },
    // 验证触发方式
    validateTrigger: {
      type: [String, Array] as PropType<string | string[]>,
      default: 'change',
    },
    // 是否滚动到第一个错误
    scrollToFirstError: {
      type: Boolean,
      default: true,
    },
    // 表单布局配置
    formLayout: {
      type: Object as PropType<{
        cols?: number;
        labelWidth?: number | string;
        labelAlign?: 'left' | 'right';
        gutter?: number | [number, number];
      }>,
      default: () => ({
        cols: 3,
        labelAlign: 'right',
        gutter: 16,
      }),
    },
    // 是否显示提交和重置按钮
    showButtons: {
      type: Boolean,
      default: true,
    },
    // 提交按钮文本
    submitText: {
      type: String,
      default: '提交',
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置',
    },
  },
  emits: ['update:modelValue', 'finish', 'finishFailed', 'validate', 'reset'],
  setup(props, { emit, slots }) {
    // 表单引用
    const formRef = ref<FormInstance>();
    
    // 表单数据
    const formData = reactive<Record<string, any>>({...props.modelValue});
    
    // 初始化表单数据
    const initFormData = () => {
      props.items.forEach(item => {
        if (item.defaultValue !== undefined && formData[item.name] === undefined) {
          formData[item.name] = item.defaultValue;
        }
      });
    };
    
    // 可见的表单项
    const visibleItems = computed(() => {
      return props.items.filter(item => item.visible !== false);
    });
    
    // 表单验证规则
    const rules = computed(() => {
      const result: Record<string, any> = {};
      props.items.forEach(item => {
        if (item.rules && item.rules.length > 0) {
          result[item.name] = item.rules;
        }
      });
      return result;
    });
    
    // 获取表单项的列宽
    const getItemSpan = (item: KFormItem) => {
      const cols = props.formLayout?.cols || 3;
      const span = 24 / cols;
      return item.span ? span * item.span : span;
    };
    
    // 表单项间距
    const formGutter = computed(() => {
      return props.formLayout?.gutter || 16;
    });
    
    // 提交表单
    const handleFinish = (values: any) => {
      emit('finish', values);
    };
    
    // 提交表单失败
    const handleFinishFailed = ({ values, errorFields, outOfDate }: any) => {
      emit('finishFailed', { values, errorFields, outOfDate });
    };
    
    // 表单验证
    const handleValidate = (name: string | string[], status: boolean, errorMsgs: string[]) => {
      emit('validate', name, status, errorMsgs);
    };
    
    // 重置表单
    const resetForm = () => {
      formRef.value?.resetFields();
      initFormData();
      emit('reset');
    };
    
    // 监听表单数据变化
    watch(formData, (newVal) => {
      emit('update:modelValue', {...newVal});
    }, { deep: true });
    
    // 监听外部数据变化
    watch(() => props.modelValue, (newVal) => {
      Object.keys(newVal).forEach(key => {
        formData[key] = newVal[key];
      });
    }, { deep: true });
    
    // 组件挂载时初始化表单数据
    onMounted(() => {
      initFormData();
    });
    
    return {
      formRef,
      formData,
      visibleItems,
      rules,
      getItemSpan,
      formGutter,
      handleFinish,
      handleFinishFailed,
      handleValidate,
      resetForm,
    };
  },
});
</script>

<style scoped>
.k-form-buttons {
  margin-top: 24px;
  text-align: right;
}
</style>