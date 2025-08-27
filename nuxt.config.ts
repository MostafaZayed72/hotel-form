// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  app: {
    baseURL: '/booking/',   
  },

  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      CLOUDINARY_CLOUD_NAME: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_UPLOAD_PRESET: process.env.NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      baseUrl: process.env.NUXT_BASE_URL
    }
  },
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-swiper',
    'vuetify-nuxt-module',
    '@nuxt/image'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'ar',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ar', iso: 'ar-EG', file: 'ar.json', dir: 'rtl' },
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
    ],
  }




})