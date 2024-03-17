<script setup>
import { useLangStore } from '@/stores/lang'
import LangButton from './LangButton.vue'

const langStore = useLangStore()
</script>

<template>
  <div class="flex space-x-2" v-for="lang in langStore.langs" :key="lang">
    <LangButton
      :lang="lang"
      :active="lang.value === langStore.currentLang.value"
      @setLang="langStore.setLang"
    />
  </div>
</template>
