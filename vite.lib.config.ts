import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outputDir: ['es', 'lib'],
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KukuUI',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'ant-design-vue'],
      output: [
        {
          format: 'es',
          dir: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js'
        },
        {
          format: 'cjs',
          dir: 'lib',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js'
        }
      ]
    }
  }
})