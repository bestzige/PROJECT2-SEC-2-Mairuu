<script setup>
defineProps({
  table: Object,
  available: Boolean
})

defineEmits(['select'])
</script>

<template>
  <div
    class="flex justify-center items-center h-24 m-1 border-2 cursor-pointer w-36"
    :class="{ 'bg-theme-500 border-black': available, 'bg-theme-300 border-theme-500': !available }"
    @click="$emit('select', table)"
  >
    {{ table.name.en }}
  </div>
</template>
