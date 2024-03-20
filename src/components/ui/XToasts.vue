<script setup>
import XToast from '@/components/ui/XToast.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <XToast
    v-for="toast in uiStore.toasts.slice(0, 1)"
    :key="toast.id"
    :id="toast.id"
    :message="toast.message"
    :type="toast.type"
  />
</template>
