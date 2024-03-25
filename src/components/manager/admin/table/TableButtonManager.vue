<script setup>
defineEmits(['click'])
defineProps({
  center: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    @click="$emit('click')"
    class="text-sm text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 w-full"
  >
    <div
      class="py-4 px-4 bg-theme-500 text-center font-semibold flex items-center text-white text-base md:text-lg lg:text-2xl"
      :class="{
        'justify-between': !center,
        'justify-center': center
      }"
    >
      <slot />
    </div>
  </button>
</template>
