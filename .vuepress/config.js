module.exports = {
    title: '/webpack Doc/',
    description: 'Just playing around',
    themeConfig: {
        sidebar: {
          '/concepts/': [
            '',     /* concepts概念 */
            'one',  /* fdsafdsaf */
            'two'   /* fdsafdsa */
          ],
        },
        nav: [
          { text: 'Home', link: '/' },
          { text: 'concepts(概念)', link: '/concepts/' },
          {
            text: 'Languages',
            items: [
              { text: 'Chinese', link: '/language/chinese' },
              { text: 'Japanese', link: '/language/japanese' }
            ]
          },
          { text: 'External', link: 'https://google.com' },
        ]
      }
  }