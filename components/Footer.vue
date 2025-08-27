<template>
  <footer class="nav  py-8 mt-12">
    <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

      <!-- الشعار -->
      <h2 class="text-2xl font-bold">Mavistay</h2>

      <!-- بيانات التواصل -->
      <div class="space-y-2 text-center md:text-left">
        <p>
          WhatsApp: 
          <a href="https://wa.me/905540172222" target="_blank" class="text-green-400 hover:underline">
            +90 554 017 22 22
          </a>
        </p>
        <p>
          Web: 
          <a href="https://mavistay.com/" target="_blank" class="text-blue-400 hover:underline">
            www.mavistya.com
          </a>
        </p>
      </div>

      <!-- السوشيال ميديا -->
      <div class="flex gap-4">
        <!-- Instagram -->
        <a href="https://www.instagram.com/Mavistay.agency" target="_blank" aria-label="Instagram">
          <Icon name="skill-icons:instagram" class="text-2xl"/>
        </a>

        <!-- Facebook -->
        <a href="https://www.facebook.com/Mavistay.agency" target="_blank" aria-label="Facebook">
          <Icon name="logos:facebook" class="text-2xl"/>
        </a>

        <!-- TikTok -->
        <a href="https://www.tiktok.com/@Mavistay.agency" target="_blank" aria-label="TikTok">
                   <Icon name="icon-park-outline:tiktok" class="text-2xl"/>

        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/905540172222" target="_blank" aria-label="WhatsApp">
                  <Icon name="logos:whatsapp-icon" class="text-2xl"/>

        </a>

      </div>
    </div>

    <div class="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
      © {{ new Date().getFullYear() }} Mavistay. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
/* No logic needed */
</script>

<style scoped>
footer a svg {
  transition: color 0.3s;
}

body .nav {
    background-color: #dbd5d5;
}
.dark-mode .nav {
    background-color: #0e3250;

}
</style>
