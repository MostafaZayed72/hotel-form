<template>
  <div>
    <button
      @click="toggleDarkMode"
      class="p-2 rounded focus:outline-none"
    >
      <i v-if="isDarkMode" class="fas fa-sun text-2xl  text-white"></i> 
      <i v-else class="fas fa-moon text-2xl  text-black"></i> 
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// تأكد من أن Font Awesome يتم استيراده إما هنا أو في nuxt.config.ts كما ناقشنا سابقًا.
// إذا واجهت مشكلة في الاستيراد هنا، فمن الأفضل نقله إلى nuxt.config.ts
import '@fortawesome/fontawesome-free/css/all.css';


const isDarkMode = ref(false)

// استعادة حالة الوضع من التخزين المحلي عند تحميل الصفحة
onMounted(() => {
  const savedColorMode = localStorage.getItem('colorMode')
  if (savedColorMode) { // لا حاجة للتحقق من 'dark' أو 'light' بشكل صريح، يكفي وجود القيمة
    isDarkMode.value = savedColorMode === 'dark'
    // تطبيق الكلاس 'dark-mode' على عنصر <html> بدلاً من <body>
    document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
  } else {
    // إذا لم تكن هناك قيمة محفوظة، قم بتعيين الوضع الافتراضي (فاتح)
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('colorMode', 'light');
  }
})

// دالة لتبديل الوضع الليلي والنهاري
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  // تطبيق الكلاس 'dark-mode' على عنصر <html> بدلاً من <body>
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
  // حفظ حالة الوضع في التخزين المحلي
  localStorage.setItem('colorMode', isDarkMode.value ? 'dark' : 'light')
}
</script>

<style>
/* يجب أن تكون هذه الأنماط في ملف CSS عام أو في app.vue لتطبيقها على كامل الصفحة */
/* إعدادات اللون عند التبديل بين الوضعين */
body {
  transition: background-color 0.3s, color 0.3s; /* إضافة تأثير انتقال سلس */
}

/* إعداد اللون للخلفية والنصوص عند تفعيل الوضع الليلي */
/* يتم تطبيق هذه الأنماط عندما يكون الكلاس 'dark-mode' موجودًا على <html> */
html.dark-mode body {
  background-color: #1e1e1e; /* لون خلفية الوضع الليلي */
  color: white; /* لون النص في الوضع الليلي */
}
/* إعداد اللون للخلفية والنصوص في الوضع النهاري (افتراضي) */
html:not(.dark-mode) body { /* اختياري: يمكنك تحديده بوضوح للوضع النهاري */
   background-color: #ffffff; /* لون خلفية الوضع النهاري */
   color: black; /* لون النص في الوضع النهاري */
}


/* مثال لكيفية التعامل مع عناصر أخرى داخل الوضع الداكن */
/* إذا كان لديك شريط قائمة (Menubar) وتريد تطبيق أنماط الوضع الداكن عليه */
.Menubar {
  transition: background-color 0.3s, color 0.3s;
}

html.dark-mode .Menubar {
  background-color: #1e1e1e;
  color: white; /* لضمان أن النص داخل شريط القائمة يصبح أبيض */
}

/* في الوضع النهاري، الألوان الافتراضية ستطبق، أو يمكنك تحديدها */
/*
html:not(.dark-mode) .Menubar {
  background-color: #f0f0f0;
  color: black;
}
*/
</style>