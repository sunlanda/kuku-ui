<template>
  <div class="demo-container">
    <div class="demo-preview">
      <slot name="preview"></slot>
    </div>
    <div class="demo-code">
      <div class="demo-code-header">
        <span>{{ title }}</span>
        <button class="copy-btn" @click="copyCode" :class="{ copied: copied }">
          {{ copied ? '复制成功' : '复制代码' }}
        </button>
      </div>
      <div class="demo-code-content">
        <slot name="code"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: '示例'
  },
  code: {
    type: String,
    default: ''
  }
});

const copied = ref(false);

const copyCode = () => {
  const code = document.querySelector('.demo-code-content pre code')?.textContent;
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    });
  }
};
</script>

<style>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-preview {
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-code {
  background-color: var(--vp-c-bg-soft);
}

.demo-code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.copy-btn {
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-2);
}

.copy-btn:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.copy-btn.copied {
  color: var(--vp-c-green);
  border-color: var(--vp-c-green);
}

.demo-code-content {
  padding: 0;
  margin: 0;
}

.demo-code-content pre {
  margin: 0;
  padding: 16px;
}
</style>