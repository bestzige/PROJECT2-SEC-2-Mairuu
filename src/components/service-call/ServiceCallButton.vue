<script setup>
import { useLangStore } from '@/stores/lang'
import { useServiceCallStore } from '@/stores/service-call'

import { useRoute } from 'vue-router'
import XButton from '../ui/XButton.vue'

const route = useRoute()
const langStore = useLangStore()
const serviceCallStore = useServiceCallStore()

const serviceCall = async () => {
  await serviceCallStore.callService(route.params.orderId)
}
</script>

<template>
  <XButton @click="serviceCall" variant="secondary" fullWidth>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="w-6 h-6"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"
      />
    </svg>
    <span class="ml-2">{{
      langStore.getStaticTextLang('service-call.button', 'Call Service')
    }}</span>
  </XButton>
</template>
