import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { useUiStore } from './stores/ui'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
const uiStore = useUiStore()
router.beforeEach((to, _from, next) => {
  if (
    to.path.startsWith('/employee/') &&
    authStore.role !== 'employee' &&
    authStore.role !== 'admin'
  ) {
    uiStore.addToast({
      message: 'You must be an employee to access this page',
      type: 'error'
    })
    return next({ name: 'home' })
  }

  if (to.path.startsWith('/admin/') && authStore.role !== 'admin') {
    uiStore.addToast({
      message: 'You must be an admin to access this page',
      type: 'error'
    })
    return next({ name: 'home' })
  }

  next()
})

app.mount('#app')
