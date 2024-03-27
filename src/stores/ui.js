import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const toasts = ref([])

  const addToast = ({ message, type = 'info', timeout = 3000 }) => {
    const id = Date.now()
    const timeoutInterval = timeout > 0 ? setTimeout(() => removeToastById(id), timeout) : null
    const toast = { id, message, type, timeout, timeoutInterval }
    toasts.value.unshift(toast)
  }

  const removeToast = (index) => {
    toasts.value.splice(index, 1)
  }

  const removeToastById = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      removeToast(index)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  const pauseToastTimer = (id) => {
    const toast = toasts.value.find((toast) => toast.id === id)
    if (toast?.timeoutInterval) {
      toast.pauseAt = Date.now()
      clearTimeout(toast.timeoutInterval)
    }
  }

  const resumeToastTimer = (id) => {
    const toast = toasts.value.find((toast) => toast.id === id)
    if (toast?.timeoutInterval) {
      const timePaused = Date.now() - toast.pauseAt
      toast.timeoutInterval = setTimeout(() => removeToastById(id), toast.timeout - timePaused)
    }
  }

  return {
    toasts,
    addToast,
    removeToast,
    removeToastById,
    clearToasts,
    pauseToastTimer,
    resumeToastTimer
  }
})
