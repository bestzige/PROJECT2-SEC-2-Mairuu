<script setup>
import LangToggle from '@/components/lang/LangToggle.vue'
import XToasts from './XToasts.vue'
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center p-4 bg-white shadow-md">
      <slot />
      <LangToggle />
    </div>
    <XToasts />
  </div>
</template>
