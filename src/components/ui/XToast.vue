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
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-orange-500 text-white',
  error: 'bg-red-500 text-white'
}

const closeToast = () => {
  uiStore.removeToastById(id)
}
</script>

<template>
  <div
    :id="`toast-${type}-${id}`"
    class="flex items-center w-full p-4 text-gray-500 shadow-lg z-[999] animate-fade-in duration-300 transform translate-y-0"
    :class="typeClasses[type]"
    @mouseenter="uiStore.pauseToastTimer(id)"
    @mouseleave="uiStore.resumeToastTimer(id)"
  >
    <div class="ms-3 text-sm font-normal">
      {{ message }}
    </div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 text-gray-200 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
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
