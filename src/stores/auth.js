import { useUiStore } from '@/stores/ui'
import * as fetch from '@/utils/fetch'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const uiStore = useUiStore()
  const router = useRouter()

  const login = async (username, password) => {
    const data = await fetch.getItems(
      `${import.meta.env.VITE_API_ENDPOINT}/users?username=${username}`
    )

    if (data.length <= 0 || data[0].password !== password) {
      uiStore.addToast({
        message: 'Invalid username or password',
        type: 'error'
      })
      return
    }

    user.value = data[0]
    uiStore.addToast({
      message: 'Logged in successfully',
      type: 'success'
    })
  }

  const logout = () => {
    user.value = null
    uiStore.addToast({
      message: 'Logged out successfully',
      type: 'success'
    })
    router.push({ name: 'home' })
  }

  const role = computed(() => {
    return user.value?.role
  })

  const isAuthenticated = computed(() => {
    return user.value !== null
  })

  return {
    user,
    role,
    login,
    logout,
    isAuthenticated
  }
})
