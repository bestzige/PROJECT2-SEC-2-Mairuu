<script setup>
import LangToggle from '@/components/lang/LangToggle.vue'
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white shadow-md"
  >
    <slot />
    <LangToggle />
  </div>
</template>
