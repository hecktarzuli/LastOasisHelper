const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3000' : 'https://nomads-notebook.herokuapp.com/',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    oauth2Url: process.env.OAUTH2_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Nomad's Notebook` : "Nomad's Notebook"
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  serverMiddleware: [{ path: '/api/code', handler: '~/api/code.js' }],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/auth', mode: 'client' }, '~/plugins/api'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-leaflet',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.orange.darken3,
          accent: colors.blueGrey.darken4,
          secondary: colors.amber.darken4,
          info: colors.teal.lighten1,
          warning: colors.amber.darken1,
          error: colors.deepOrange.accent4,
          success: colors.green.accent4
        }
      }
    }
  },
  /*
   ** Router configuration
   */
  router: {
    middleware: ['auth']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
