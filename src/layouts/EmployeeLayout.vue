<script setup>
import DefaultLayout from './DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div
      class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white shadow-md"
    >
      <h1 class="text-md md:text-lg font-bold"><router-link to="/employee">Admin</router-link></h1>
    </div>
    <div class="flex flex-col h-full">
      <router-view />
    </div>
  </DefaultLayout>
</template>
