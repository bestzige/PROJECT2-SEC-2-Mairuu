<script setup>
defineProps({
  lang: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
defineEmits(['setLang'])
</script>

<template>
  <button
    @click="$emit('setLang', lang)"
    :class="{
      'bg-orange-400': active,
      'bg-orange-200': !active
    }"
    class="flex items-center justify-center p-2 m-1 rounded-lg w-full"
  >
    <img :src="`/flags/${lang.value}.svg`" alt="flag" class="w-6 h-6 mr-2 rounded-md" />
    <p class="text-sm">{{ lang.name }}</p>
  </button>
</template>
