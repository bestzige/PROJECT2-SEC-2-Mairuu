<script setup>
import { useServiceCallStore } from '@/stores/service-call'

const serviceCallStore = useServiceCallStore()
</script>

<template>
  <div
    v-if="serviceCallStore.isCalled"
    class="fixed -top-1 left-0 right-0 flex justify-center p-4 z-50"
  >
    <!-- <div
    v-if="serviceCallStore.isCalled"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center p-4"
  > -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      class="animate-bounce text-red-500"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"
      />
    </svg>
  </div>
</template>
