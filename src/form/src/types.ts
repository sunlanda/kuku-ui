import type { FormProps, FormItemProps, Rule } from 'ant-design-vue/es/form';
import type { SelectProps } from 'ant-design-vue/es/select';
import type { DatePickerProps } from 'ant-design-vue/es/date-picker';
import type { InputProps } from 'ant-design-vue/es/input';
import type { RadioGroupProps } from 'ant-design-vue/es/radio';

// 表单项类型
export type FormItemType = 'input' | 'select' | 'radio' | 'date-picker' | 'custom';

// 表单项配置接口
export interface KFormItem {
  // 表单项字段名
  name: string;
  // 表单项标签
  label: string;
  // 表单项类型
  type: FormItemType;
  // 表单项占据的列数（默认为1）
  span?: number;
  // 是否显示
  visible?: boolean;
  // 表单项验证规则
  rules?: Rule[];
  // 表单项默认值
  defaultValue?: any;
  // 表单项属性，根据不同类型有不同配置
  props?: {
    // 通用属性
    placeholder?: string;
    disabled?: boolean;
    allowClear?: boolean;
    [key: string]: any;
  } & Partial<InputProps & SelectProps & RadioGroupProps & DatePickerProps>;
  // 选项数据（用于select、radio等）
  options?: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
    [key: string]: any;
  }>;
  // 自定义渲染函数的名称（用于custom类型）
  slotName?: string;
}

// 表单配置接口
export interface KFormConfig extends Omit<FormProps, 'model'> {
  // 表单项配置
  items: KFormItem[];
  // 表单布局
  layout?: {
    // 每行显示的列数
    cols?: number;
    // 标签宽度
    labelWidth?: number | string;
    // 标签位置
    labelAlign?: 'left' | 'right';
    // 表单项间距
    gutter?: number | [number, number];
  };
  // 是否显示提交和重置按钮
  showButtons?: boolean;
  // 提交按钮文本
  submitText?: string;
  // 重置按钮文本
  resetText?: string;
}