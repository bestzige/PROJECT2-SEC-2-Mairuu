<script setup>
import XToasts from '@/components/ui/XToasts.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-200 pt-16 pb-32">
    <XToasts />
    <slot />
  </div>
</template>
