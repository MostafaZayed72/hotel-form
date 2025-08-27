<template>
  <div class="language-switcher cursor-pointer" @click="toggleLanguage">
    <Icon 
      name="mdi:web"
      class="text-2xl transition-colors"
      :class="isDarkMode ? 'text-white' : 'text-black'" 
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

const { locale } = useI18n()
const isDarkMode = ref(false)

const toggleLanguage = () => {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
}

// وظيفة بتقرأ الوضع الحالي من localStorage أو <html>
const checkDarkMode = () => {
  const savedColorMode = localStorage.getItem('colorMode')
  isDarkMode.value = savedColorMode === 'dark'
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

onMounted(() => {
  checkDarkMode()

  // متابعة أي تغيير في الـ dark mode
  const observer = new MutationObserver(() => {
    checkDarkMode()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
}
</style>
