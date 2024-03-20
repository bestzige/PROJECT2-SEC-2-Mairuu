<script setup>
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()
</script>

<template>
  <img
    :src="`/flags/${langStore.nextLang.value}.svg`"
    :alt="langStore.nextLang.value"
    class="w-6 h-6 rounded-md cursor-pointer"
    @click="langStore.toggleLang"
  />
</template>
