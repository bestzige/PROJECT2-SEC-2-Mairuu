<script setup>
import { useLangStore } from '@/stores/lang'
import DefaultLayout from './DefaultLayout.vue'
import NavBar from '@/components/ui/NavBar.vue'

const langStore = useLangStore()
</script>

<template>
  <DefaultLayout>
    <NavBar>
      <h1 class="text-md md:text-lg font-bold">
        {{ langStore.getStaticTextLang('store.title', 'Store Name') }}
      </h1>
    </NavBar>
    <div class="flex flex-col h-full px-4 py-2">
      <router-view />
    </div>
  </DefaultLayout>
</template>
