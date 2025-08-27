<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'" :lang="locale">
    <NavBar />
    <ClientOnly>
      <VantaBackground />
    </ClientOnly>
    <NuxtPage />
    <Footer class="fixed bottom-0 w-full"/>
  </div>
</template>

<script setup>
import VantaBackground from '~/components/VantaBackground.vue'
import NavBar from '~/components/NavBar.vue'
import Footer from '~/components/Footer.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

// متغير محسوب لتحديد الاتجاه
const isRTL = computed(() => locale.value === 'ar')
</script>
