<script setup>
import LangToggle from '@/components/lang/LangToggle.vue'
import XButton from './XButton.vue'
import XToasts from './XToasts.vue'

defineProps({
  includeLangToggle: {
    type: Boolean,
    default: true
  }
})

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center p-4 bg-white shadow-md">
      <slot />

      <LangToggle v-if="includeLangToggle" />
      <XButton
        v-if="!includeLangToggle && authStore.isAuthenticated"
        @click="authStore.logout"
        class="mx-4"
        >Logout</XButton
      >
    </div>
    <XToasts />
  </div>
</template>
