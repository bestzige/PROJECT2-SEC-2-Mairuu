<script setup>
import { useLangStore } from '@/stores/lang'

defineProps(['table'])

const langStore = useLangStore()
</script>

<template>
  <div
    class="flex justify-center items-center p-2 rounded-lg bg-green-500 text-white md:text-lg lg:text-xl md:p-4 lg:p-6 border-2 border-green-700 select-none"
  >
    {{ langStore.getTextLang(table, 'name', 'Table #X') }}
  </div>
</template>
