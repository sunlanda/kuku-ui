<!--
 * @Date: 2025-03-26 20:13:53
 * @LastEditTime: 2025-04-08 14:37:44
 * @FilePath: /kuku-ui/src/card/src/card.vue
-->
<template>
  <div class="k-card-container" :class="{ 'k-card-fullscreen': isFullscreen }">
    <a-card v-bind="$attrs">
      <template #extra>
        <div class="k-card-actions">
          <a-button 
            type="text" 
            class="k-card-expand-button" 
            @click="toggleFullscreen"
          >
            <template #icon>
              <!-- <compress-outlined v-if="isFullscreen" />
              <expand-outlined v-else /> -->
            </template>
          </a-button>
          <slot name="extra"></slot>
        </div>
      </template>
      <!-- 转发所有插槽 -->
      <template v-for="(_, name) in $slots"  v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Card as ACard, Button as AButton } from 'ant-design-vue'
// import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'KCard',
  components: {
    ACard,
    AButton,
    // ExpandOutlined,
    // CompressOutlined
  },
  inheritAttrs: false,
  setup() {
    const isFullscreen = ref(false)

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
    }

    return {
      isFullscreen,
      toggleFullscreen
    }
  }
})
</script>

<style scoped>
.k-card-container {
  position: relative;
  transition: all 0.3s ease;
}

.k-card-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}

.k-card-actions {
  display: flex;
  align-items: center;
}

.k-card-expand-button {
  margin-right: 8px;
}
</style>