module.exports = {
    base: '/Webpack-learning/',
    title: 'Webpack learning',
    description: 'webpack学习指南',
    themeConfig: {
        sidebar: {
          '/concepts/': [
            'howInstall', /* install安装 */
            'concept', /* concepts概念 */
            'entry', /* entry入口 */
            'configuration', /* configuration配置 */
            'output', /* output 输出 */
            'loader', /* loader 转换器 */
            'plugins', /* plugins 插件 */
            'mode' /* 模式 */
          ],
        },
        nav: [
          { text: 'Home', link: '/' },
          { text: 'concepts(概念)', link: '/concepts/howInstall' },
          // {
          //   text: 'Languages',
          //   items: [
          //     { text: 'Chinese', link: '/language/chinese' },
          //     { text: 'Japanese', link: '/language/japanese' }
          //   ]
          // },
          // { text: 'External', link: 'https://google.com' },
        ]
      }
  }