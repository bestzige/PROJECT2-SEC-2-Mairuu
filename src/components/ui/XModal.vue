<script setup>
defineEmits(['close'])

defineProps({
  title: String,
  show: Boolean,
  closeWhenClickOutside: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const sizeClasses = {
  sm: 'w-48 md:w-64 lg:w-96',
  md: 'w-64 md:w-96 lg:w-128',
  lg: 'w-96 md:w-128 lg:w-160'
}
</script>

<template>
  <div
    v-show="show"
    class="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50 p-2 md:p-4 lg:p-6 xl:p-8"
    @click.self="closeWhenClickOutside && $emit('close')"
  >
    <div
      class="bg-white rounded-lg p-4 h-fit overflow-y-auto shadow-lg max-h-[calc(100%-1rem)]"
      :class="sizeClasses[size]"
    >
      <div class="flex justify-between border-b border-gray-200 pb-2 mb-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <button @click="$emit('close')">
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
