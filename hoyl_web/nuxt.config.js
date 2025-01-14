import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 3000,      // Asegúrate de que coincida con el puerto
  },
  head: {
    titleTemplate: '%s - HOYL',
    title: 'HOYL',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    'vuetify/dist/vuetify.min.css',
  ],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: false,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  // Modules
  modules: ["cookie-universal-nuxt"],

  router: {
    middleware: ['user'],
  },

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    icons: {
    iconfont: 'mdi', // default - only for display purposes
    }, 
    theme: {
      dark: false,
      light: true,
      themes: {
        light: {
          primary: "#C67D4D",
          accent: "#000000",
          secondary: "#C85E17",
          info: "#F18E4C",
          warning: "#E5AB86",
          error: colors.deepOrange.accent4,
          success: "#d7a381",
        }
      }
    }
  },

  // Build Configuration
  build: {}
}
