<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const { id, message, type } = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  message: String,
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
  }
})

const typeClasses = {
  info: 'bg-blue-100 text-blue-500',
  success: 'bg-green-100 text-green-500',
  warning: 'bg-orange-100 text-orange-500',
  error: 'bg-red-100 text-red-500'
}

const closeToast = () => {
  uiStore.removeToastById(id)
}
</script>

<template>
  <div
    :id="`toast-${type}-${id}`"
    class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg z-[999]"
    @mouseenter="uiStore.pauseToastTimer(id)"
    @mouseleave="uiStore.resumeToastTimer(id)"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
      :class="typeClasses[type]"
    >
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" />
      </svg>
      <span class="sr-only"> Circle icon </span>
    </div>
    <div class="ms-3 text-sm font-normal">
      {{ message }}
    </div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white"
      aria-label="Close"
      @click="closeToast"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
</template>
