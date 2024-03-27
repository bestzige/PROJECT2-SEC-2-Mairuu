<script setup>
import AuthForm from '@/components/auth/AuthForm.vue'
import XButton from '@/components/ui/XButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="w-full flex justify-center items-center flex-col">
    <div v-if="!authStore.isAuthenticated">
      <AuthForm />
    </div>
    <div v-else-if="authStore.role === 'admin'" class="w-full bg-slate-200">
      <div
        class="flex gap-4 mx-4 md:mx-auto py-20 justify-between items-center flex-col md:flex-row"
      >
        <router-link
          :to="`/admin/table-manager`"
          class="mx-2 text-xl w-full md:text-2xl lg:text-5xl p-4 flex text-center justify-center items-center bg-theme-200 border-2 border-black h-80 rounded-lg"
        >
          TABLE MANAGEMENT
        </router-link>
        <router-link
          :to="`/admin/product-manager`"
          class="mx-2 w-full text-xl md:text-2xl lg:text-5xl p-4 flex text-center justify-center items-center bg-theme-200 border-2 border-black h-80 rounded-lg"
        >
          PRODUCT MANAGEMENT
        </router-link>
      </div>
    </div>
    <div v-else class="w-full flex justify-center items-center flex-col my-4">
      <h1 class="text-5xl text-center text-red-500">This page is only for admin</h1>
    </div>
    <XButton to="/" class="mx-auto">Back to home</XButton>
  </div>
</template>

<style scoped></style>
