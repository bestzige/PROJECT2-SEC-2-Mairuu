<script setup>
import NavBar from '@/components/ui/NavBar.vue'
import DefaultLayout from './DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <NavBar :includeLangToggle="false">
      <h1 class="text-md md:text-lg font-bold">
        <router-link to="/admin">Admin</router-link>
      </h1>
    </NavBar>
    <div class="flex flex-col h-full">
      <router-view />
    </div>
  </DefaultLayout>
</template>
