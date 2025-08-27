<template>
    <nav class="flex justify-between items-center shadow-md py-3 sticky top-0 z-10">
        <!-- LOGO -->
        <div class="mx-5 md:mx-10 ">
           <img src="/public/fe40fc5b-9967-40a5-ac1b-82f69ba48b91.jpeg" alt="" class="w-16 h-16 rounded-full">
        </div>
        <!-- LINKS IN LARGE SCREEN -->
        <div class="mx-10 hidden lg:block">
            <ul class="flex  items-center font-semibold">

                <li class="flex gap-2 items-center">
                    <DarkLightMode />
                </li>
                <li class="flex gap-2 items-center">
                    <LanguageSwitcher />
                </li>
            </ul>
        </div>
        <!-- LINKS IN SMALL SCREEN -->
        <div class="mx-5 md:mx-10 lg:hidden flex items-center gap-2">
            <DarkLightMode />
            <LanguageSwitcher />
        </div>
    </nav>
</template>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';

const colorMode = useColorMode()
const scrollToSectiony = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // استخدام setTimeout لضبط الإزاحة بعد التمرير السلس
        setTimeout(() => {
            window.scrollBy({
                top: -100,
                left: 0,
                behavior: 'smooth'
            });
        }, 500); // الوقت هنا لضمان انتهاء التمرير الأول قبل إضافة الإزاحة
    }
};
</script>

<style>
body {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.8);
}

body nav {
    background-color: #dbd5d5;
}

.dark-mode body {
    background-color: #091a28;
    color: #19c53e;
    border-color: #19c53e;
}

.dark-mode nav {
    background-color: #0e3250;

}

.dark-mode h3 {
    color: white;
}

.sepia-mode body {
    background-color: #f1e7d0;
    color: #433422;
}

.sepia-mode nav {
    background-color: #f5dda8;

}
</style>