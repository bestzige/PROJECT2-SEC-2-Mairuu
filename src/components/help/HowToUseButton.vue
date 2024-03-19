<script setup>
import { useLangStore } from '@/stores/lang'
import { ref } from 'vue'
import XModal from '../ui/XModal.vue'
import XButton from '../ui/XButton.vue'

const langStore = useLangStore()
const showHelp = ref(false)
</script>

<template>
  <div>
    <XModal
      :show="showHelp"
      @close="showHelp = false"
      :title="langStore.getStaticTextLang('how-to-use.title', 'How to use')"
      size="lg"
    >
      <p>Hello</p>
    </XModal>
    <XButton
      v-if="!showHelp"
      @click="showHelp = !showHelp"
      class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {{ langStore.getStaticTextLang('how-to-use.button', 'How to use') }}
    </XButton>
  </div>
</template>
