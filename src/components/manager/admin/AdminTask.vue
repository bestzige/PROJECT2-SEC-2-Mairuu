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
        class="flex gap-4 mx-4 md:mx-auto py-20 justify-center items-center flex-col md:flex-row"
      >
        <router-link
          :to="`/admin/table-manager`"
          class="mx-2 w-full p-4 flex flex-col text-center justify-center items-center bg-theme-200 border-2 border-black h-80 rounded-lg"
        >
          <h1 class="text-xl md:text-2xl lg:text-5xl font-bold">TABLE MANAGEMENT</h1>
          <div class="text-center mt-4">
            <p class="text-sm text-gray-800">This section allows admin users to manage tables.</p>
          </div>
        </router-link>
        <router-link
          :to="`/admin/product-manager`"
          class="mx-2 w-full p-4 flex flex-col text-center justify-center items-center bg-theme-200 border-2 border-black h-80 rounded-lg"
        >
          
          <h1 class="text-xl md:text-2xl lg:text-5xl font-bold">PRODUCT MANAGEMENT</h1>
          <div class="text-center mt-4">
            <p class="text-sm text-gray-800">This section allows admin users to manage products.</p>
          </div>
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
