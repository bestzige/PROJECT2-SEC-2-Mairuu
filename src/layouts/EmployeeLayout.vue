<script setup>
import { useLangStore } from '@/stores/lang'
import DefaultLayout from './DefaultLayout.vue'

const langStore = useLangStore()
</script>

<template>
  <DefaultLayout>
    <div
      class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white shadow-md"
    >
      <h1 class="text-md md:text-lg font-bold">Admin</h1>
    </div>
    <div class="flex flex-col h-full">
      <router-view />
    </div>
  </DefaultLayout>
</template>
