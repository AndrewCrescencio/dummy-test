import Aura from '@primevue/themes/aura'
import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    'nuxt-headlessui',
    '@vee-validate/nuxt',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: [
    '@unocss/reset/tailwind-compat.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: import.meta.env.API_BASE_URL || 'https://dummyjson.com',
      apiViaCepUrl: import.meta.env.API_VIA_CEP_URL || 'https://viacep.com.br/ws',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  features: {
    inlineStyles: false,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  headlessui: {
    prefix: 'Headless',
  },

  primevue: {
    autoImport: true,

    components: {
      prefix: 'Prime',

    },
    options: {

      ripple: true,
      theme: {

        preset: Aura,
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base',
        },
      },

    },
  },

  pwa,

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
})
