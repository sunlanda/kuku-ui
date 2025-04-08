/*
 * @Date: 2025-03-28 19:34:15
 * @LastEditTime: 2025-04-08 10:57:50
 * @FilePath: /kuku-ui/docs/.vitepress/config.ts
 */
import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src')
      }
    }
  },
  title: 'Kuku UI',
  description: '基于ant-design-vue的业务组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://github.com/sunlanda/kuku-ui' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题定制', link: '/guide/theme' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Select 选择器', link: '/components/select' },
            // { text: 'Form 表格', link: '/components/form' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sunlanda/kuku-ui' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-2025 Kuku UI'
    }
  }
})