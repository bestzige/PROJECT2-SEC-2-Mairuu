<script setup>
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'
import XButton from '../ui/XButton.vue'

const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: ''
})

const login = async () => {
  await authStore.login(form.username, form.password)
}
</script>

<template>
  <form
    @submit.prevent="login"
    class="flex flex-col gap-4 max-w-xs mx-auto my-10 p-4 bg-slate-200 rounded-lg border-2 border-black"
  >
    <h1 class="text-3xl text-center">Auth</h1>
    <input
      type="text"
      v-model="form.username"
      class="w-full py-2 px-4 rounded"
      placeholder="Username"
    />
    <input
      type="password"
      v-model="form.password"
      class="w-full py-2 px-4 rounded"
      placeholder="Password"
    />
    <XButton type="submit" class="mx-auto w-full">Login</XButton>
  </form>
</template>
