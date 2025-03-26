<template>
  <a-button
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :block="block"
    :shape="shape"
    :class="customClass"
    @click="handleClick"
  >
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import 'ant-design-vue/es/button/style/css'

export default defineComponent({
  name: 'KButton',
  components: {
    AButton
  },
  props: {
    type: {
      type: String as PropType<'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'>,
      default: 'default'
    },
    size: {
      type: String as PropType<'large' | 'middle' | 'small'>,
      default: 'middle'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String as PropType<'circle' | 'round' | undefined>,
      default: undefined
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(_, { emit }) {
    const handleClick = (e: MouseEvent) => {
      emit('click', e)
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>