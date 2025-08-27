<template>
  <div ref="vantaRef" class="vanta-background"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as THREE from 'three';

const vantaRef = ref(null);
let vantaEffect = null;

// دالة لتحديد التأثير والخصائص بناءً على الوضع
const initializeVanta = async () => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }

  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  let VantaEffectModule;
  let options;

  if (isDarkMode) {
    // دارك مود: استخدام تأثير Cells
    VantaEffectModule = await import('vanta/dist/vanta.cells.min');
    options = {
      color1: 0x4f46e5, // بنفسجي داكن
      color2: 0x3730a3,
      size: 1.50
    };
  } else {
    // لايت مود: استخدام تأثير NET
    VantaEffectModule = await import('vanta/dist/vanta.net.min');
    options = {
      color: 0x3b82f6,      // أزرق
      backgroundColor: 0xf3f4f6,
      points: 12.0,
      maxDistance: 20.0,
      spacing: 15.0
    };
  }
  
  const VantaEffect = VantaEffectModule.default;

  vantaEffect = VantaEffect({
    el: vantaRef.value,
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    ...options
  });
};

onMounted(() => {
  if (process.client) {
    // تهيئة التأثير لأول مرة
    initializeVanta();

    // مراقبة التغييرات في سمة الكلاس
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          initializeVanta();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    onBeforeUnmount(() => {
      observer.disconnect();
    });
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
});
</script>

<style scoped>
.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>