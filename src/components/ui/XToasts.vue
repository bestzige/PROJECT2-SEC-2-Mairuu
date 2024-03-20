<script setup>
import XToast from '@/components/ui/XToast.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <div class="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-4">
    <XToast
      v-for="toast in uiStore.toasts"
      :key="toast.id"
      :id="toast.id"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>
