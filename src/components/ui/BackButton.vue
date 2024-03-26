<script setup>
import { useLangStore } from '@/stores/lang'
import XButton from './XButton.vue'

defineProps({ to: String })

const langStore = useLangStore()
</script>

<template>
  <XButton :to="to" variant="gray" fullWidth>
    {{ langStore.getStaticTextLang('back.button', 'Back') }}
  </XButton>
</template>
