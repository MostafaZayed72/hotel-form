<template>
  <div>
    <NavBar />
    <ClientOnly>
      <VantaBackground />
    </ClientOnly>
    <NuxtPage />
        <Footer />

  </div>
</template>

<script setup>
import VantaBackground from '~/components/VantaBackground.vue'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const { locale } = useI18n()

// لما اللغة تتغير غيّر الـ dir والـ lang
watch(locale, (newLocale) => {
  const dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  const lang = newLocale === 'ar' ? 'ar' : 'en'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lang)
})

// نفذ أول مرة عند التحميل
const dir = locale.value === 'ar' ? 'rtl' : 'ltr'
const lang = locale.value === 'ar' ? 'ar' : 'en'
document.documentElement.setAttribute('dir', dir)
document.documentElement.setAttribute('lang', lang)
</script>
