import { defineConfig } from 'vitepress'

export default defineConfig({
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
      { text: 'GitHub', link: 'https://github.com/your-username/kuku-ui' }
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
            { text: 'Table 表格', link: '/components/table' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/kuku-ui' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Your Name'
    }
  }
})